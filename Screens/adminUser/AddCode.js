import React, { useState, useContext, useRef } from "react";
import { StyleSheet, Button, TouchableOpacity, Text, Image, View, TextInput } from "react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import globalStyles from "../../styles/Styles";
import { db } from "../../utils/firebase";
import BasicExample from "./CodeInput";
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
    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
            <AccountTop name={'Attendance'} />
            <View style={{ width: '80%' }}>
                <BasicExample />
                <Text style={{ marginTop: 60, fontFamily: 'Poppins_600SemiBold', fontSize: 20 }}>{'Date:'}</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    /*db.collection("events")
                        .doc(eventDocName(newEvent.current))
                        .set(newEvent.current)
                        .then(() => {
                            console.log("(addevent.js) event successfully written!");
                            navigation.goBack();
                        })
                        .catch((error) => {
                            console.error("(addevent.js) error writing document: ", error);
                        });*/
                    navigation.goBack();
                }}
                style={[globalStyles.universityColorFill, globalStyles.button, { marginTop: 30 }]}
            >
                <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>Create!</Text>
            </TouchableOpacity>
        </View>
    )
}