import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack, IconButton, Text, Box, ScrollView } from "native-base";
import { StyleSheet, Dimensions } from "react-native";

//Redux
import { connect } from "react-redux";

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
  // const { imageURL, title, venue, date, price, description } = route.params;
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
            {`ID ${navigation.getParam("id", "")}`}
          </Text>
        </HStack>
        {/* ------------------ */}
        {/* ----- Carousel ----- */}
        <CarouselCard data={navigation.getParam("imageURL", [])} />
        {/* ------------------ */}
        {/* ----- Detail ----- */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text fontSize="2xl" fontWeight={700} mb={2}>
            {navigation.getParam("title", "")}
          </Text>
          <HStack mb={2}>
            <PinIcon color="black" />
            <Text ml={2} fontWeight={700} fontSize="md">
              {navigation.getParam("venue", "")}
            </Text>
          </HStack>
          <HStack mb={2}>
            <CalendarIcon color="black" />
            <Text ml={2} fontWeight={700} fontSize="md">
              {navigation.getParam("date", "")}
            </Text>
          </HStack>
          <HStack mb={2}>
            <AlgorandIcon color="black" />
            <Text ml={2} fontWeight={700} fontSize="md">
              {navigation.getParam("price", "")}
            </Text>
          </HStack>
          <Text fontWeight={700} fontSize="md">
            {navigation.getParam("description", "")}
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
const mapStateToProps = ({ event }) => ({
  event,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailScreen);
