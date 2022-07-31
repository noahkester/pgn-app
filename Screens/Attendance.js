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
import Octicons from 'react-native-vector-icons/Octicons';
import { unixEpochTimeToClock, unixEpochTimeToMonthDay, dateObjectToUnixEpoch, addHours } from '../utils/time'

function AttendanceCard(props) {
    return (
        <View style={{ width: '90%', height: 60, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#DBDBDB', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 60, height: 60, backgroundColor: props.found ? '#85C67E' : '#E35B56', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}></View>
            <View style={{ marginLeft: 16 }}>
                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16 }}>{unixEpochTimeToMonthDay(props.time)}</Text>
                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12 }}>{unixEpochTimeToClock(props.time)}</Text>
            </View>
            {
                (props.found) ? null :
                    <TouchableOpacity
                        style={{ marginLeft: 40, width: 160, borderWidth: 1, borderColor: '#DBDBDB', height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 30, backgroundColor: '#FAFAFA' }}
                    >
                        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12 }}>Submit Excuse</Text>
                    </TouchableOpacity>
            }
        </View>
    )
}
export function AttendancePage() {
    const [meetings, setMeetings] = useState([]);

    const navigation = useNavigation();

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

                    tempMeetings.push(
                        <AttendanceCard found={found} time={data.meetingTime} />
                    )

                })
                setMeetings(tempMeetings);
            })
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <View style={{ marginTop: 32, height: 100, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity
                    style={{ width: 68, alignItems: 'center' }}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Octicons
                        name="chevron-left"
                        color={'#262626'}
                        size={42}
                    />
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#262626' }}>{'Attendance'}</Text>
                <TouchableOpacity
                    style={{ width: 68, height: 68, alignItems: 'center', justifyContent: 'center', borderRadius: 34, marginRight: 16 }}
                    onPress={() => {
                        navigation.navigate('AddEvent');
                    }}
                >
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center' }}>
                {meetings}
            </View>
        </View>
    )
}