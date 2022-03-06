import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack, IconButton, Text, Box, ScrollView } from "native-base";
import { StyleSheet, Dimensions } from "react-native";

//Icon
import BackIcon from "../components/icons/BackIcon";
import PinIcon from "../components/icons/PinIcon";
import CalendarIcon from "../components/icons/CalendarIcon";
import AlgorandIcon from "../components/icons/AlgorandIcon";

//Component
import CarouselCard from "../components/cards/CarouselCard";
import ActionButton from "../components/buttons/ActionButton";

const { height, width } = Dimensions.get("window");

const EventDetailScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Box style={styles.container} mt={4}>
        {/* ----- Navigator ----- */}
        <HStack alignItems="center" justifyContent="space-between">
          <IconButton
            icon={<BackIcon color="black" />}
            onPress={() => {
              navigation.goBack();
            }}
            variant="unstyled"
          ></IconButton>
          <Text fontWeight={700} fontSize="lg">
            ID 6876904689
          </Text>
        </HStack>
        {/* ------------------ */}
        {/* ----- Carousel ----- */}
        <CarouselCard />
        {/* ------------------ */}
        {/* ----- Detail ----- */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text fontSize="2xl" fontWeight={700} mb={2}>
            Super Bowl
          </Text>
          <HStack mb={2}>
            <PinIcon color="black" />
            <Text ml={2} fontWeight={700} fontSize="md">
              Maddison Squre Garden
            </Text>
          </HStack>
          <HStack mb={2}>
            <CalendarIcon color="black" />
            <Text ml={2} fontWeight={700} fontSize="md">
              13 February 2022 - 10:00 AM
            </Text>
          </HStack>
          <HStack mb={2}>
            <AlgorandIcon color="black" />
            <Text ml={2} fontWeight={700} fontSize="md">
              96.31843
            </Text>
          </HStack>
          <Text fontWeight={700} fontSize="md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Pellentesque diam volutpat commodo sed egestas egestas fringilla
            phasellus. Id aliquet risus feugiat in ante metus dictum at.
            Fermentum leo vel orci porta non pulvinar. Sit amet purus gravida
            quis. Malesuada proin libero nunc consequat interdum varius. Commodo
            elit at imperdiet dui accumsan sit amet nulla.
          </Text>
        </ScrollView>
        {/* ------------------ */}
        <ActionButton text="Resell" width="100%" />
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    height: height * 0.95,
  },
});

export default EventDetailScreen;
