import {
  Text,
  Box,
  Container,
  HStack,
  VStack,
  Avatar,
  FlatList,
  ScrollView,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import SmallTicket from "../components/tickets/SmallTicket";
import moment from "moment";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

//Components
import BalanceCard from "../components/cards/BalanceCard";
import FeaturedCard from "../components/cards/FeaturedCard";

//Redux
import { connect } from "react-redux";
import { fetchProfile } from "../redux/actions/profile";
import { getTicket } from "../redux/actions/ticket";
import { getEvent } from "../redux/actions/event";

const { height, width } = Dimensions.get("window");
const HomeScreen = ({
  navigation,
  profile,
  ticket,
  getTicket,
  event,
  getEvent,
  fetchProfile,
}) => {
  useEffect(() => {
    getEvent();
    getTicket(profile.email);
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  return (
    <GestureRecognizer
      onSwipeDown={() => {
        console.log("swipe down");
        setRefreshing(true);
        fetchProfile(profile.email);
        getTicket(profile.email);
        getEvent();
        setRefreshing(false);
      }}
      config={{ velocityThreshold: 0.01, directionalOffsetThreshold: 50 }}
      style={{ flex: 1, zIndex: 10 }}
    >
      <SafeAreaView>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* ----- Header ----- */}
          <HStack w="100%" justifyContent="space-between" mt={4}>
            <VStack>
              <Text fontWeight={700} fontSize="xl">
                Welcome Back,
              </Text>
              <Text fontWeight={700} fontSize="xl">
                {`${profile.firstName} ${profile.lastName}`}
              </Text>
            </VStack>
            <Avatar
              alignSelf="center"
              size="md"
              source={{
                uri: profile.avatarURL,
              }}
            >
              {`${profile.firstName[0]} ${profile.lastName[0]}`}
            </Avatar>
          </HStack>
          {/* ------------------ */}
          <BalanceCard />

          {/* ----- Active Ticket ----- */}
          <Text fontWeight={700} fontSize="lg" color="grey" mt={4}>
            Active Ticket
          </Text>
          <Box mt={4}>
            {ticket.allTicket.filter((el) => !el.is_expired).length > 0 ? (
              <FlatList
                data={ticket.allTicket.filter((el) => !el.is_expired)}
                keyExtractor={(item, index) => {
                  return item.ticket?.id || index + 100;
                }}
                horizontal={true}
                renderItem={({ item }) => {
                  const { title, date, time } = item;
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
                        navigation.navigate("TicketDetail", {
                          id: item.ticket.id,
                        });
                      }}
                    >
                      <SmallTicket
                        title={title}
                        date={`${dateMoment.date()} ${
                          monthNames[dateMoment.month()]
                        } ${dateMoment.year()} - ${time}`}
                      />
                    </TouchableOpacity>
                  );
                }}
                showsHorizontalScrollIndicator={false}
              />
            ) : (
              <Text fontWeight={500} fontSize="md">
                No Ticket Found
              </Text>
            )}
          </Box>
          {/* ------------------ */}
          {/* ----- Featured ----- */}
          <Text fontWeight={700} fontSize="lg" color="grey" mt={4}>
            Featured
          </Text>

          <Box mt={4}>
            <FlatList
              data={event.allEvent
                .filter((item, id) => item.tickets_remaining > 0)
                .slice(0, 5)}
              keyExtractor={(item, index) => item.id}
              horizontal={true}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("EventDetail", { id: item.id });
                  }}
                >
                  <FeaturedCard imageURL={item.images[0]} title={item.title} />
                </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </Box>
          {/* ------------------ */}
        </ScrollView>
      </SafeAreaView>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    height: height * 0.9,
  },
});

const mapStateToProps = ({ profile, ticket, event }) => ({
  profile,
  ticket,
  event,
});

const mapDispatchToProps = { fetchProfile, getTicket, getEvent };

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
