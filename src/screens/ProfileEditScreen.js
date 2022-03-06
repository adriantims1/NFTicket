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
} from "native-base";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import ActionButton from "../components/buttons/ActionButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//Icon
import CloseIcon from "../components/icons/CloseIcon";
import CheckmarkIcon from "../components/icons/CheckmarkIcon";

const { height, width } = Dimensions.get("window");

const EventDetailScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
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

        <VStack mt={4} alignItems="center">
          <Avatar
            size="xl"
            source={{
              uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
            }}
            mb={4}
          >
            JD
          </Avatar>
          <TouchableOpacity>
            <Text fontSize="lg">Change Profile Picture</Text>
          </TouchableOpacity>
        </VStack>
        {/* ------------------ */}
        {/* ----- Forms ----- */}
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          style={{ flex: 1 }}
        >
          <Box>
            <VStack flex={1}>
              <Input mt={2} placeholder="Name" />
              <Input mt={2} placeholder="Username" />
              <Input mt={2} placeholder="Email" />
              <Input mt={2} placeholder="Old Password" />
              <Input mt={2} placeholder="New Password" />
              <Input mt={2} placeholder="New Password, again" />
            </VStack>
          </Box>
        </KeyboardAwareScrollView>

        {/* ------------------ */}
      </Box>
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
