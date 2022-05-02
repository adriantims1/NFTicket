import {
  Box,
  FormControl,
  HStack,
  Input,
  Text,
  Icon,
  ScrollView,
  WarningOutlineIcon,
} from "native-base";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TextInput,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import ActionButton from "../components/buttons/ActionButton";
import { auth } from "../firebase";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

const { width, height } = Dimensions.get("window");
const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordInitial, setPasswordInitial] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const [securePassword1, setSecurePassword1] = useState(true);
  const [securePassword2, setSecurePassword2] = useState(true);
  const [username, setUsername] = useState("");
  const [usernameExist, setUsernameExist] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && auth.user?.emailVerified) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const verifyPasswords = () => {
    if (passwordInitial === passwordVerify) {
      handleSignUp(passwordInitial);
    } else {
      alert("Password does not match!");
      return;
    }
  };

  const checkUsername = async () => {
    const data = await axios.get(
      "https://nfticket-backend.herokuapp.com/api/username/"
    );
    const { usernames } = data.data;
    if (usernames.indexOf(username) != -1) {
      setUsernameExist(true);
      return true;
    }
    return false;
  };

  const checkEmail = async () => {
    try {
      const data = await axios.get(
        "https://nfticket-backend.herokuapp.com/api/email/"
      );
      const { emails } = data.data;
      console.log(emails);
      if (emails.indexOf(email) == -1) {
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUp = async (password) => {
    try {
      setErrorEmail(false);
      setUsernameExist(false);
      const usernameExist = await checkUsername();
      if (usernameExist) {
        setUsernameExist(true);
        return;
      }
      const result = await checkEmail();
      if (!result) {
        setErrorEmail(true);
        return;
      }

      await axios.post("https://nfticket-backend.herokuapp.com/api/user/", {
        first_name: firstName,
        last_name: lastName,
        email,
        is_seller: false,
        avtar_url: "https://i.ibb.co/P9M9Ypf/test.png",
        username,
      });
      auth
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => alert(error.message))
        .then((userCredentials) => {
          console.log("Registered with " + userCredentials.user.email);
          userCredentials.user
            .sendEmailVerification()
            .then(() => {
              auth.signOut();
              navigation.navigate("Login");
              console.log("success");
            })
            .catch((error) => alert(error));
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <Box
          style={styles.container}
          justifyContent="center"
          alignSelf={"center"}
        >
          <Text fontWeight={700} fontSize="3xl">
            Register
          </Text>

          <FormControl>
            <FormControl.Label>First Name</FormControl.Label>
            <Input
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              borderColor={"black"}
            ></Input>
          </FormControl>
          <FormControl>
            <FormControl.Label>Last Name</FormControl.Label>
            <Input
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              borderColor={"black"}
            ></Input>
          </FormControl>
          <FormControl isInvalid={usernameExist}>
            <FormControl.Label>Username</FormControl.Label>
            <Input
              value={username}
              onChangeText={(text) => setUsername(text)}
              borderColor={"black"}
            ></Input>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="sm" />}
            >
              Username Is Unavailable
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={errorEmail}>
            <FormControl.Label>Email</FormControl.Label>

            <Input
              value={email}
              onChangeText={(text) => setEmail(text)}
              borderColor={"black"}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="sm" />}
            >
              Email is registered
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              value={passwordInitial}
              onChangeText={(text) => setPasswordInitial(text)}
              borderColor={"black"}
              type={!securePassword1 ? "text" : "password"}
              InputRightElement={
                <Icon
                  as={
                    <MaterialIcons
                      name={securePassword1 ? "visibility" : "visibility-off"}
                      mr="2"
                    />
                  }
                  onPress={() => setSecurePassword1(!securePassword1)}
                  mr={3}
                  color="grey"
                  size="sm"
                />
              }
            />
          </FormControl>
          <FormControl mb={4}>
            <FormControl.Label>Re-type Password</FormControl.Label>
            <Input
              value={passwordVerify}
              onChangeText={(text) => setPasswordVerify(text)}
              borderColor={"black"}
              type={!securePassword2 ? "text" : "password"}
              InputRightElement={
                <Icon
                  as={
                    <MaterialIcons
                      name={securePassword2 ? "visibility" : "visibility-off"}
                      mr="2"
                    />
                  }
                  onPress={() => setSecurePassword2(!securePassword2)}
                  mr={3}
                  color="grey"
                  size="sm"
                />
              }
            />
          </FormControl>
          <ActionButton
            text="Register"
            width=" 100%"
            onPress={() => verifyPasswords()}
          />

          <HStack justifyContent={"center"} mt={4}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text>Already have an account? Login</Text>
            </TouchableOpacity>
          </HStack>
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    height: height * 0.9,
  },
});

export default SignUpScreen;
