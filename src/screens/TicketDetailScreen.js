import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack, IconButton, Text, Box, ScrollView } from "native-base";
import { StyleSheet, Dimensions } from "react-native";
import moment from "moment";

//Icon
import BackIcon from "../components/icons/BackIcon";
import PinIcon from "../components/icons/PinIcon";
import CalendarIcon from "../components/icons/CalendarIcon";
import AlgorandIcon from "../components/icons/AlgorandIcon";

//Component
import DetailTicket from "../components/tickets/DetailTicket";
import ActionButton from "../components/buttons/ActionButton";
const { height, width } = Dimensions.get("window");

//Redux
import { connect } from "react-redux";

const TicketDetailScreen = ({ navigation, ticket }) => {
  const [nftId, setNftId] = useState("");
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [onSale, setOnSale] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [event, setEvent] = useState(null);
  const [owner, setOwner] = useState("");
  const [valid, setValid] = useState("");

  useEffect(() => {
    const theTicket = ticket.allTicket.find(
      (el) => el.ticket.id === navigation.getParam("id", "")
    );
    const {
      ticket_nft_id,
      title,
      description,
      street_address,
      city,
      zipcode,
      state,
      date,
      time,
    } = theTicket;
    const { price, on_sale, is_expired, event, owner } = theTicket.ticket;

    setOwner(owner);
    setNftId(ticket_nft_id);
    setEventName(title);
    setLocation(`${street_address}, ${city} ${state} ${zipcode}`);
    setPrice(price);
    setDescription(description);
    setOnSale(on_sale);
    setEvent(event);
    setIsExpired(is_expired);

    setValid(date);
    const dateMoment = moment(`${date} ${time}`, "YYYY-MM-DD hh:mm:ss");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    setDate(
      `${dateMoment.date()} ${
        monthNames[dateMoment.month()]
      } ${dateMoment.year()} - ${time}`
    );
  }, []);

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
            ID {nftId}
          </Text>
        </HStack>
        {/* ------------------ */}
        {/* ----- Ticket ----- */}
        <DetailTicket valid={valid} owner={owner} nftId={nftId} />
        {/* ------------------ */}
        {/* ----- Detail ----- */}
        <ScrollView showsVerticalScrollIndicator={false} mt={4}>
          <Text fontSize="2xl" fontWeight={700} mb={2}>
            {eventName}
          </Text>
          <HStack mb={2}>
            <PinIcon color="black" />
            <Text ml={2} fontWeight={700} fontSize="md">
              {location}
            </Text>
          </HStack>
          <HStack mb={2}>
            <CalendarIcon color="black" />
            <Text ml={2} fontWeight={700} fontSize="md">
              {date}
            </Text>
          </HStack>
          <HStack mb={2}>
            <AlgorandIcon color="black" />
            <Text ml={2} fontWeight={700} fontSize="md">
              {price}
            </Text>
          </HStack>
          <Text fontWeight={700} fontSize="md">
            {description}
          </Text>
        </ScrollView>
        {/* ------------------ */}
        <ActionButton
          text="Resell"
          width="100%"
          onPress={() => {
            navigation.navigate("ResellTicket", {
              price,
              onSale,
              id: navigation.getParam("id", ""),
              nftId,
              isExpired,
              event,
            });
          }}
        />
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
const mapStateToProps = ({ ticket, profile }) => ({
  ticket,
  profile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TicketDetailScreen);
