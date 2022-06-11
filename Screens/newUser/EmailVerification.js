import { StyleSheet, Button, TouchableOpacity, Text, Image, View, } from "react-native";
import { NewUserTextInput } from "../Login";
import globalStyles from "../../Styles"
import React, { useState, useEffect } from "react";
import { auth, db, sendEmail } from "../../Firebase"
import { NavigationPage } from "../Tabs";
import { useNavigation } from '@react-navigation/native';

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
        <TouchableOpacity
            title={"Continue"}
            style={[globalStyles.universityColorFill, globalStyles.button, styles.submitButton]}
            onPress={() => {
                const user = auth.currentUser;
                if (user && user.emailVerified) {
                    navigation.navigate(props.address)
                }
                else {
                    console.log("(Email Verification) Cannot continue without verifying email")
                }
            }}
        >
            <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>{"Continue"}</Text>
        </TouchableOpacity>
    );
}

function ResendEmail() {
    return (
        <TouchableOpacity
            onPress={() => {
                const user = auth.currentUser;
                if (user) {
                    console.log("(Email Verification): Called send email function");
                    sendEmail(user);
                }
                else {
                    console.log("(Email Verification) Could not send email, null user");
                }
            }}
        >
            <Text>Re-Send Email</Text>
        </TouchableOpacity>
    )
}
export function LoadingPage() {

    return (
        <View style={styles.screen}>
            <Text style={globalStyles.largeSemiBoldText}>Email Verification</Text>
            <Text style={globalStyles.mediumBoldText}>Check your inbox! (and spam folder)</Text>
            <Image
                source={require("../../images/paper-plane.png")}
                style={styles.planeImage}
                resizeMode="contain"
            />
            <View style={{ height: 10 }}></View>
            <EmailContinueButton title="" address="Navigation" />
            <ResendEmail />
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