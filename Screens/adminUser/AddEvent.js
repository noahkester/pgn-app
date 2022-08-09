
import React, { useState, useContext, useRef } from "react";
import { StyleSheet, Button, TouchableOpacity, Text, Image, View, TextInput } from "react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import globalStyles from "../../styles/Styles";
import { db } from "../../utils/firebase";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { dateObjectToUnixEpoch, unixEpochTimeToMonthDay, unixEpochTimeToClock } from '../../utils/time'

function AccountTop() {
    const navigation = useNavigation();
    return (
        <View style={{ marginTop: 32, height: 100, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity
                style={{ marginLeft: 16, width: 68 }}
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
    );
}

function Type(props) {
    const [type, setType] = useState('social');
    return (
        <View style={{ borderWidth: 1, borderColor: '#DBDBDB', borderRadius: 10, padding: 10, flexDirection: 'row', width: '90%', justifyContent: 'space-evenly', backgroundColor: '#FFFFFF' }}>
            <TouchableOpacity
                style={{ paddingBottom: 6, borderBottomWidth: (type === 'social') ? 3 : 0, borderColor: '#BEE0BE' }}
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
                style={{ paddingBottom: 6, borderBottomWidth: (type === 'philanthropy') ? 3 : 0, borderColor: '#BEE0BE' }}
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
                style={{ paddingBottom: 6, borderBottomWidth: (type === 'professional') ? 3 : 0, borderColor: '#BEE0BE' }}
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
            <TouchableOpacity
                style={{ paddingBottom: 6, borderBottomWidth: (type === 'interview') ? 3 : 0, borderColor: '#BEE0BE' }}
                onPress={() => {
                    setType('interview');
                    props.newEvent.current.type = 'Interview';
                }}
            >
                <Image
                    source={require('../../images/interview.png')}
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
            type: 'Social',
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
        <View style={{ backgroundColor: '#FAFAFA', flex: 1, alignItems: 'center' }}>
            <AccountTop />
            <Text style={{ marginTop: 60, fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#262626', marginBottom: 20 }}>Create Event</Text>
            <View style={{ borderWidth: 1, borderRadius: 10, borderColor: '#DBDBDB', width: '90%', height: 50, paddingLeft: 20, justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626' }}
                    placeholder={'Title'}
                    onChangeText={(text) => { newEvent.current.label = text; }}
                >
                    {''}
                </TextInput>
            </View>
            <View style={{ marginTop: 10, borderWidth: 1, borderRadius: 10, borderColor: '#DBDBDB', width: '90%', height: 50, paddingLeft: 20, justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626' }}
                    placeholder={'Location'}
                    onChangeText={(text) => { newEvent.current.location = text; }}
                >
                    {''}
                </TextInput>
            </View>
            <TouchableOpacity
                style={{ marginTop: 10, borderWidth: 1, borderRadius: 10, borderColor: '#DBDBDB', width: '90%', height: 50, paddingLeft: 20, justifyContent: 'center', backgroundColor: '#FFFFFF' }}
                onPress={showDatePicker}
            >
                <Text
                    style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626' }}
                    onChangeText={(text) => { newEvent.current.label = text; }}
                >
                    {(newEvent.current.time == 0) ? 'Time: none' : unixEpochTimeToMonthDay(newEvent.current.time) + " " + unixEpochTimeToClock(newEvent.current.time)}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    newEvent.current.time = 0;
                    setMeetingTime(new Date());
                }}
            >
                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12, color: '#8E8E8E' }}>Reset time</Text>
            </TouchableOpacity>
            <Type newEvent={newEvent} />

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={meetingTime}
            />
            <View style={{ marginTop: 10, borderWidth: 1, borderRadius: 10, borderColor: '#DBDBDB', width: '90%', height: 50, paddingLeft: 20, justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626' }}
                    placeholder={'Points'}
                    onChangeText={(text) => { newEvent.current.weight = parseFloat(text); }}
                >
                    {''}
                </TextInput>
            </View>
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
                style={[globalStyles.universityColorFill, {
                    borderRadius: 10,
                    width: "90%",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: 15,
                    paddingBottom: 15,
                    position: 'absolute',
                    borderColor: '#E9C9B2',
                    bottom: 60
                }]}
            >
                <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>Create!</Text>
            </TouchableOpacity>
        </View>
    )
}