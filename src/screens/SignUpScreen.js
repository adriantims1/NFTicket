import { Box, FormControl, HStack, Input, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Dimensions, TouchableOpacity } from "react-native";
import { fontSize } from "styled-system";
import ActionButton from "../components/buttons/ActionButton";
import GoogleIcon from "../components/icons/GoogleIcon";
import CoinbaseIcon from "../components/icons/CoinbaseIcon";
import { auth } from '../firebase';
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const LoginScreen = ({ navigation }) => {
  // const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // const navigation = useNavigation;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("Home");
      }
    })
    return unsubscribe
  }, [])

  const handleSignUp = () => {
    console.log(email);
    console.log(password);
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log("Registered with " + user.email);
    })
    .catch(error => alert(error.message))
    
  }

  return (
    <SafeAreaView>
      <Box w="90%" h={height} alignSelf={"center"} justifyContent={"center"}>
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
          <Input borderColor={"black"}></Input>
        </FormControl>
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          {/* <FormControl.Control type="email" placeholder= "Email"/> */}
          <Input value={email} onChangeText={text => setEmail(text)} borderColor={"black"}/>
        </FormControl>
        <FormControl mb={4}>
          <FormControl.Label>Password</FormControl.Label>
          <Input value={password} onChangeText={text => setPassword(text)} borderColor={"black"} secureTextEntry/>
        </FormControl>
        <FormControl mb={4}>
          <FormControl.Label>Re-type Password</FormControl.Label>
          <Input value={password} onChangeText={text => setPassword(text)} borderColor={"black"} secureTextEntry/>
        </FormControl>
        <ActionButton
          text="Register"
          width=" 100%"
          onPress={() => handleSignUp()}
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
    </SafeAreaView>
  );
};

export default LoginScreen;
