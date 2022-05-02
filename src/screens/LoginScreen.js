import {
  Box,
  FormControl,
  HStack,
  Input,
  Text,
  Icon,
  Button,
} from "native-base";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, TouchableOpacity } from "react-native";
import ActionButton from "../components/buttons/ActionButton";
import GoogleIcon from "../components/icons/GoogleIcon";
import CoinbaseIcon from "../components/icons/CoinbaseIcon";
import { MaterialIcons } from "@expo/vector-icons";
import { auth } from "../firebase";
import { fetchProfile } from "../redux/actions/profile";
import { connect } from "react-redux";
const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation, fetchProfile, profile }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && user.emailVerified) {
        await fetchProfile(user.email);
        navigation.replace("Home");
      } else if (user && !user.emailVerified) {
        alert("Verify Email");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;

        fetchProfile(email);
      })
      .catch((error) => alert("Invalid Authorization"));
  };

  return (
    <SafeAreaView>
      <Box w="90%" h={height} alignSelf={"center"} justifyContent={"center"}>
        <Text fontWeight={700} fontSize="3xl">
          Login
        </Text>
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            value={email}
            onChangeText={(text) => setEmail(text.trim())}
            borderColor={"black"}
          ></Input>
        </FormControl>
        <FormControl mb={4}>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            value={password}
            onChangeText={(text) => setPassword(text)}
            borderColor="black"
            type={securePassword ? "password" : "text"}
            InputRightElement={
              <Icon
                as={
                  <MaterialIcons
                    name={securePassword ? "visibility" : "visibility-off"}
                    mr="2"
                  />
                }
                size="sm"
                onPress={() => setSecurePassword(!securePassword)}
                mr={4}
                color="grey"
              />
            }
          ></Input>
        </FormControl>
        <HStack justifyContent={"flex-end"} mb={4}>
          <TouchableOpacity>
            <Text
              onPress={() => {
                navigation.navigate("ResetPassword");
              }}
            >
              Forgot Your Password? Reset
            </Text>
          </TouchableOpacity>
        </HStack>
        <ActionButton
          text="Log In"
          width=" 100%"
          onPress={() => handleLogin()}
        />

        <HStack justifyContent={"center"} mt={4}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            <Text>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </HStack>
      </Box>
    </SafeAreaView>
  );
};

const mapStateToProps = ({ profile }) => ({
  profile,
});

const mapDispatchToProps = { fetchProfile };

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
