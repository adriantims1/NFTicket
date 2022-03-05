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
import React from "react";
import SmallTicket from "../components/tickets/SmallTicket";

import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";

//Components
import BalanceCard from "../components/cards/BalanceCard";
import FeaturedCard from "../components/cards/FeaturedCard";

const { height, width } = Dimensions.get("window");
const HomeScreen = ({ navigation }) => {
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
              John!
            </Text>
          </VStack>
          <Avatar
            bg="yellow.500"
            alignSelf="center"
            size="md"
            source={{
              uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
            }}
          >
            JD
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
            data={[1, 2, 3, 4]}
            keyExtractor={(item, index) => item}
            horizontal={true}
            renderItem={() => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("TicketDetail");
                }}
              >
                <SmallTicket />
              </TouchableOpacity>
            )}
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
            renderItem={() => <FeaturedCard />}
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

export default HomeScreen;
