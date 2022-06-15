import { StyleSheet, Button, TouchableOpacity, Text, Image, View, } from "react-native";
import { SubmitPoints } from "../Home";
import { NewUserTextInput } from "../Login";
import globalStyles from "../../Styles"
import { newUser } from "./About";
import { setField } from "./About";
import firebase from "firebase";
import React from "react";
export function ContactPage() {
    async function upload2Firebase(){
        await firebase.firestore()
        .collection("users")
        .doc(newUser.id)
        .set(newUser)
        .then(() => {
            console.log('User added!');
          });
    }
    return (
        <View style={styles.screen}>
            <Text style={globalStyles.largeSemiBoldText}>Contact</Text>
            <NewUserTextInput
                placeholder="LinkedIn URL" onCustomChange = {text => setField({key: 'linkedin', value: text})}
            />
            <NewUserTextInput
                placeholder="Phone: 123-456-7890" onCustomChange = {text => setField({key: 'phone', value: text})}
            />
            <NewUserTextInput
                placeholder="Apt/Dorm" onCustomChange = {text => setField({key: 'apartment', value: text})}
            />
            <View style={{ height: 10 }}></View>
            <SubmitPoints address="EmailVerification" title="Complete!" function2 = {upload2Firebase} />
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
});