
import React, { useState, useContext, useRef } from "react";
import { StyleSheet, Button, TouchableOpacity, Text, Image, View, TextInput } from "react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import globalStyles from "../../styles/Styles";
import { db } from "../../utils/firebase";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { dateObjectToUnixEpoch, unixEpochTimeToMonthDay, unixEpochTimeToClock } from '../../utils/time'
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
            backgroundColor: '#FFFFFF'

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

function Type(props) {
    const [type, setType] = useState('social');
    return (
        <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-evenly', backgroundColor: '#FFFFFF' }}>
            <TouchableOpacity
                style={{ borderBottomWidth: (type === 'social') ? 3 : 0, borderColor: '#BEE0BE' }}
                onPress={() => {
                    setType('social');
                    props.newEvent.current.type = 'Social';
                }}
            >
                <Image
                    source={require('../../images/social.png')}
                    resizeMode="contain"
                    style={{
                        width: 50,
                        height: 50,
                    }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={{ borderBottomWidth: (type === 'philanthropy') ? 3 : 0, borderColor: '#BEE0BE' }}
                onPress={() => {
                    setType('philanthropy');
                    props.newEvent.current.type = 'Philanthropy';
                }}
            >
                <Image
                    source={require('../../images/philanthropy.png')}
                    resizeMode="contain"
                    style={{
                        width: 50,
                        height: 50,
                    }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={{ borderBottomWidth: (type === 'professional') ? 3 : 0, borderColor: '#BEE0BE' }}
                onPress={() => {
                    setType('professional');
                    props.newEvent.current.type = 'Professional';
                }}
            >
                <Image
                    source={require('../../images/professional.png')}
                    resizeMode="contain"
                    style={{
                        width: 50,
                        height: 50,
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}

export function AddEventPage() {
    const navigation = useNavigation();
    const [meetingTime, setMeetingTime] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const newEvent = useRef(
        {
            label: '',
            location: '',
            time: 0,
            type: '',
            weight: 1,
            value: Math.floor(Math.random() * 1000000000)
        }
    );
    const eventDocName = (event) => {
        return event.label.replace(/\s/g, "").toLowerCase() + event.time;
    }
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        newEvent.current.time = dateObjectToUnixEpoch(date);
        setMeetingTime(date);
        hideDatePicker();
    };
    return (
        <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
            <AccountTop name={'New Event'} />
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 20, width: '80%', marginTop: 30 }}>Name:</Text>
                <TextInput
                    style={[{ width: "80%" }, globalStyles.cardContainer, globalStyles.smallSemiBoldText,]}
                    onChangeText={(text) => {
                        newEvent.current.label = text;
                    }}
                    defaultValue={''}
                />
                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 20, width: '80%', marginTop: 30 }}>Location:</Text>
                <TextInput
                    style={[{ width: "80%" }, globalStyles.cardContainer, globalStyles.smallSemiBoldText,]}
                    onChangeText={(text) => {
                        newEvent.current.location = text;
                    }}
                    defaultValue={''}
                />
                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 20, width: '80%', marginTop: 30 }}>Type:</Text>
                <Type newEvent={newEvent} />
                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 20, width: '80%', marginTop: 30 }}>Time:</Text>
                <TouchableOpacity
                    onPress={showDatePicker}
                    style={[{ width: "80%" }, globalStyles.cardContainer]}
                >
                    <Text style={globalStyles.smallSemiBoldText}>{(newEvent.current.time == 0) ? 0 : unixEpochTimeToMonthDay(newEvent.current.time) + " " + unixEpochTimeToClock(newEvent.current.time)}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        newEvent.current.time = 0;
                        setMeetingTime(new Date());
                    }}
                >
                    <Text>None</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    date={meetingTime}
                />
                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 20, width: '80%', marginTop: 30 }}>Points:</Text>
                <TextInput
                    style={[{ width: "80%" }, globalStyles.cardContainer, globalStyles.smallSemiBoldText,]}
                    onChangeText={(text) => {
                        newEvent.current.weight = parseInt(text);
                    }}
                    defaultValue={''}
                />
                <TouchableOpacity
                    onPress={() => {
                        db.collection("events")
                            .doc(eventDocName(newEvent.current))
                            .set(newEvent.current)
                            .then(() => {
                                console.log("(addevent.js) event successfully written!");
                                navigation.goBack();
                            })
                            .catch((error) => {
                                console.error("(addevent.js) error writing document: ", error);
                            });
                    }}
                    style={[globalStyles.universityColorFill, globalStyles.button, { marginTop: 30 }]}
                >
                    <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>Create!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}