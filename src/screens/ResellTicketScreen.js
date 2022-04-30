import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  HStack,
  IconButton,
  Modal,
  FormControl,
  Input,
  ScrollView,
  Stack,
  Switch,
  Text,
  Spinner,
} from "native-base";
import { StyleSheet, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//Icon
import CloseIcon from "../components/icons/CloseIcon";
import CheckmarkIcon from "../components/icons/CheckmarkIcon";

//React Redux
import { connect } from "react-redux";
import { modifyOwnTicket } from "../redux/actions/ticket";

const { height, width } = Dimensions.get("window");

const ResellTicketScreen = ({
  navigation,
  modifyOwnTicket,
  profile,
  ticket,
}) => {
  const [price, setPrice] = useState(navigation.getParam("price", 0));
  const [onSale, setOnSale] = useState(navigation.getParam("onSale", false));
  const modifyTicket = () => {
    modifyOwnTicket(
      navigation.getParam("id"),
      onSale,
      price,
      profile.email,
      navigation.getParam("nftId"),
      navigation.getParam("isExpired"),
      navigation.getParam("event")
    );
    navigation.goBack();
  };
  return (
    <SafeAreaView>
      {ticket.isBuying ? (
        <Modal isOpen={ticket.isBuying}>
          <Modal.Content>
            <Modal.Body justifyContent={"center"} alignItems="center">
              <Text fontSize="lg">Please Wait</Text>
              <Spinner size="lg" mt={4}></Spinner>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      ) : null}
      <KeyboardAwareScrollView>
        <ScrollView
          style={styles.container}
          mt={4}
          showsVerticalScrollIndicator={false}
        >
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
              onPress={modifyTicket}
              variant="unstyled"
            ></IconButton>
          </HStack>
          {/* ------------------ */}

          {/* ----- Forms ----- */}
          <FormControl>
            <FormControl.Label>Price</FormControl.Label>
            <Input
              keyboardType="numeric"
              value={`${price}`}
              onChangeText={(text) => {
                setPrice(text);
              }}
            />
          </FormControl>
          <FormControl>
            <Stack alignItems={"flex-start"}>
              <FormControl.Label>Sell Ticket</FormControl.Label>
              <Switch
                value={onSale}
                onValueChange={(val) => {
                  setOnSale(val);
                }}
              />
            </Stack>
          </FormControl>
          {/* ------------------ */}
        </ScrollView>
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

const mapStateToProps = ({ profile, ticket }) => ({ profile, ticket });

const mapDispatchToProps = { modifyOwnTicket };

export default connect(mapStateToProps, mapDispatchToProps)(ResellTicketScreen);
