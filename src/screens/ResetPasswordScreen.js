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

const ResetPasswordScreen = ({ navigation, fetchProfile, profile }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && user.emailVerified) {
        await fetchProfile(user.email);
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleSendResetEmail = async () => {
    console.log("Called handleSendResetEmail");
    console.log(email);
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Sent Password Reset Email.");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <SafeAreaView>
      <Box
        w="90%"
        h={height / 2}
        alignSelf={"center"}
        justifyContent={"center"}
      >
        <Text fontWeight={700} fontSize="3xl">
          Reset Password
        </Text>
        <FormControl mb={4}>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            value={email}
            onChangeText={(text) => setEmail(text)}
            borderColor={"black"}
          ></Input>
        </FormControl>
        {/* <FormControl mb={4}>
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
        </FormControl> */}
        <ActionButton
          text="Send Email"
          width=" 100%"
          onPress={() => handleSendResetEmail()}
        />
      </Box>
    </SafeAreaView>
  );
};

const mapStateToProps = ({ profile }) => ({
  profile,
});

const mapDispatchToProps = { fetchProfile };

export default ResetPasswordScreen;
