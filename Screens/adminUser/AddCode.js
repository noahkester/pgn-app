import React, { useState, useContext, useRef } from "react";
import { StyleSheet, Button, TouchableOpacity, Text, Image, View, TextInput } from "react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import globalStyles from "../../styles/Styles";
import { db } from "../../utils/firebase";
import BasicExample from "./CodeInput";
import { useEffect } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { unixEpochTimeToClock, unixEpochTimeToMonthDay, dateObjectToUnixEpoch, addHours } from '../../utils/time'

function AccountTop(props) {
    const navigation = useNavigation();
    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingLeft: 10,
            paddingRight: 10,
            height: 160,
            paddingTop: 70,
            backgroundColor: '#FFFFFF',
            position: 'absolute',
            top: 0
        }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    source={require("../../images/back.png")}
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
    useEffect(() => {
        expirationTime.setTime(meetingTime.getTime() + 3 * 60 * 60 * 1000);
    }, [meetingTime])
    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
            <AccountTop name={'New Meeting'} />
            <View style={{ width: '80%' }}>
                <BasicExample value={value} setValue={setValue} />
                <TouchableOpacity
                    style={{ marginTop: 10 }}
                    onPress={() => {
                        setValue(makeid(6));
                    }}
                >
                    <Text>Auto generate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={showDatePicker}
                >
                    <Text
                        style={{ marginTop: 60, fontFamily: 'Poppins_600SemiBold', fontSize: 20 }}
                    >
                        {'Meeting Time: ' + unixEpochTimeToMonthDay(dateObjectToUnixEpoch(meetingTime)) + " " + unixEpochTimeToClock(dateObjectToUnixEpoch(meetingTime))}
                    </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    date={meetingTime}
                />
            </View>
            <TouchableOpacity
                onPress={() => {
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
                }}
                style={[globalStyles.universityColorFill, globalStyles.button, { marginTop: 30 }]}
            >
                <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>Create!</Text>
            </TouchableOpacity>
        </View>
    )
}