
import React, { useState, useContext, useRef } from "react";
import { StyleSheet, Button, TouchableOpacity, Text, Image, View, TextInput } from "react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import globalStyles from "../../styles/Styles";
import { db } from "../../utils/firebase";

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
    const newEvent = useRef(
        {
            label: '',
            location: '',
            time: 0,
            type: '',
            weight: 1
        }
    );
    const eventDocName = (event) => {
        return event.label.replace(/\s/g, "").toLowerCase() + event.time;
    }
    return (
        <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
            <AccountTop name={'New Event'} />
            <View style={{alignItems: 'center'}}>
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
                <TextInput
                    style={[{ width: "80%" }, globalStyles.cardContainer, globalStyles.smallSemiBoldText,]}
                    onChangeText={(text) => {
                        newEvent.current.time = parseInt(text);
                    }}
                    defaultValue={''}
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
                    style={[globalStyles.universityColorFill, globalStyles.button, {marginTop: 30}]}
                >
                    <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>Create!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}