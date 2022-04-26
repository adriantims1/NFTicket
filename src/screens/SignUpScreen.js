import { Box, FormControl, HStack, Input, Text, Icon } from "native-base";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Dimensions, TouchableOpacity } from "react-native";
import { fontSize } from "styled-system";
import ActionButton from "../components/buttons/ActionButton";
import GoogleIcon from "../components/icons/GoogleIcon";
import CoinbaseIcon from "../components/icons/CoinbaseIcon";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { width, height } = Dimensions.get("window");
const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordInitial, setPasswordInitial] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [password, setPassword] = useState("");
  const [securePassword1, setSecurePassword1] = useState(true);
  const [securePassword2, setSecurePassword2] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, []);

  const verifyPasswords = () => {
    if (password === "") {
      if (passwordInitial === passwordVerify) {
        setPassword(passwordInitial);
        handleSignUp(passwordInitial);
      } else {
        console.log(passwordInitial, passwordVerify);
        alert("Password does not match!");
        return;
      }
    }
  };

  const handleSignUp = (password) => {
    console.log(password);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with " + user.email);
      })
      .catch((error) => console.log(error, email));
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <Text fontWeight={700} fontSize="3xl">
          Register
        </Text>
        <HStack mt={4} justifyContent={"space-evenly"}>
          <Box
            borderRadius={10}
            borderWidth={1}
            width={100}
            p={2}
            alignItems={"center"}
          >
            <GoogleIcon />
          </Box>
          <Box
            borderRadius={10}
            borderWidth={1}
            width={100}
            p={2}
            alignItems={"center"}
          >
            <CoinbaseIcon />
          </Box>
        </HStack>
        <HStack justifyContent={"center"} mt={4}>
          <Text>Or, register with email...</Text>
        </HStack>
        <FormControl>
          <FormControl.Label>Name</FormControl.Label>
          <Input
            value={name}
            onChangeText={(text) => setName(text)}
            borderColor={"black"}
          ></Input>
        </FormControl>
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          {/* <FormControl.Control type="email" placeholder= "Email"/> */}
          <Input
            value={email}
            onChangeText={(text) => setEmail(text)}
            borderColor={"black"}
          />
        </FormControl>
        <FormControl mb={4}>
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
