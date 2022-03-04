import { Box } from "native-base";
import React from "react";

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
    >
      <Box bg="white" p={10} rounded="lg"></Box>
    </Box>
  );
};

export default SmallTicket;
