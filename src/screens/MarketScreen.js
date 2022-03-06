import {
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Button, HStack, Input, Text } from "native-base";
import SearchIcon from "../components/icons/SearchIcon";
import MarketCard from "../components/cards/MarketCard";
const { height, width } = Dimensions.get("window");
const MarketScreen = ({ navigation }) => {
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
          ></Input>
        </Box>
        {/* ------------------ */}
        {/* ----- Sort Tabs ----- */}
        <HStack justifyContent={"space-evenly"} mt={4}>
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
        </HStack>
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
            data={[1, 2, 3, 4, 5, 6, 7, 8]}
            renderItem={() => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EventDetail");
                }}
              >
                <MarketCard />
              </TouchableOpacity>
            )}
            keyExtractor={(item, id) => item}
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

export default MarketScreen;
