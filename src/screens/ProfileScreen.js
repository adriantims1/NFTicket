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

const { height, width } = Dimensions.get("window");

const ProfileScreen = ({ navigation, profile }) => {
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
            data={tab ? [1, 2, 3, 4, 5, 6, 7] : []}
            renderItem={() => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("TicketDetail");
                }}
              >
                <BigTicket />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}
          ></FlatList>
        </Box>

        {/* ------------------ */}
        <Fab
          renderInPortal={false}
          shadow={2}
          size="md"
          icon={<LogoutIcon color="black" />}
          onPress={() => handleSignOut()}
        />
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

const mapStateToProps = ({ profile }) => ({
  profile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
