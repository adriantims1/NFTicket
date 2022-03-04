import { Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import SmallTicket from "../components/tickets/SmallTicket";
const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <SmallTicket />
    </SafeAreaView>
  );
};

export default HomeScreen;
