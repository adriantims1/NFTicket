import { Box, HStack, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import Dash from "react-native-dash";
import { StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import axios from "axios";

//Redux
import { connect } from "react-redux";

const DetailTicket = ({ owner, valid, nftId }) => {
  return (
    <Box
      bg={{
        linearGradient: {
          colors: ["secondary.600", "secondary.700"],
          start: [0, 0],
          end: [0, 1],
        },
      }}
      p={5}
      rounded={20}
      w="100%"
      h="35%"
    >
      <Box bg="white" rounded="lg" alignItems="center" h="100%">
        <VStack w="100%" h="40%" justifyContent="center">
          <HStack style={styles.ticketDetailContainer}>
            <Text fontWeight={700} fontSize="sm">
              Valid Before
            </Text>
            <Text fontWeight={700} fontSize="sm">
              {valid}
            </Text>
          </HStack>
        </VStack>

        <Dash
          style={{ width: "100%", height: 0 }}
          dashThickness={1}
          dashGap={3}
          dashStyle={{
            opacity: 0.25,
          }}
          m="2"
        />

        <HStack
          h="60%"
          w="100%"
          p={4}
          justifyContent="space-around"
          alignItems={"center"}
        >
          <VStack justifyContent={"center"} alignItems="center">
            <Text fontWeight={700} fontSize="sm">
              Ticket Code
            </Text>
          </VStack>
          {owner ? (
            <QRCode
              value={`https://nfticket-backend.herokuapp.com/api/verify/?owner=${owner}&nftid=${nftId}
`}
            />
          ) : null}
        </HStack>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  ticketDetailContainer: {
    justifyContent: "space-between",
    marginBottom: 4,
    paddingHorizontal: 16,
  },
});

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DetailTicket);
