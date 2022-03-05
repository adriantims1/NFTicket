import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Avatar,
  HStack,
  Box,
  VStack,
  Text,
  IconButton,
  Button,
  FlatList,
} from "native-base";
import BigTicket from "../components/tickets/BigTicket";
import EditProfileIcon from "../components/icons/EditProfileIcon";

const { height, width } = Dimensions.get("window");

const ProfileScreen = () => {
  const [tab, useTab] = useState(true); //false: history tab; true: active tab

  return (
    <SafeAreaView>
      <Box style={styles.container} mt={4}>
        {/* ----- Header ----- */}
        <HStack justifyContent={"space-between"} alignItems="center">
          <HStack alignItems={"center"}>
            <Avatar
              size="lg"
              source={{
                uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
              }}
            >
              JD
            </Avatar>
            <VStack ml={4}>
              <Text fontSize="xl" fontWeight={700}>
                John Doe
              </Text>
              <Text>@johndoe</Text>
            </VStack>
          </HStack>
          <IconButton
            variant={"unstyled"}
            icon={<EditProfileIcon color="black" />}
            color="transparent"
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
              <TouchableWithoutFeedback>
                <BigTicket />
              </TouchableWithoutFeedback>
            )}
            keyExtractor={(item, index) => item}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}
          ></FlatList>
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

export default ProfileScreen;
