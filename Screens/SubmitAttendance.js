import React, { useState, useContext, useRef } from "react";
import { StyleSheet, Button, TouchableOpacity, Text, Image, View, TextInput } from "react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import globalStyles from "../styles/Styles";
import { auth, db } from "../utils/firebase";
import BasicExample from "./adminUser/CodeInput";
import * as firebase from "firebase";
import { dateObjectToUnixEpoch } from '../utils/time'
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
export function SubmitAttendancePage() {
    const [value, setValue] = useState('');
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
            <AccountTop name={'Submit Attendance'} />
            <View style={{ width: '80%' }}>
                <BasicExample value={value} setValue={setValue} />
            </View>

            <TouchableOpacity
                onPress={() => {
                    const docRef = db.collection("chapter-meetings").doc(value);
                    docRef.get().then((doc) => {
                        if (doc.exists) {
                            if (dateObjectToUnixEpoch(new Date()) < doc.data().expirationTime) {
                                docRef.update({
                                    attendees: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid)
                                })
                                console.log("Got credit");
                            }
                            else {
                                console.log("Meeting code expired");
                            }
                            setValue('')
                        }
                        else {
                            console.log("Not a valid meeting id");
                            setValue('')
                        }
                    })
                }}

                style={[globalStyles.universityColorFill, globalStyles.button, { marginTop: 30 }]}
            >
                <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>Submit!</Text>
            </TouchableOpacity>
        </View >
    )
}