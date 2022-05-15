import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import {
  Avatar,
  HStack,
  Box,
  VStack,
  Text,
  IconButton,
  Button,
  FlatList,
  Fab,
} from "native-base";
import BigTicket from "../components/tickets/BigTicket";
import EditProfileIcon from "../components/icons/EditProfileIcon";
import LogoutIcon from "../components/icons/LogoutIcon";
import { auth } from "../firebase";
import { connect } from "react-redux";
import moment from "moment";

const { height, width } = Dimensions.get("window");

const ProfileScreen = ({ navigation, profile, ticket, event }) => {
  const [tab, useTab] = useState(true); //false: history tab; true: active tab

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView>
      <Box style={styles.container} mt={4}>
        {/* ----- Header ----- */}
        <HStack justifyContent={"space-between"} alignItems="center">
          <HStack alignItems={"center"}>
            <Avatar
              size="lg"
              source={{
                uri: profile.avatarURL,
              }}
            >
              {`${profile.firstName[0]}${profile.lastName[0]}`}
            </Avatar>
            <VStack ml={4}>
              <Text fontSize="xl" fontWeight={700}>
                {`${profile.firstName} ${profile.lastName}`}
              </Text>
              <Text>{`@${profile.username}`}</Text>
            </VStack>
          </HStack>
          <IconButton
            variant={"unstyled"}
            icon={<EditProfileIcon color="black" />}
            color="transparent"
            onPress={() => {
              navigation.navigate("ProfileEdit");
            }}
          ></IconButton>
        </HStack>
        {/* ------------------ */}
        {/* ----- Tab Navigator ----- */}
        <HStack justifyContent={"space-evenly"} my={4}>
          <Button
            variant="unstyled"
            _text={{ fontSize: "lg" }}
            onPress={() => {
              useTab(true);
            }}
            opacity={tab ? 1 : 0.25}
          >
            Active
          </Button>
          <Button
            variant="unstyled"
            _text={{ fontSize: "lg" }}
            onPress={() => useTab(false)}
            opacity={tab ? 0.25 : 1}
          >
            History
          </Button>
        </HStack>
        {/* ------------------ */}
        {/* ----- Display ----- */}
        <Box alignItems={"center"} h="100%" flex={1}>
          <FlatList
            data={
              tab
                ? ticket.allTicket.filter((el) => !el.ticket.is_expired)
                : ticket.allTicket.filter((el) => el.ticket.is_expired)
            }
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
                    navigation.navigate("TicketDetail", { id: item.ticket.id });
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
            keyExtractor={(item, index) => item.ticket.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}
          ></FlatList>
        </Box>

        {/* ------------------ */}
      </Box>
      <Fab
        renderInPortal={false}
        shadow={2}
        size="md"
        icon={<LogoutIcon color="black" />}
        onPress={() => handleSignOut()}
      />
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
