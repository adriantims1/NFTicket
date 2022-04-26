import { Box, Text } from "native-base";
import React, { useEffect } from "react";
import Dash from "react-native-dash";

const SmallTicket = ({ title, date }) => {
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
          {title}
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
          {date}
        </Text>
      </Box>
    </Box>
  );
};

export default SmallTicket;
