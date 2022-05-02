import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  HStack,
  IconButton,
  Text,
  Box,
  Avatar,
  VStack,
  Icon,
  Input,
  Alert,
  FormControl,
} from "native-base";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { modifyProfile, modifyPassword } from "../redux/actions/profile";
import { auth } from "../firebase";
import * as ImagePicker from "expo-image-picker";

//Icon
import CloseIcon from "../components/icons/CloseIcon";
import CheckmarkIcon from "../components/icons/CheckmarkIcon";

//Redux
import { connect } from "react-redux";
import axios from "axios";
import { format } from "date-fns";

const { height, width } = Dimensions.get("window");

const ProfileEditScreen = ({
  navigation,
  profile,
  modifyProfile,
  modifyPassword,
}) => {
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatarURL, setAvatarURL] = useState(profile.avatarURL);
  const [sp1, setSp1] = useState(true);
  const [sp2, setSp2] = useState(true);
  const [sp3, setSp3] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const verifyAndModifyProfile = async () => {
    try {
      let temp = avatarURL;
      if (avatarURL !== profile.avatarURL) {
        //Upload Image to imgBB
        const form = new FormData();
        form.append("image", {
          uri: avatarURL,
          type: "image/jpg",
          name: "image.jpg",
        });
        const data = await axios.post(
          "https://api.imgbb.com/1/upload?key=6b1e8b98295c868b89d24134aa528527",
          form
        );

        setAvatarURL(data.data.data.display_url);

        temp = data.data.data.display_url;
      }
      if (newPassword !== confirmPassword) {
        setHasError(true);
        setErrorMessage("Password Confirmation Fail");

        return;
      } else if (oldPassword.length > 0) {
        const userCredentials = await auth.signInWithEmailAndPassword(
          email,
          oldPassword
        );
        if (newPassword.length > 0) {
          modifyPassword(newPassword);
          navigation.goBack();
          return;
        }
        // modify profile
      }
      modifyProfile(
        email,
        firstName,
        lastName,
        temp,
        profile.username,
        profile.isSeller
      );
      navigation.goBack();
    } catch (err) {
      setHasError(true);
      setErrorMessage("Incorrect Password");
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setAvatarURL(result.uri);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView enableAutomaticScroll={true}>
        <Box style={styles.container} mt={4}>
          {/* ----- Navigator ----- */}
          <HStack alignItems="center" justifyContent="space-between">
            <IconButton
              icon={<CloseIcon color="black" />}
              onPress={() => {
                navigation.goBack();
              }}
              variant="unstyled"
            ></IconButton>

            <IconButton
              icon={<CheckmarkIcon color="black" />}
              onPress={() => {
                verifyAndModifyProfile();
              }}
              variant="unstyled"
            ></IconButton>
          </HStack>
          {/* ------------------ */}

          {/* ----- Profile Picture ----- */}
          <VStack mt={4} alignItems="center">
            <Avatar
              size="xl"
              source={{
                uri: avatarURL,
              }}
              mb={4}
            >
              {`${profile.firstName[0]}${profile.lastName[0]}`}
            </Avatar>
            <TouchableOpacity onPress={pickImage}>
              <Text fontSize="lg">Change Profile Picture</Text>
            </TouchableOpacity>
          </VStack>
          {/* ------------------ */}
          {/* ----- Forms ----- */}
          <VStack>
            <Input
              mt={2}
              placeholder="First Name"
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
              }}
            />
            <Input
              mt={2}
              placeholder="Last Name"
              value={lastName}
              onChangeText={(text) => {
                setLastName(text);
              }}
            />
            <Input mt={2} placeholder="Email" value={email} isDisabled={true} />
            <FormControl isInvalid={errorMessage === "Incorrect Password"}>
              <Input
                mt={2}
                placeholder="Old Password"
                onChangeText={(text) => {
                  setOldPassword(text);
                }}
                type={sp3 ? "password" : "text"}
                value={oldPassword}
                InputRightElement={
                  <Icon
                    as={
                      <MaterialIcons
                        name={sp3 ? "visibility" : "visibility-off"}
                        mr="2"
                      />
                    }
                    size="sm"
                    onPress={() => setSp3(!sp3)}
                    mr={4}
                    color="grey"
                  />
                }
              />
            </FormControl>
            <FormControl
              isInvalid={errorMessage === "Password Confirmation Fail"}
            >
              <Input
                mt={2}
                placeholder="New Password"
                onChangeText={(text) => {
                  setNewPassword(text);
                }}
                type={sp2 ? "password" : "text"}
                value={newPassword}
                InputRightElement={
                  <Icon
                    as={
                      <MaterialIcons
                        name={sp2 ? "visibility" : "visibility-off"}
                        mr="2"
                      />
                    }
                    size="sm"
                    onPress={() => setSp2(!sp2)}
                    mr={4}
                    color="grey"
                  />
                }
              />
            </FormControl>
            <FormControl
              isInvalid={errorMessage === "Password Confirmation Fail"}
            >
              <Input
                mt={2}
                placeholder="New Password, again"
                onChangeText={(text) => {
                  setConfirmPassword(text);
                }}
                value={confirmPassword}
                type={sp1 ? "password" : "text"}
                InputRightElement={
                  <Icon
                    as={
                      <MaterialIcons
                        name={sp1 ? "visibility" : "visibility-off"}
                        mr="2"
                      />
                    }
                    size="sm"
                    onPress={() => setSp1(!sp1)}
                    mr={4}
                    color="grey"
                  />
                }
              />
            </FormControl>
          </VStack>
          {hasError ? (
            <Alert w="100%" status="error" mt={4}>
              <VStack space={2} flexShrink={1} w="100%" justifyContent="center">
                <HStack
                  flexShrink={1}
                  space={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt="1" />
                    <Text fontSize="md" color="coolGray.800">
                      {errorMessage}
                    </Text>
                  </HStack>
                  <IconButton
                    variant="unstyled"
                    _focus={{
                      borderWidth: 0,
                    }}
                    icon={<CloseIcon size="3" />}
                    _icon={{
                      color: "coolGray.600",
                    }}
                    onPress={() => {
                      setHasError(false);
                      setErrorMessage("");
                    }}
                  />
                </HStack>
              </VStack>
            </Alert>
          ) : null}
          {/* ------------------ */}
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
  },
});

const mapDispatchToProps = { modifyPassword, modifyProfile };

const mapStateToProps = ({ profile }) => ({ profile });

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditScreen);
