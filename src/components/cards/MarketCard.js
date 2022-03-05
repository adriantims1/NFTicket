import { Text, Box, Image, ZStack, VStack } from "native-base";
import React from "react";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const MarketCard = ({ imageURL, title }) => {
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
            uri: "https://wallpaperaccess.com/full/317501.jpg",
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
      <Box w={width / 2 - width * 0.1} h={225} p={4} justifyContent="flex-end">
        <VStack>
          <Text color="white" fontSize={"lg"} fontWeight={600}>
            Rock
          </Text>
          <Text color="white" fontSize={"lg"} fontWeight={600}>
            Climbing
          </Text>
          <Text color="white" fontSize={"xs"} fontWeight={200}>
            California
          </Text>
        </VStack>
      </Box>
    </ZStack>
  );
};

export default MarketCard;
