import { Box, Text } from "native-base";
import React from "react";
import Dash from "react-native-dash";

const SmallTicket = () => {
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
      w="3xs"
      mr={4}
    >
      <Box bg="white" rounded="lg" alignItems="center">
        <Text m="2" fontWeight={700}>
          Super Bowl
        </Text>
        <Dash
          style={{ width: "100%", height: 0 }}
          dashThickness={1}
          dashGap={3}
          dashStyle={{
            opacity: 0.25,
          }}
          m="2"
        />
        <Text m="2" fontWeight={700}>
          Sunday, 13 Feb 22
        </Text>
      </Box>
    </Box>
  );
};

export default SmallTicket;
