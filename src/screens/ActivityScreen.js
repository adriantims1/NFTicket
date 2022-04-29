import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Button, HStack, Fab, FlatList } from "native-base";
import BigTicket from "../components/tickets/BigTicket";
import PlusIcon from "../components/icons/PlusIcon";
import { connect } from "react-redux";
import moment from "moment";

const { width, height } = Dimensions.get("window");

const ActivityScreen = ({ navigation, profile, ticket, event }) => {
  const [tab, useTab] = useState(true); //true: for sale tab, false: Sold tab
  return (
    <SafeAreaView>
      <Box style={styles.container} mt={4}>
        <HStack justifyContent={"space-evenly"}>
          {/* ----- Navigator ----- */}
          <Button
            variant={"unstyled"}
            _text={{ fontWeight: 700, fontSize: "lg" }}
            opacity={tab ? 1 : 0.25}
            onPress={() => {
              useTab(true);
            }}
          >
            On Sale
          </Button>
          <Button
            variant={"unstyled"}
            _text={{ fontWeight: 700, fontSize: "lg" }}
            opacity={tab ? 0.25 : 1}
            onPress={() => {
              useTab(false);
            }}
          >
            Sold
          </Button>
        </HStack>
        {/* ------------------ */}
        {/* ----- Display ----- */}
        <Box alignItems={"center"} h="100%" flex={1} mt={4}>
          <FlatList
            keyExtractor={(item, id) => {
              const toReturn = item.ticket?.id ? item.ticket.id : item.id;
            }}
            data={
              tab
                ? [
                    ...ticket.allTicket
                      .map((el) => ({ ...el, type: "ticket" }))
                      .filter((el) => el.on_sale),
                    ...event.allEvent
                      .map((el) => ({ ...el, type: "event" }))
                      .filter((el) => el.vendor === profile.email),
                  ]
                : []
            }
            renderItem={({ item }) => {
              const { date, time, title, type } = item;
              const dateMoment = moment(
                `${date} ${time}`,
                "YYYY-MM-DD hh:mm:ss"
              );
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
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (type === "ticket")
                      navigation.navigate("TicketDetail", {
                        id: item.ticket.id,
                      });
                    else if (type === "event") {
                      navigation.navigate("EventDetail", {
                        imageURL: item.images /*array of images*/,
                        title: item.title,
                        venue: `${item.street_address}, ${item.city} ${item.state} ${item.zipcode}`,
                        date: `${dateMoment.date()} ${
                          monthNames[dateMoment.month()]
                        } ${dateMoment.year()} - ${item.time}`,
                        price: item.event_price,
                        description: item.description,
                        id: item.ticket_nft_id,
                        vendor: item.vendor,
                      });
                    }
                  }}
                >
                  <BigTicket
                    title={title}
                    date={`${dateMoment.date()} ${
                      monthNames[dateMoment.month()]
                    } ${dateMoment.year()} - ${time}`}
                  />
                </TouchableOpacity>
              );
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}
          ></FlatList>
        </Box>
        {/* ------------------ */}
        {profile.isSeller ? (
          <Fab
            renderInPortal={false}
            shadow={2}
            size="sm"
            icon={<PlusIcon color="black" />}
            onPress={() => {
              navigation.navigate("SellTicket");
            }}
          />
        ) : null}{" "}
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    height: height * 0.9,
  },
});

const mapStateToProps = ({ profile, event, ticket }) => ({
  profile,
  event,
  ticket,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityScreen);
