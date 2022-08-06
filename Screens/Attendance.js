import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../styles/Styles";
import { db, auth } from "../utils/firebase";
import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  unixEpochTimeToClock,
  unixEpochTimeToMonthDay,
  dateObjectToUnixEpoch,
  addHours,
} from "../utils/time";
import { TextInput } from "react-native-gesture-handler";

function AttendanceCard(props) {
  const [isPressed, setPressed] = useState(false);
  const [isEmailSent, setEmailSent] = useState(false);
  const excuseMessage = useRef("");
  //   Keyboard.addListener("keyboardWillHide", () => {
  //     setPressed(false);
  //   });

  return (
    <View
      style={{
        width: "90%",
        height: props.found ? 60 : isPressed ? 140 : 110,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#DBDBDB",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ marginLeft: 16 }}>
        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: 16,
            color: "#262626",
          }}
        >
          {"Wednesday " +
            unixEpochTimeToMonthDay(props.time) +
            ", " +
            unixEpochTimeToClock(props.time) +
            " PM"}
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: 12,
            color: "#8E8E8E",
          }}
        >
          {"213 University Dr. LittleField Fountain"}
        </Text>
        {props.found ? null : (
          <View style={{ flex: 1 }}>
            {isPressed ? (
              !isEmailSent ? (
                <View
                  style={{
                    flexDirection: "row",
                    top: "10%",
                    justifyContent: "space-evenly",
                  }}
                >
                  <TextInput
                    returnKeyType="send"
                    blurOnSubmit={true}
                    onSubmitEditing={() => {
                      if (excuseMessage.current !== "") {
                        console.log(
                          "Message is: " + excuseMessage.current + "d"
                        );
                        setEmailSent(true);
                      } else {
                          <Text
                            style={{
                              flexDirection: "column",
                              width: "90%",
                                paddingTop: 4,
                                maxHeight: '100%',
                              paddingLeft: 10,
                              fontFamily: "Poppins_500Medium",
                              color: "black",
                            }}
                          >
                            This field cannot be left blank!
                          </Text>
                      }
                    }}
                    multiline={true}
                    autoFocus={true}
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderWidth: 1,
                      borderColor: "#DBDBDB",
                      borderRadius: 10,
                      width: "70%",
                      maxHeight: 50,
                      maxWidth: "70%",
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: 16,
                      color: "black",
                    }}
                    onChangeText={(text) => {
                      excuseMessage.current = text;
                    }}
                  ></TextInput>
                  <TouchableOpacity
                    onPress={() => {
                      if (excuseMessage.current !== "") {
                        console.log(
                          "Message is: " + excuseMessage.current + "d"
                        );
                        setEmailSent(true);
                      } else {
                        console.log("here");
                        <Text
                          style={{
                            flexDirection: "column",
                            width: "90%",
                            paddingTop: 4,
                            paddingLeft: 10,
                            fontFamily: "Poppins_500Medium",
                            color: "#85C67E",
                          }}
                        >
                          This field cannot be left blank!
                        </Text>;
                      }
                    }}
                  >
                    <FontAwesome
                      name={"paper-plane"}
                      size={40}
                      color={"#9C9C9C"}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <Text
                  style={{
                    width: "90%",
                    paddingTop: 4,
                    paddingLeft: 10,
                    fontFamily: "Poppins_500Medium",
                    color: "#85C67E",
                  }}
                >
                  Attendance Excuse Sent!
                </Text>
              )
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setPressed((isPressed) => !isPressed);
                }}
                style={{
                  marginTop: 10,
                  width: 200,
                  borderWidth: 1,
                  borderColor: "#DBDBDB",
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  backgroundColor: "#FAFAFA",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 12,
                    color: "#808080",
                  }}
                >
                  Submit Excuse
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      <View
        style={{
          width: 60,
          height: "100%",
          backgroundColor: props.found ? "#85C67E" : "#E35B56",
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
      ></View>
    </View>
  );
}
export function AttendancePage() {
  const [meetings, setMeetings] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    db.collection("chapter-meetings")
      .get()
      .then((querySnapshot) => {
        var tempMeetings = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          var found = false;
          for (let i = 0; i < data.attendees.length; i++) {
            if (data.attendees[i] == auth.currentUser.uid) {
              found = true;
              break;
            }
          }

          tempMeetings.push(
            <AttendanceCard found={found} time={data.meetingTime} />
          );
        });
        setMeetings(tempMeetings);
      });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
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
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Poppins_600SemiBold",
              fontSize: 20,
              color: "#262626",
            }}
          >
            {"Attendance"}
          </Text>
          <TouchableOpacity
            style={{
              width: 68,
              height: 68,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 34,
              marginRight: 16,
            }}
            onPress={() => {
              navigation.navigate("AddEvent");
            }}
          ></TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>{meetings}</View>
      </View>
    </TouchableWithoutFeedback>
  );
}
