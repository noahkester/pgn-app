import { useState, useEffect } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    View,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../styles/Styles";
import { db, auth } from "../utils/firebase";
import { unixEpochTimeToClock, unixEpochTimeToMonthDay, dateObjectToUnixEpoch, addHours } from '../utils/time'

function AccountTop(props) {
    const navigation = useNavigation();
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                paddingLeft: 10,
                paddingRight: 10,
                height: 160,
                paddingTop: 70,
                backgroundColor: '#FFFFFF',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    source={require("../images/back.png")}
                    style={{
                        width: 60,
                        height: 60,
                    }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <Text style={globalStyles.largeBoldText}>{props.name}</Text>
            <View style={{ width: 60 }} />
        </View>
    );
}
export function AttendancePage() {
    const [meetings, setMeetings] = useState([]);
    useEffect(() => {
        db.collection("chapter-meetings")
            .get()
            .then((querySnapshot) => {
                var tempMeetings = []
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    var found = false;
                    for (let i = 0; i < data.attendees.length; i++) {
                        if (data.attendees[i] == auth.currentUser.uid) {
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        tempMeetings.push(
                            <Text>{'Chapter Meeting: ' + unixEpochTimeToMonthDay(data.meetingTime) + ' attended'}</Text>
                        )
                    }
                    else {
                        tempMeetings.push(
                            <Text>{'Chapter Meeting: ' + unixEpochTimeToMonthDay(data.meetingTime) + ' NOT attended'}</Text>
                        )
                    }
                })
                setMeetings(tempMeetings);
            })
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <AccountTop name={'Attendance'} />
            <View>
                {meetings}
            </View>
        </View>
    )
}