import { StyleSheet, Button, TouchableOpacity, Text, Image, View, } from "react-native";
import { SubmitPoints } from "../Home";
import { NewUserTextInput } from "./NewUser";
import globalStyles from "../../styles/Styles"
import { newUser } from "./About";
import { setField } from "./About";
import { getCurrentUser, db, auth } from "../../utils/firebase";
import React from "react";
import { NextButton } from "./NewUser";
import { useState, useContext } from "react";
import NewUserContext from "../../utils/NewUserContext";
import { useNavigation } from "@react-navigation/native";

export function ContactPage() {
    const [linkedin, setLinkedin] = useState("");
    const [phone, setPhone] = useState("");
    const navigation = useNavigation();
    const newUserContext = useContext(NewUserContext);

    const updateContact = () => {
        newUserContext.linkedin = linkedin;
        newUserContext.phone = phone;
        console.log(newUser);
        db.collection("users")
            .doc(auth.currentUser.uid)
            .set(newUserContext)
            .then(() => {
                console.log("(NewUser) User Information successfully written!");
                navigation.navigate("EmailVerification");
            })
            .catch((error) => {
                console.error("(NewUser) Error writing document: ", error);
            });
    }
    return (
        <View style={styles.screen}>
            <View></View>
            <View style={{ width: "100%", alignItems: "center" }}>
                <Text style={globalStyles.largeSemiBoldText}>Contact</Text>
                <NewUserTextInput
                    placeholder="LinkedIn URL" onCustomChange={text => setLinkedin(text)}
                />
                <NewUserTextInput
                    placeholder="Phone: 123-456-7890" onCustomChange={text => setPhone(text)}
                />
            </View>
            <NextButton onPress={updateContact} title="Complete!" />
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white"
    }
});