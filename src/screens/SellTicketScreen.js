import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  HStack,
  IconButton,
  Box,
  Modal,
  FormControl,
  Input,
  ScrollView,
  Stack,
  ZStack,
  Image,
  Text,
  Spinner,
  TextArea,
} from "native-base";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import ActionButton from "../components/buttons/ActionButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import moment from "moment";

//Icon
import CloseIcon from "../components/icons/CloseIcon";
import CheckmarkIcon from "../components/icons/CheckmarkIcon";
import PlusIcon from "../components/icons/PlusIcon";

//React Redux
import { connect } from "react-redux";
import { createNewEvent, modifyEvent } from "../redux/actions/event";

const { height, width } = Dimensions.get("window");

const SellTicketScreen = ({
  navigation,
  event,
  createNewEvent,
  profile,
  modifyEvent,
}) => {
  const [images, setImages] = useState(["plus"]);
  const [imageIndex, setImageIndex] = useState(0);
  const [eventName, setEventName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [dateTime, setDateTime] = useState(moment());
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (navigation.getParam("operation", "create") !== "create") {
      const theEvent = event.allEvent.find(
        (el) => el.id === navigation.getParam("id", "")
      );
      const {
        event_price: price,
        ticket_quantity: quantity,
        street_address: street,
        city,
        state,
        zipcode,
        title,
        date,
        time,

        images,
        description,
      } = theEvent;
      setPrice(price);
      setQuantity(quantity);
      setStreet(street);
      setCity(city);
      setState(state);
      setZipCode(zipcode);
      setEventName(title);
      setDateTime(moment(`${date} ${time}`));
      setDescription(description);
      setImages(["plus", ...images]);
      setImageIndex(["plus", ...images].length > 1 ? 1 : 0);
    }
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImages([...images, result.uri]);
      setImageIndex(imageIndex + 1);
    }
  };

  const delImage = async () => {
    if (images.length > 1) {
      let temp = images;
      temp = arrayRemove(temp, imageIndex);
      setImages(temp);
      setImageIndex(imageIndex - 1);
    }
  };

  function arrayRemove(arr, value) {
    return arr.filter(function (ele, id) {
      return id != value;
    });
  }

  function addZeroBefore(n) {
    return (n < 10 ? "0" : "") + n;
  }

  const createEvent = async () => {
    try {
      let tempDate = `${dateTime.year()}-${addZeroBefore(
        dateTime.month() + 1
      )}-${addZeroBefore(dateTime.date())}`;
      let tempTime = `${addZeroBefore(dateTime.hour())}:${addZeroBefore(
        dateTime.minute()
      )}:00`;

      //Upload all images
      let tempNewImageUrl = [];
      if (images.length > 1) {
        for (const image of images.slice(1)) {
          const form = new FormData();

          form.append("image", {
            uri: image,
            type: "image/jpg",
            name: "image.jpg",
          });
          const data = await axios.post(
            "https://api.imgbb.com/1/upload?key=6b1e8b98295c868b89d24134aa528527",
            form
          );

          tempNewImageUrl = [...tempNewImageUrl, data.data.data.display_url];
        }
        setImages(["push", ...tempNewImageUrl]);
      }
      //-----------------
      createNewEvent(
        profile.email,
        city,
        state,
        zipCode,
        tempDate,
        tempTime,
        quantity,
        price,
        eventName,
        description,
        tempNewImageUrl,
        street
      );

      navigation.goBack();
    } catch (err) {}
  };

  const modifyEventFunc = async () => {
    try {
      let tempDate = `${dateTime.year()}-${addZeroBefore(
        dateTime.month() + 1
      )}-${addZeroBefore(dateTime.date())}`;
      let tempTime = `${addZeroBefore(dateTime.hour())}:${addZeroBefore(
        dateTime.minute()
      )}:00`;
      //Upload all images
      let tempNewImageUrl = [];
      if (images.length > 1) {
        for (const image of images.slice(1)) {
          if (!image.startsWith("http")) {
            const form = new FormData();

            form.append("image", {
              uri: image,
              type: "image/jpg",
              name: "image.jpg",
            });
            const data = await axios.post(
              "https://api.imgbb.com/1/upload?key=6b1e8b98295c868b89d24134aa528527",
              form
            );

            tempNewImageUrl = [...tempNewImageUrl, data.data.data.display_url];
          } else {
            tempNewImageUrl = [...tempNewImageUrl, image];
          }
        }
        setImages(["push", ...tempNewImageUrl]);
      }
      //-----------------
      modifyEvent(
        profile.email,
        city,
        state,
        zipCode,
        tempDate,
        tempTime,
        quantity,
        price,
        eventName,
        description,
        tempNewImageUrl,
        street,
        navigation.getParam("id", "")
      );
      navigation.goBack();
    } catch (err) {}
  };

  return (
    <SafeAreaView>
      {event.isUploading ? (
        <Modal isOpen={event.isUploading}>
          <Modal.Content>
            <Modal.Body justifyContent={"center"} alignItems="center">
              <Text fontSize="lg">Creating Event</Text>
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
              onPress={
                navigation.getParam("operation", "create") === "create"
                  ? createEvent
                  : modifyEventFunc
              }
              variant="unstyled"
            ></IconButton>
          </HStack>
          {/* ------------------ */}

          {/* ----- Profile Picture ----- */}
          <HStack justifyContent={"center"} w="100%" alignItems="center">
            <Box w="5%">
              <TouchableOpacity
                onPress={() => {
                  if (imageIndex > 0) {
                    setImageIndex(imageIndex - 1);
                  }
                }}
              >
                <AntDesign name="left" size={24} color="black" />
              </TouchableOpacity>
            </Box>

            <TouchableOpacity onPress={imageIndex === 0 ? pickImage : delImage}>
              <HStack
                minW="90%"
                width="90%"
                height={height * 0.35}
                borderRadius={1}
                borderWidth={1}
                borderStyle="dashed"
                borderColor="black"
                justifyContent={"center"}
                alignItems="center"
                alignSelf={"center"}
              >
                {imageIndex === 0 ? (
                  <Ionicons name="add" size={48} color="black" />
                ) : (
                  <ZStack
                    w="100%"
                    h="100%"
                    justifyContent={"center"}
                    alignItems="center"
                  >
                    <Image
                      source={{ uri: images[imageIndex] }}
                      w="100%"
                      h="100%"
                      alt="img"
                    />
                    <Box w="100%" h="100%" bgColor={"white"} opacity={0.5} />
                    <AntDesign name="delete" size={48} color="black" />
                  </ZStack>
                )}
              </HStack>
            </TouchableOpacity>
            <Box w="5%">
              <TouchableOpacity
                onPress={() => {
                  if (imageIndex < images.length - 1) {
                    setImageIndex(imageIndex + 1);
                  }
                }}
              >
                <AntDesign name="right" size={24} color="black" />
              </TouchableOpacity>
            </Box>
          </HStack>

          {/* ------------------ */}
          {/* ----- Forms ----- */}

          <FormControl>
            <Stack>
              <FormControl.Label>Event Name</FormControl.Label>
              <Input
                value={eventName}
                onChangeText={(text) => setEventName(text)}
              />
            </Stack>
          </FormControl>
          <FormControl>
            <Stack>
              <FormControl.Label>Street</FormControl.Label>
              <Input value={street} onChangeText={(text) => setStreet(text)} />
            </Stack>
          </FormControl>
          <FormControl>
            <Stack>
              <FormControl.Label>City</FormControl.Label>
              <Input value={city} onChangeText={(text) => setCity(text)} />
            </Stack>
          </FormControl>
          <FormControl>
            <Stack>
              <FormControl.Label>State</FormControl.Label>
              <Input value={state} onChangeText={(text) => setState(text)} />
            </Stack>
          </FormControl>
          <FormControl>
            <Stack>
              <FormControl.Label>Zip Code</FormControl.Label>
              <Input
                value={`${zipCode}`}
                onChangeText={(text) => setZipCode(text)}
                keyboardType="numeric"
              />
            </Stack>
          </FormControl>

          <FormControl>
            <Stack>
              <FormControl.Label>Date</FormControl.Label>
              <Text>{`${dateTime.year()}-${addZeroBefore(
                dateTime.month() + 1
              )}-${addZeroBefore(dateTime.date())}`}</Text>
              <ActionButton
                text="Pick Date"
                onPress={() => {
                  setOpenDatePicker(true);
                }}
              />
              {openDatePicker ? (
                <RNDateTimePicker
                  mode="date"
                  value={dateTime.toDate()}
                  onChange={(event, currDate) => {
                    const test = currDate;
                    setOpenDatePicker(false);
                    setDateTime(moment(test));
                  }}
                />
              ) : null}
            </Stack>
          </FormControl>
          <FormControl>
            <Stack>
              <FormControl.Label>Time</FormControl.Label>
              <Text>{`${addZeroBefore(dateTime.hours())}:${addZeroBefore(
                dateTime.minutes()
              )}:00`}</Text>
              <ActionButton
                text="Pick Time"
                onPress={() => {
                  setOpenTimePicker(true);
                }}
              />
              {openTimePicker ? (
                <RNDateTimePicker
                  mode="time"
                  display="clock"
                  value={dateTime.toDate()}
                  onChange={(event, currDate) => {
                    const test = currDate;
                    setOpenTimePicker(false);
                    setDateTime(moment(test));
                  }}
                />
              ) : null}
            </Stack>
          </FormControl>
          <FormControl>
            <Stack>
              <FormControl.Label>Quantity</FormControl.Label>
              <Input
                value={`${quantity}`}
                onChangeText={(text) => setQuantity(text)}
                keyboardType="numeric"
              />
            </Stack>
          </FormControl>
          <FormControl>
            <Stack>
              <FormControl.Label>Price</FormControl.Label>
              <Input
                value={`${price}`}
                onChangeText={(text) => setPrice(text)}
                keyboardType="numeric"
              />
            </Stack>
          </FormControl>
          <FormControl>
            <FormControl.Label>Description</FormControl.Label>
            <Stack>
              <TextArea
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                }}
                w="100%"
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

const mapStateToProps = ({ event, profile }) => ({
  event,
  profile,
});

const mapDispatchToProps = { createNewEvent, modifyEvent };

export default connect(mapStateToProps, mapDispatchToProps)(SellTicketScreen);
