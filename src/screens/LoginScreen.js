import { Box, FormControl, HStack, Input, Text, Icon } from "native-base";
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
  const [securePassword, setSecurePassword] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await fetchProfile(user.email);
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        fetchProfile(email);
      })
      .catch((error) => alert(error.message));
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
            onChangeText={(text) => setEmail(text)}
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
        <ActionButton
          text="Sign In"
          width=" 100%"
          onPress={() => handleLogin()}
        />
        <HStack justifyContent={"center"} mt={4}>
          <TouchableOpacity>
            <Text>Forgot Your Password? Reset</Text>
          </TouchableOpacity>
        </HStack>
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            <Text>Don't have an account? Register</Text>
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
