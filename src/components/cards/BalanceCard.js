import { Button, HStack, Text, VStack } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import ActionButton from "../buttons/ActionButton";

import AlgorandInBalanceCardIcon from "../icons/AlgorandInBalanceCardIcon";
import CardIcon from "../icons/CardIcon";
const BalanceCard = () => {
  return (
    <VStack p={5} mt={4} bgColor="white" style={styles.container}>
      <HStack justifyContent="space-between" mb={4}>
        <AlgorandInBalanceCardIcon />
        <ActionButton text="Unlink" width={100} />
      </HStack>
      <HStack justifyContent="space-between" alignItems={"center"}>
        <VStack>
          <Text fontWeight={700} fontSize="lg" color="grey">
            Balance
          </Text>
          <Text fontWeight={700} fontSize="lg">
            12,543 ALGO
          </Text>
        </VStack>
        <CardIcon />
      </HStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    elevation: 2,
  },
});

export default BalanceCard;
