import { Text, Box, Image, ZStack, VStack, HStack } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import states from "us-state-converter";

const { width, height } = Dimensions.get("window");
const MarketCard = ({ imageURL, title, month, date, location }) => {
  return (
    <ZStack w={width / 2 - width * 0.1} h={225} mb={8}>
      <Box
        w={width / 2 - width * 0.1}
        h={225}
        bgColor="white"
        borderRadius={10}
      >
        <Image
          source={{
            uri: imageURL,
          }}
          resizeMode="cover"
          alt="alternate text"
          size="100%"
          borderRadius={10}
        />
      </Box>
      <Box
        w={width / 2 - width * 0.1}
        h={225}
        bg={{
          linearGradient: {
            colors: ["transparent", "secondary.700"],
            start: [0, 0],
            end: [0, 1.5],
          },
        }}
        borderRadius={10}
      ></Box>
      <HStack>
        <Box
          w={width / 2 - width * 0.1}
          h={225}
          justifyContent="flex-end"
          p={2}
        >
          <HStack justifyContent="space-between">
            <VStack>
              <Text color="white" fontSize={"lg"} fontWeight={600}>
                {title}
              </Text>

              <Text color="white" fontSize={"xs"} fontWeight={200}>
                {states(location).name}
              </Text>
            </VStack>
            <VStack alignItems={"center"} justifyContent="flex-end">
              <Text color="white" fontSize={"xs"} fontWeight={200}>
                {month}
              </Text>
              <Text color="white" fontSize={"xl"} fontWeight={600}>
                {date}
              </Text>
            </VStack>
          </HStack>
        </Box>
      </HStack>
    </ZStack>
  );
};

export default MarketCard;
