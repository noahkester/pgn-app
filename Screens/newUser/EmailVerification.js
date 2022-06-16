import { StyleSheet, Button, TouchableOpacity, Text, Image, View, } from "react-native";
import { NewUserTextInput } from "../Login";
import globalStyles from "../../Styles"
import React, { useState, useEffect } from "react";
import { auth, db, sendEmail } from "../../Firebase"
import { NavigationPage } from "../Tabs";
import { useNavigation } from '@react-navigation/native';
// TODO, add protection for spamming button (time interval)
// ADD check element that confirms email was sent
export function EmailVerificationPage() {
    const user = auth.currentUser;
    if (user && user.emailVerified) {
        return (
            <NavigationPage />
        )
    }
    return (
        <LoadingPage />
    )
}
export function EmailContinueButton(props) {
    const navigation = useNavigation();
    return (
        // For safety might want to add a limit on this
        <TouchableOpacity
            title={"Send Email"}
            style={[globalStyles.universityColorFill, globalStyles.button, styles.submitButton]}
            onPress={() => {
                const user = auth.currentUser;
                if (user) {
                    sendEmail(user);
                }
                else {
                    console.log("(EmailVerification) Cannot send to email: no user logged in");
                }
            }}
        >
            <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>{"Send Email"}</Text>
        </TouchableOpacity>
    );
}

function LoginInText() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("Start", { screen: "LoginSignup" });
            }}
        >
            <Text style={globalStyles.miniSemiBoldText}>Verified? Log in!</Text>
        </TouchableOpacity>
    )
}
export function LoadingPage() {

    return (
        <View style={styles.screen}>
            <Text style={globalStyles.largeSemiBoldText}>Email Verification</Text>
            <Text style={globalStyles.miniSemiBoldText}>Check your spam folder</Text>
            <Image
                source={require("../../images/paper-plane.png")}
                style={styles.planeImage}
                resizeMode="contain"
            />
            <View style={{ height: 10 }}></View>
            <EmailContinueButton title="" address="Navigation" />
            <LoginInText />
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
    },
    planeImage: {
        marginTop: 50,
        marginBottom: 50,
        width: 150,
        height: 150
    },
    submitButton: {
        marginBottom: 10
    },
});