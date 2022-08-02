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
                }
                else {
                }
                setValue('')
            }
            else {
                setValue('')
            }
        })
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
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
                    style={[globalStyles.universityColorFill, { width: '90%', height: 50, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 60, borderRadius: 10, borderColor: '#E9C9B2' }]}
                >
                    <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>Submit!</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}