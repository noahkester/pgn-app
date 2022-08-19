import React, { useState, useContext, useRef } from "react";
import {
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Image,
  View,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  Appearance
} from "react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import globalStyles from "../../styles/Styles";
import { db } from "../../utils/firebase";
import BasicExample from "./CodeInput";
import { useEffect } from "react";
import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  unixEpochTimeToClock,
  unixEpochTimeToMonthDay,
  dateObjectToUnixEpoch,
  addHours,
} from "../../utils/time";
import * as firebase from "firebase";

export function AddCodePage() {
  const colorScheme = Appearance.getColorScheme();
  const [value, setValue] = useState("");
  const [meetingTime, setMeetingTime] = useState(new Date());
  const [expirationTime, setExpirationTime] = useState(new Date());
  const [location, setLocation] = useState("");
  //const [open, setOpen] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const navigation = useNavigation();
  const makeid = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  useEffect(() => {
    console.log(meetingTime);
  }, [meetingTime]);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setMeetingTime(date);
    hideDatePicker();
  };
  const createMeeting = () => {
    db.collection("chapter-meetings")
      .doc(value)
      .set({
        attendees: [],
        meetingTime: dateObjectToUnixEpoch(meetingTime),
        expirationTime: dateObjectToUnixEpoch(expirationTime),
        location: location,
        code: value
      })
      .then(() => {
        db.collection("admin-settings")
          .doc('points')
          .update({ totalChapterMeetings: firebase.firestore.FieldValue.increment(1) })
          .then(() => {
            console.log('incremented by one');
          })
        navigation.goBack();
      })
      .catch((error) => {
        console.error("(addcode.js) error writing chapter meeting ", error);
        navigation.goBack();
      });
  };
  useEffect(() => {
    expirationTime.setTime(meetingTime.getTime() + 3 * 60 * 60 * 1000);
  }, [meetingTime]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{ flex: 1, backgroundColor: "#FFFFFF", alignItems: "center" }}
      >
        <View
          style={{
            marginTop: 32,
            height: 100,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{ width: 68, alignItems: "center" }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Octicons name="chevron-left" color={"#262626"} size={42} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            marginTop: 120,
            fontFamily: "Poppins_600SemiBold",
            fontSize: 20,
            color: "#262626",
            marginBottom: 20,
          }}
        >
          Create Meeting
        </Text>
        <View style={{ width: "80%" }}>
          <BasicExample value={value} setValue={setValue} />
          <TouchableOpacity
            style={{
              marginTop: 10,
              borderWidth: 1,
              borderColor: "#DBDBDB",
              borderRadius: 6,
              width: 50,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              setValue(makeid(6));
            }}
          >
            <FontAwesome name="random" color={"#262626"} size={24} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 20,
            borderColor: "#DBDBDB",
            width: "90%",
            height: 50,
            paddingLeft: 20,
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
          }}
        >
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={{
              fontFamily: "Poppins_600SemiBold",
              fontSize: 16,
              color: "#262626",
            }}
            placeholder={"Location"}
            onChangeText={(text) => setLocation(text)}
          >
            {""}
          </TextInput>
        </View>
        <TouchableOpacity
          style={{
            marginTop: 10,
            width: "90%",
            borderWidth: 1,
            borderColor: "#DBDBDB",
            borderRadius: 10,
            height: 50,
            justifyContent: "center",
            paddingLeft: 20,
          }}
          onPress={showDatePicker}
        >
          <Text
            style={{
              fontFamily: "Poppins_600SemiBold",
              fontSize: 16,
              color: "#8E8E8E",
            }}
          >
            {unixEpochTimeToMonthDay(dateObjectToUnixEpoch(meetingTime)) +
              " " +
              unixEpochTimeToClock(dateObjectToUnixEpoch(meetingTime))}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={meetingTime}
          isDarkModeEnabled={(colorScheme === 'dark')}
        />

        <TouchableOpacity
          onPress={() => {
            createMeeting();
          }}
          style={[
            globalStyles.universityColorFill,
            {
              borderRadius: 10,
              width: "90%",
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              position: "absolute",
              borderColor: "#E9C9B2",
              bottom: 60,
            },
          ]}
        >
          <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>
            Create!
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
