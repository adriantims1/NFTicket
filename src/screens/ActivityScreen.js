import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Button, HStack, Fab, FlatList } from "native-base";
import BigTicket from "../components/tickets/BigTicket";
import PlusIcon from "../components/icons/PlusIcon";
import moment from "moment";

const { width, height } = Dimensions.get("window");

//Redux
import { connect } from "react-redux";
import { fetchTransaction } from "../redux/actions/transaction";

const ActivityScreen = ({
  navigation,
  profile,
  ticket,
  event,
  fetchTransaction,
  transaction,
}) => {
  const [tab, useTab] = useState(true); //true: for sale tab, false: Sold tab

  useEffect(() => {
    fetchTransaction(profile.email);
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
            keyExtractor={(item, id) => id}
            data={
              tab
                ? [
                    ...ticket.allTicket
                      .map((el) => ({ ...el, type: "ticket" }))
                      .filter((el) => el.ticket.on_sale),
                    ...event.allEvent
                      .map((el) => ({ ...el, type: "event" }))
                      .filter((el) => el.vendor === profile.email),
                  ]
                : transaction.allTransaction
            }
            renderItem={({ item }) => {
              if (tab) {
                const { date, time, title, type } = item;

                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (type === "ticket")
                        navigation.navigate("TicketDetail", {
                          id: item.ticket.id,
                        });
                      else if (type === "event") {
                        navigation.navigate("EventDetail", {
                          id: item.id,
                        });
                      }
                    }}
                  >
                    <BigTicket title={title} date={formatDate(date, time)} />
                  </TouchableOpacity>
                );
              } else {
                const { event } = item;
                return (
                  <BigTicket
                    title={event.title}
                    date={formatDate(event.date, event.time)}
                  />
                );
              }
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

const mapStateToProps = ({ profile, event, ticket, transaction }) => ({
  profile,
  event,
  ticket,
  transaction,
});

const mapDispatchToProps = { fetchTransaction };

export default connect(mapStateToProps, mapDispatchToProps)(ActivityScreen);
