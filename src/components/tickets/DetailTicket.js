import { Box, HStack, Text, VStack } from "native-base";
import React from "react";
import Dash from "react-native-dash";
import { StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

//Redux
import { connect } from "react-redux";

const BigTicket = () => {
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
              Full Name
            </Text>
            <Text fontWeight={700} fontSize="sm">
              John Doe
            </Text>
          </HStack>
          <HStack style={styles.ticketDetailContainer}>
            <Text fontWeight={700} fontSize="sm">
              Seat Place
            </Text>
            <Text fontWeight={700} fontSize="sm">
              N/A
            </Text>
          </HStack>
          <HStack style={styles.ticketDetailContainer}>
            <Text fontWeight={700} fontSize="sm">
              Valid Before
            </Text>
            <Text fontWeight={700} fontSize="sm">
              02/14/2022
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
            <Text fontWeight={700} fontSize="sm">
              G154MD4
            </Text>
          </VStack>
          <QRCode value="G154MD4" />
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

export default connect(mapStateToProps, mapDispatchToProps)(BigTicket);
