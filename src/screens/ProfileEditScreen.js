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

//Icon
import CloseIcon from "../components/icons/CloseIcon";
import CheckmarkIcon from "../components/icons/CheckmarkIcon";

//Redux
import { connect } from "react-redux";

const { height, width } = Dimensions.get("window");

const ProfileEditScreen = ({ navigation, profile }) => {
  const [name, setName] = useState(`${profile.firstName} ${profile.lastName}`);
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
      const userCredentials = await auth.signInWithEmailAndPassword(
        email,
        oldPassword
      );
      if (newPassword !== confirmPassword) {
        setHasError(true);
        setErrorMessage("Password Confirmation Fail");
      } else {
        if (newPassword !== "") {
          modifyPassword(newPassword);
        }
        // modify profile
        const nameArray = name.split(" ");
        const [firstName, ...lastName] = nameArray;
        modifyProfile(email, firstName, lastName, profile.avatarURL);
        navigation.goBack();
      }
    } catch (err) {
      setHasError(true);
      setErrorMessage("Incorrect Password");
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
            <TouchableOpacity>
              <Text fontSize="lg">Change Profile Picture</Text>
            </TouchableOpacity>
          </VStack>
          {/* ------------------ */}
          {/* ----- Forms ----- */}
          <VStack>
            <Input
              mt={2}
              placeholder="Name"
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
            />
            <Input
              mt={2}
              placeholder="Email"
              onChangeText={(text) => {
                setEmail(text);
              }}
              value={email}
            />
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
