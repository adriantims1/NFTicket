import { Button, HStack, Text, VStack } from "native-base";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import ActionButton from "../buttons/ActionButton";
import QRCode from "react-native-qrcode-svg";
import AlgorandInBalanceCardIcon from "../icons/AlgorandInBalanceCardIcon";
import CardIcon from "../icons/CardIcon";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { fetchProfile } from "../../redux/actions/profile";

const BalanceCard = ({ profile, fetchProfile }) => {
  const [tab, setTab] = useState(true); /*true: Balance, false: Wallet hash*/

  const copyClipboard = async () => {
    try {
      await Clipboard.setString(profile.walletAddress);
      alert("copied");
    } catch (err) {
      console.log(err);
    }
  };

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

      <ActionButton width="100%" text="Copy Wallet" onPress={copyClipboard} />
      <ActionButton
        width="100%"
        text="Refresh Balance"
        onPress={() => {
          fetchProfile(profile.email);
        }}
        mt={2}
      />
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

const mapDispatchToProps = { fetchProfile };

export default connect(mapStateToProps, mapDispatchToProps)(BalanceCard);
