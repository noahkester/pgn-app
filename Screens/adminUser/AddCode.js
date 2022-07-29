import React, { useState, useContext, useRef } from "react";
import { StyleSheet, Button, TouchableOpacity, Text, Image, View, TextInput } from "react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import globalStyles from "../../styles/Styles";
import { db } from "../../utils/firebase";
import BasicExample from "./CodeInput";
import { useEffect } from "react";
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
    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
            <AccountTop name={'Attendance'} />
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
                <Text style={{ marginTop: 60, fontFamily: 'Poppins_600SemiBold', fontSize: 20 }}>{'Date:'}</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    db.collection("chapter-meetings")
                        .doc(value)
                        .set(
                            {
                                attendees: [],
                                meetingTime: 'timegoeshere',
                                expirationTime: 'timegoeshere'
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