import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  HStack,
  IconButton,
  Text,
  Box,
  ScrollView,
  VStack,
  Modal,
  Spinner,
  Alert,
  CloseIcon,
} from "native-base";
import { StyleSheet, Dimensions } from "react-native";
import moment from "moment";

//Redux
import { connect } from "react-redux";
import { buyTicketFromEventManager } from "../redux/actions/ticket";

//Icon
import BackIcon from "../components/icons/BackIcon";
import PinIcon from "../components/icons/PinIcon";
import CalendarIcon from "../components/icons/CalendarIcon";
import AlgorandIcon from "../components/icons/AlgorandIcon";

//Component
import CarouselCard from "../components/cards/CarouselCard";
import ActionButton from "../components/buttons/ActionButton";

const { height, width } = Dimensions.get("window");

const EventDetailScreen = ({
  navigation,
  event,
  profile,
  buyTicketFromEventManager,
  ticket,
}) => {
  // const { imageURL, title, venue, date, price, description } = route.params;
  const [title, setTitle] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [nftId, setNftId] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [vendor, setVendor] = useState("");
  const [id, setId] = useState(null);
  const [buyingError, setBuyingError] = useState(false);
  const [puchaseSuccessful, setPurchaseSuccessful] = useState(false);

  useEffect(() => {
    const theEvent = event.allEvent.find(
      (el) => el.id === navigation.getParam("id", "")
    );
    const {
      event_price: price,
      ticket_nft_id: nftId,
      street_address: street,
      city,
      state,
      zipcode,
      title,
      date,
      time,
      vendor,
      images,
      description,
      id,
      tickets_remaining,
    } = theEvent;
    setPrice(price);
    setNftId(nftId);
    setStreet(street);
    setCity(city);
    setState(state);
    setZipcode(zipcode);
    setTitle(title);
    setDate(date);
    setTime(time);
    setVendor(vendor);
    setDescription(description);
    setImages(images);
    setId(id);
  }, []);

  const formatDate = () => {
    const dateMoment = moment(date);
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
    return `${dateMoment.date()} ${
      monthNames[dateMoment.month()]
    } ${dateMoment.year()} `;
  };

  const formatTime = () => {
    const timeMoment = moment(`${date} ${time}`);
    const suffix = timeMoment.hour() >= 12 ? "PM" : "AM";
    return `${
      ((timeMoment.hour() + 11) % 12) + 1
    }:${timeMoment.minute()} ${suffix}`;
  };
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
        {/* ----- Carousel ----- */}
        <CarouselCard data={images} />
        {/* ------------------ */}
        {/* ----- Detail ----- */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text fontSize="2xl" fontWeight={700} mb={2}>
            {title}
          </Text>
          <HStack mb={2}>
            <PinIcon color="black" />
            <Text ml={2} fontWeight={700} fontSize="md">
              {`${street}, ${city} ${state} ${zipcode}`}
            </Text>
          </HStack>
          <HStack mb={2}>
            <CalendarIcon color="black" />
            <Text ml={2} fontWeight={700} fontSize="md">
              {`${formatDate()} - ${formatTime()}`}
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

        {vendor !== profile.email ? (
          <VStack justifyContent={"center"} alignItems="center">
            <Text>Buy Ticket From:</Text>
            <HStack w="100%" justifyContent={"space-between"} mt={4}>
              <ActionButton
                text="Event Manager"
                width="45%"
                onPress={() => {
                  setPurchaseSuccessful(false);
                  setBuyingError(false);
                  buyTicketFromEventManager(
                    id,
                    profile.email,
                    () => {
                      setPurchaseSuccessful(true);
                    } /*success*/,
                    () => {
                      setBuyingError(true);
                    }
                  ); /*failure*/
                }}
                isDisabled={
                  event.allEvent.find(
                    (el) => el.id === navigation.getParam("id", "")
                  ).tickets_remaining === 0
                }
              />
              <ActionButton
                text="Secondary Market"
                width="45%"
                onPress={() => {
                  navigation.navigate("SecondaryMarket", { title, event: id });
                }}
              />
            </HStack>
          </VStack>
        ) : (
          <ActionButton
            text="Modify Event"
            width="100%"
            onPress={() => {
              navigation.navigate("SellTicket", {
                operation: "modify",
                id,
              });
            }}
          />
        )}
        {ticket.isBuying ? (
          <Modal isOpen={ticket.isBuying}>
            <Modal.Content>
              <Modal.Body justifyContent={"center"} alignItems="center">
                <Text fontSize="lg">Please Wait</Text>
                <Spinner size="lg" mt={4}></Spinner>
              </Modal.Body>
            </Modal.Content>
          </Modal>
        ) : null}
        {buyingError ? (
          <Alert w="100%" status="error">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text fontSize="md" color="coolGray.800">
                    Insufficient Funds
                  </Text>
                </HStack>
                <IconButton
                  variant="unstyled"
                  _focus={{
                    borderWidth: 0,
                  }}
                  icon={<CloseIcon size="3" />}
                  _icon={{
                    color: "coolGray.600",
                  }}
                  onPress={() => {
                    setBuyingError(false);
                  }}
                />
              </HStack>
            </VStack>
          </Alert>
        ) : null}
        {puchaseSuccessful ? (
          <Alert w="100%" status="success">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text fontSize="md" color="coolGray.800">
                    Purchase Successful
                  </Text>
                </HStack>
                <IconButton
                  variant="unstyled"
                  _focus={{
                    borderWidth: 0,
                  }}
                  icon={<CloseIcon size="3" />}
                  _icon={{
                    color: "coolGray.600",
                  }}
                  onPress={() => {
                    setPurchaseSuccessful(false);
                  }}
                />
              </HStack>
            </VStack>
          </Alert>
        ) : null}
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
const mapStateToProps = ({ event, profile, ticket }) => ({
  event,
  profile,
  ticket,
});

const mapDispatchToProps = {
  buyTicketFromEventManager,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailScreen);
