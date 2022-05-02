import {
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Button, HStack, Input, Text } from "native-base";
import SearchIcon from "../components/icons/SearchIcon";
import MarketCard from "../components/cards/MarketCard";
const { height, width } = Dimensions.get("window");
import moment from "moment";
import GestureRecognizer from "react-native-gesture-handler";

//redux
import { connect } from "react-redux";
import { fetchProfile } from "../redux/actions/profile";
import { getTicket } from "../redux/actions/ticket";
import { getEvent } from "../redux/actions/event";

const MarketScreen = ({
  navigation,
  event,
  profile,
  fetchProfile,
  getTicket,
  getEvent,
}) => {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState(event.allEvent);
  return (
    <SafeAreaView>
      <Box style={styles.container}>
        {/* ----- Navigator ----- */}
        <Box mt={4}>
          <Text fontSize="xl" fontWeight={700}>
            Explore
          </Text>
          <Input
            variants="filled"
            placeholder="Search"
            InputLeftElement={<SearchIcon color="black" />}
            border={0}
            mt={2}
            value={search}
            onChangeText={(text) => setSearch(text)}
            onSubmitEditing={() => {
              const newEvents = event.allEvent.filter((item) => {
                return item.title
                  .toLowerCase()
                  .match(new RegExp(search.toLowerCase()));
              });
              setEvents(newEvents);
            }}
          ></Input>
        </Box>
        {/* ------------------ */}
        {/* ----- Sort Tabs ----- */}
        {/* <HStack justifyContent={"space-evenly"} mt={4}>
          <Button
            variant="unstyled"
            _text={{ fontWeight: 600, fontSize: "sm" }}
          >
            Filter
          </Button>
          <Button
            variant={"unstyled"}
            _text={{ fontWeight: 600, fontSize: "sm" }}
          >
            Sort
          </Button>
        </HStack> */}
        {/* ------------------ */}
        {/* ----- Market ----- */}
        <Box h="100%" flex={1}>
          <FlatList
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 10,
              paddingBottom: 50,
              flexGrow: 1,
            }}
            numColumns={2}
            data={events}
            renderItem={({ item }) => {
              const date = moment(
                `${item.date} ${item.time}`,
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
                    navigation.navigate("EventDetail", {
                      id: item.id,
                    });
                  }}
                >
                  <MarketCard
                    imageURL={item.images[0]}
                    title={item.title}
                    location={item.state}
                    month={monthNames[date.month()]}
                    date={date.date()}
                  />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, id) => item.id}
          />
        </Box>
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
const mapStateToProps = ({ event, profile }) => ({
  event,
  profile,
});

const mapDispatchToProps = { fetchProfile, getEvent, getTicket };

export default connect(mapStateToProps, mapDispatchToProps)(MarketScreen);
