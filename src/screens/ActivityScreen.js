import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Button, HStack, Fab, FlatList, Icon, AddIcon } from "native-base";
import BigTicket from "../components/tickets/BigTicket";

const { width, height } = Dimensions.get("window");

const ActivityScreen = ({ navigation }) => {
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
            For Sale
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
          size="sm"
          icon={<AddIcon size="sm" color="black" />}
        />{" "}
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

export default ActivityScreen;
