import { Button, HStack, Text, VStack } from "native-base";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import ActionButton from "../buttons/ActionButton";
import QRCode from "react-native-qrcode-svg";
import AlgorandInBalanceCardIcon from "../icons/AlgorandInBalanceCardIcon";
import CardIcon from "../icons/CardIcon";

const BalanceCard = ({ profile }) => {
  const [tab, setTab] = useState(true); /*true: Balance, false: Wallet hash*/
  return (
    <VStack p={5} mt={4} bgColor="white" style={styles.container}>
      <HStack justifyContent="space-between" mb={4}>
        <AlgorandInBalanceCardIcon />
        <ActionButton
          text={tab ? "QR Code" : "Balance"}
          width={100}
          onPress={() => {
            setTab(!tab);
          }}
        />
      </HStack>
      <HStack justifyContent="space-between" alignItems={"center"}>
        <VStack w={"50%"}>
          {tab ? (
            <Text fontWeight={700} fontSize="lg" color="grey">
              Balance
            </Text>
          ) : null}
          {tab ? (
            <Text fontWeight={700} fontSize={tab ? "lg" : "xs"}>
              {profile.balance} ALGO
            </Text>
          ) : (
            <QRCode value={profile.walletAddress} />
          )}
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
const mapStateToProps = ({ profile }) => ({
  profile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BalanceCard);
