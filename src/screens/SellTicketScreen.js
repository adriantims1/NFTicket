import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  HStack,
  IconButton,
  Text,
  Box,
  Avatar,
  VStack,
  FormControl,
  Input,
  ScrollView,
  Stack,
  AddIcon,
} from "native-base";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import ActionButton from "../components/buttons/ActionButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//Icon
import CloseIcon from "../components/icons/CloseIcon";
import CheckmarkIcon from "../components/icons/CheckmarkIcon";
import PlusIcon from "../components/icons/PlusIcon";

const { height, width } = Dimensions.get("window");

const EventDetailScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <Box style={styles.container} mt={4}>
          {/* ----- Navigator ----- */}

          <HStack alignItems="center" justifyContent="space-between">
            <IconButton
              icon={<CloseIcon color="black" />}
              onPress={() => {
                navigation.goBack();
              }}
              variant="unstyled"
            ></IconButton>

            <IconButton
              icon={<CheckmarkIcon color="black" />}
              onPress={() => {
                navigation.goBack();
              }}
              variant="unstyled"
            ></IconButton>
          </HStack>
          {/* ------------------ */}

          {/* ----- Profile Picture ----- */}

          <HStack
            width="90%"
            h={width * 0.7}
            borderRadius={1}
            borderWidth={1}
            borderStyle="dashed"
            borderColor="black"
            alignSelf={"center"}
            justifyContent={"center"}
            alignItems="center"
          >
            <AddIcon size="xl" />
          </HStack>
          {/* ------------------ */}
          {/* ----- Forms ----- */}

          <FormControl>
            <Stack>
              <FormControl.Label>Event Name</FormControl.Label>
              <Input />
            </Stack>
          </FormControl>
          <FormControl>
            <Stack>
              <FormControl.Label>Location</FormControl.Label>
              <Input />
            </Stack>
          </FormControl>
          <FormControl>
            <Stack>
              <FormControl.Label>Date</FormControl.Label>
              <Input />
            </Stack>
          </FormControl>
          <FormControl>
            <Stack>
              <FormControl.Label>Quantity</FormControl.Label>
              <Input />
            </Stack>
          </FormControl>
          <FormControl>
            <Stack>
              <FormControl.Label>Price</FormControl.Label>
              <Input />
            </Stack>
          </FormControl>

          {/* ------------------ */}
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    height: height * 0.95,
  },
});

export default EventDetailScreen;
