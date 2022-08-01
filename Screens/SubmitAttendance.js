import React, { useState, useContext, useRef } from "react";
import { StyleSheet, Button, TouchableOpacity, Text, Image, View, TextInput } from "react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import globalStyles from "../styles/Styles";
import { auth, db } from "../utils/firebase";
import BasicExample from "./adminUser/CodeInput";
import Octicons from 'react-native-vector-icons/Octicons';
import * as firebase from "firebase";
import { dateObjectToUnixEpoch } from '../utils/time'
import IonIcons from 'react-native-vector-icons/Ionicons';

export function SubmitAttendancePage() {
    const [value, setValue] = useState('');
    const navigation = useNavigation();

    const submitAttendanceCode = () => {
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
    }
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
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ marginTop: '50%', fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#262626' }}>Attendance Code</Text>
                <View style={{ width: '80%' }}>
                    <BasicExample value={value} setValue={setValue} />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        submitAttendanceCode()
                    }}
                    style={[globalStyles.universityColorFill, globalStyles.button, { position: 'absolute', bottom: 60, borderWidth: 6, borderRadius: 60, borderColor: '#E9C9B2' }]}
                >
                    <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>Submit!</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}