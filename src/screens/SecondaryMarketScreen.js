import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  HStack,
  IconButton,
  Modal,
  Alert,
  FormControl,
  ScrollView,
  Text,
  Spinner,
  Box,
  FlatList,
  VStack,
} from "native-base";
import { StyleSheet, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BigTicket from "../components/tickets/BigTicket";
import moment from "moment";

//Icon
import CloseIcon from "../components/icons/CloseIcon";
import CheckmarkIcon from "../components/icons/CheckmarkIcon";

//React Redux
import { connect } from "react-redux";
import {
  getOnSaleTicket,
  buyTicketFromSecondaryMarket,
} from "../redux/actions/ticket";
import ActionButton from "../components/buttons/ActionButton";

const { height, width } = Dimensions.get("window");

const SecondaryMarketScreen = ({
  navigation,
  getOnSaleTicket,
  ticket,
  profile,
  buyTicketFromSecondaryMarket,
}) => {
  const [successBuying, setSuccessBuying] = useState(false);
  const [buyingError, setBuyingError] = useState(false);
  useEffect(() => {
    getOnSaleTicket(navigation.getParam("event", ""));
  }, []);
  const formatDate = (date, time) => {
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
    return `${dateMoment.date()} ${
      monthNames[dateMoment.month()]
    } ${dateMoment.year()} - ${time}`;
  };
  return (
    <SafeAreaView>
      {/* ----- Navigator ----- */}
      <Box style={styles.container} mt={4}>
        <HStack alignItems="center" justifyContent="space-between">
          <IconButton
            icon={<CloseIcon color="black" />}
            onPress={() => {
              navigation.goBack();
            }}
            variant="unstyled"
          ></IconButton>
        </HStack>
        {/* ------------------ */}

        {/* ----- Data ----- */}
        <Text fontSize="xl" fontWeight={"bold"}>
          Secondary Market
        </Text>
        <Text fontSize="lg" fontWeight={"bold"}>
          Event: {navigation.getParam("title", "")}
        </Text>
        <Text fontSize="lg" fontWeight={"bold"}>
          Tickets Available:
        </Text>
        <Box alignItems={"center"} h="100%" flex={1} mt={4}>
          {ticket.onSaleTicket.filter((el) => el.ticket.owner !== profile.email)
            .length > 0 ? (
            <FlatList
              data={ticket.onSaleTicket.filter(
                (el) => el.ticket.owner !== profile.email
              )}
              keyExtractor={(item, id) => item.ticket.id}
              renderItem={({ item }) => (
                <VStack>
                  <BigTicket
                    title={item.title}
                    date={formatDate(item.date, item.time)}
                  />
                  <Text>Price: {item.ticket.price}</Text>
                  <ActionButton
                    text="Buy"
                    onPress={() => {
                      setSuccessBuying(false);
                      setBuyingError(false);
                      buyTicketFromSecondaryMarket(
                        profile.email,
                        item.ticket.id,
                        () => {
                          setSuccessBuying(true);
                          navigation.goBack();
                        } /*success*/,
                        () => {
                          setBuyingError(true);
                        } /*failure*/
                      );
                    }}
                    width="100%"
                  />
                </VStack>
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
            />
          ) : (
            <Text>No Ticket Found</Text>
          )}
        </Box>
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
        {successBuying ? (
          <Alert w="100%" status="success">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text fontSize="md" color="coolGray.800">
                    Ticket Bought
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
                    setSuccessBuying(false);
                  }}
                />
              </HStack>
            </VStack>
          </Alert>
        ) : null}
      </Box>
      {/* ------------------ */}
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

const mapStateToProps = ({ profile, ticket }) => ({ profile, ticket });

const mapDispatchToProps = { getOnSaleTicket, buyTicketFromSecondaryMarket };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondaryMarketScreen);
