import { StyleSheet, Button, TouchableOpacity, Text, Image, View, } from "react-native";
import { SubmitPoints } from "../Home";
import { NewUserTextInput } from "./NewUser";
import globalStyles from "../../Styles"
import { newUser } from "./About";
import { setField } from "./About";
import firebase from "firebase";
import React from "react";
import { NextButton } from "./NewUser";
import { useState } from "react";

export function ContactPage() {
    const [linkedin, setLinkedin] = useState("");
    const [phone, setPhone] = useState("");

    return (
        <View style={styles.screen}>
            <View></View>
            <View style={{ width: "100%", alignItems: "center" }}>
                <Text style={globalStyles.largeSemiBoldText}>Contact</Text>
                <NewUserTextInput
                    placeholder="LinkedIn URL (optional)" onCustomChange={text => setLinkedin(text)}
                />
                <NewUserTextInput
                    placeholder="Phone: 123-456-7890" onCustomChange={text => setPhone(text)}
                />
            </View>
            <NextButton address="EmailVerification" title="Complete!" values={[linkedin, phone]} inputPage="contact" />
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