import React, { useState, useContext, useRef } from "react";
import { StyleSheet, Button, TouchableOpacity, Text, Image, View, TextInput } from "react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import globalStyles from "../styles/Styles";
import { auth, db } from "../utils/firebase";
import BasicExample from "./adminUser/CodeInput";
import Octicons from 'react-native-vector-icons/Octicons';
import * as firebase from "firebase";
import { dateObjectToUnixEpoch } from '../utils/time'
import LoginContext from "../utils/LoginContext";
export function SubmitAttendancePage() {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const loginContext = useContext(LoginContext);
    const navigation = useNavigation();

    const submitAttendanceCode = () => {
        setError('');
        if (value === '') {
            setError('Invalid code');
            return;
        }
        const docRef = db.collection("chapter-meetings").doc(value);
        docRef.get().then((doc) => {
            if (doc.exists) {
                if (doc.data().attendees.includes(auth.currentUser.uid)) {
                    setError('Credit already recieved');
                    return;
                }
                if (dateObjectToUnixEpoch(new Date()) < doc.data().expirationTime) {
                    setError('');
                    docRef.update({
                        attendees: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid)
                    })
                    db.collection("users")
                        .doc(auth.currentUser.uid)
                        .update({
                            attendance:
                                firebase.firestore.FieldValue.increment(1),
                        });
                    navigation.goBack();
                }
                else {
                    setError('Code has expired');
                }

            }
            else {
                setError('Code does not exist');
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
                    {
                        (error) ?
                            <Text style={{ width: '90%', paddingTop: 4, paddingLeft: 10, fontFamily: 'Poppins_500Medium', color: '#E35B56' }}>{error}</Text> : null
                    }
                </View>
                <TouchableOpacity
                    onPress={() => {
                        submitAttendanceCode()
                    }}
                    style={{ width: '90%', height: 50, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 60, borderRadius: 10, borderColor: '#E9C9B2', backgroundColor: loginContext.color }}
                >
                    <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>Submit!</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}