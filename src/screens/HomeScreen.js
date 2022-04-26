import {
  Text,
  Box,
  Container,
  HStack,
  VStack,
  Avatar,
  FlatList,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import SmallTicket from "../components/tickets/SmallTicket";
import moment from "moment";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";

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
}) => {
  useEffect(() => {
    getEvent();
    getTicket(profile.email);
  }, []);

  return (
    <SafeAreaView>
      <Box style={styles.container}>
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
            bg="yellow.500"
            alignSelf="center"
            size="md"
            source={{
              uri: profile.avatarURL,
            }}
          >
            {`${profile.firstName[0].toUpperCase()} ${profile.lastName[0].toUpperCase()}`}
          </Avatar>
        </HStack>
        {/* ------------------ */}
        <BalanceCard />
        {/* ----- Active Ticket ----- */}
        <Text fontWeight={700} fontSize="lg" color="grey" mt={4}>
          Active Ticket
        </Text>
        <Box mt={4}>
          <FlatList
            data={ticket.allTicket.filter((el) => !el.is_expired)}
            keyExtractor={(item, index) => item.id}
            horizontal={true}
            renderItem={({ item }) => {
              const { nft_id } = item;

              const { title, date, time } = event.allEvent.find(
                (el) => el.ticket_nft_id === nft_id
              );
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
                      id: nft_id,
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
        </Box>
        {/* ------------------ */}
        {/* ----- Featured ----- */}
        <Text fontWeight={700} fontSize="lg" color="grey" mt={4}>
          Featured
        </Text>

        <Box mt={4}>
          <FlatList
            data={[7, 8, 9, 10]}
            keyExtractor={(item, index) => item}
            horizontal={true}
            renderItem={() => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EventDetail");
                }}
              >
                <FeaturedCard />
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </Box>
        {/* ------------------ */}
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

const mapStateToProps = ({ profile, ticket, event }) => ({
  profile,
  ticket,
  event,
});

const mapDispatchToProps = { fetchProfile, getTicket, getEvent };

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
