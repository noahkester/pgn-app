import React, { useState, useContext, useRef } from "react";
import { StyleSheet, Button, TouchableOpacity, Text, Image, View, TextInput } from "react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import globalStyles from "../../styles/Styles";
import { db } from "../../utils/firebase";
import BasicExample from "./CodeInput";
import { useEffect } from "react";
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { unixEpochTimeToClock, unixEpochTimeToMonthDay, dateObjectToUnixEpoch, addHours } from '../../utils/time'

export function AddCodePage() {
    const [value, setValue] = useState('');
    const [meetingTime, setMeetingTime] = useState(new Date())
    const [expirationTime, setExpirationTime] = useState(new Date())
    //const [open, setOpen] = useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const navigation = useNavigation();
    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
    useEffect(() => {
        console.log(meetingTime);
    }, [meetingTime])
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
            .set(
                {
                    attendees: [],
                    meetingTime: dateObjectToUnixEpoch(meetingTime),
                    expirationTime: dateObjectToUnixEpoch(expirationTime)
                }
            )
            .then(() => {
                console.log("(addcode.js) chapter meeting successfully written!");
                navigation.goBack();
            })
            .catch((error) => {
                console.error("(addcode.js) error writing chapter meeting ", error);
                navigation.goBack();
            });
    }
    useEffect(() => {
        expirationTime.setTime(meetingTime.getTime() + 3 * 60 * 60 * 1000);
    }, [meetingTime])
    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center' }}>
            <View style={{ marginTop: 32, height: 100, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity
                    style={{ width: 68, alignItems:'center' }}
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
            </View>
            <Text style={{ marginTop: 120, fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#262626', marginBottom: 20 }}>Create Meeting</Text>
            <View style={{ width: '80%' }}>
                <BasicExample value={value} setValue={setValue} />
                <TouchableOpacity
                    style={{ marginTop: 10, borderWidth: 1, borderColor: '#DBDBDB', borderRadius: 6, width: 50, height: 36, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => {
                        setValue(makeid(6));
                    }}
                >
                    <FontAwesome
                        name="random"
                        color={'#262626'}
                        size={24}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={{ marginTop: 10, width: '90%', borderWidth: 1, borderColor: '#DBDBDB', borderRadius: 30, height: 54, justifyContent: 'center', paddingLeft: 20 }}
                onPress={showDatePicker}
            >
                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#8E8E8E' }} >
                    {unixEpochTimeToMonthDay(dateObjectToUnixEpoch(meetingTime)) + " " + unixEpochTimeToClock(dateObjectToUnixEpoch(meetingTime))}
                </Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={meetingTime}
            />

            <TouchableOpacity
                onPress={() => {
                    createMeeting()
                }}
                style={[globalStyles.universityColorFill, {
                    borderRadius: 36,
                    width: "90%",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: 15,
                    paddingBottom: 15,
                    position: 'absolute',
                    borderWidth: 6,
                    borderColor: '#E9C9B2',
                    bottom: 60
                }]}
            >
                <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>Create!</Text>
            </TouchableOpacity>
        </View>
    )
}