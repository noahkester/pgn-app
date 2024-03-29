import { useState, useEffect, useRef, useContext } from "react";
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
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../styles/Styles";
import { db, auth } from "../utils/firebase";
import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import LoginContext from "../utils/LoginContext";
import IonIcons from "react-native-vector-icons/Ionicons";
import {
  unixEpochTimeToClock,
  unixEpochTimeToMonthDay,
  dateObjectToUnixEpoch,
  addHours,
} from "../utils/time";
import { TextInput } from "react-native-gesture-handler";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function AttendanceCard(props) {
  const [isPressed, setPressed] = useState(props.pending);
  const [isExcuseSent, setExcuseSent] = useState(props.pending);
  const excuseMessage = useRef("");

  const loginContext = useContext(LoginContext);
  const currentUser = loginContext.currentUser;

  function submitExcuse() {
    if (excuseMessage.current !== "") {
      const label = unixEpochTimeToMonthDay(props.data.meetingTime) + ' Attendance';
      db.collection('points')
        .doc(auth.currentUser.uid + '_' + label)
        .set({
          id: auth.currentUser.uid,
          label: label,
          name: currentUser.firstname + ' ' + currentUser.lastname,
          location: props.data.location,
          proof: excuseMessage.current,
          status: 'waiting',
          type: 'Excuse',
          weight: 0,
          code: props.data.code,
          title: auth.currentUser.uid + "_" + label
        }).then(() => {
          setExcuseSent(true);
        })
      db.collection('chapter-meetings')
        .doc(props.data.code)
        .update({
          submittedExcuse: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid)
        });



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
  }

  return (
    <View
      style={{
        width: "90%",
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#DBDBDB",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{
        width: '74%',
        paddingLeft: 16,
        paddingTop: 20,
        paddingBottom: 30,
      }}>
        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: 16,
            color: "#262626",
          }}
        >
          {"Wednesday " +
            unixEpochTimeToMonthDay(props.data.meetingTime) +
            ", " +
            unixEpochTimeToClock(props.data.meetingTime) +
            " PM"}
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: 12,
            color: "#8E8E8E",
          }}
        >
          {props.data.location}
        </Text>
        {props.found || props.future ? null : (
          <View style={{ width: '100%' }}>
            {isPressed ? (
              !isExcuseSent ? (
                <View
                  style={{
                    flexDirection: "row",
                    top: 20,
                    justifyContent: "space-between",
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <TextInput
                    returnKeyType="send"
                    blurOnSubmit={true}
                    onSubmitEditing={submitExcuse}
                    multiline={true}
                    autoFocus={true}
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderWidth: 1,
                      borderColor: "#DBDBDB",
                      borderRadius: 10,
                      width: "80%",
                      maxHeight: 100,
                      padding: 10,
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: 16,
                      color: "black",
                    }}
                    onChangeText={(text) => {
                      excuseMessage.current = text;
                    }}
                  ></TextInput>
                  <TouchableOpacity
                    onPress={submitExcuse}
                  >
                    <FontAwesome
                      name={"paper-plane"}
                      size={24}
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
          width: '16%',
          height: '100%',
          backgroundColor: props.found ? "#85C67E" : props.future ? '#EEEEEF' : '#E35B56',
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
  const loginContext = useContext(LoginContext);
  const color = loginContext.color;
  useEffect(() => {
    db.collection("chapter-meetings")
      .onSnapshot((querySnapshot) => {
        var tempMeetings = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          var found = false;
          var pending = false;

          for (let i = 0; i < data.attendees.length; i++) {
            if (data.attendees[i] == auth.currentUser.uid) {
              found = true;
              break;
            }
          }
          for (let i = 0; i < data.submittedExcuse.length; i++) {
            if (data.submittedExcuse[i] == auth.currentUser.uid) {
              pending = true;
              break;
            }
          }
          tempMeetings.push({
            found: found,
            data: data,
            pending: pending,
            meetingTime: data.meetingTime
          })
          // tempMeetings.push(
          //   <AttendanceCard found={found} data={data} />
          // );
        });
        tempMeetings.sort((a, b) => a.data.meetingTime - b.data.meetingTime);
        var i = 0;
        const meetingElems = tempMeetings.map((d) => {
          return <AttendanceCard key={i++} found={d.found} data={d.data} pending={d.pending} future={d.meetingTime > dateObjectToUnixEpoch(new Date())} />
        }
        )
        setMeetings(meetingElems);
      });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <ScrollView >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ marginTop: 16, alignItems: "center" }}>{meetings}</View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 12, right: 24, borderRadius: 30, backgroundColor: '#FFFFFF' }}>
        <TouchableOpacity
          style={[{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 34, backgroundColor: color + '40' }]}
          onPress={() => {
            navigation.navigate("SubmitAttendance");
          }}
        >
          <IonIcons
            name="md-barcode"
            color={color}
            size={40}
            style={{ marginLeft: 3 }}
          />
        </TouchableOpacity>
      </View>

    </View>

  );
}
