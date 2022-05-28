import { StyleSheet, Button, TouchableOpacity, Image, TextInput, Text, View } from "react-native";
import React from "react";
import globalStyles from "../Styles"
import { LoginButton } from "./LoginSignup"
import { PasswordInput, CustomTextInput, ErrorMessage } from "./Login"
/*
Backend Stuff TODO:

Get inputs from boxes and create object to send to SQL.
Add verified = false for email verification.
Do not allow login until email is verified.
Send email after "Create account" button pressed
Update "create new account page" to say "resend email" or "create new account"
Add expiration for email after 5 minutes. IF expired, delete object and do not add to database

For text input:
Check that email is not alredy registered
Check that username is not taken
Check username has only numbers and letters
Check that passwords match
Check that password length is enough

*/

export function CreateAccountPage() {
    return (
        <View style={styles.createAccountScreen}>
            <Text style={globalStyles.mediumBoldText}>Create New Account</Text>
            <View style={styles.section} />
            <CustomTextInput label="Email:" placeholder="Enter Email" />
            <ErrorMessage message="Email already registred" />
            <CustomTextInput label="Username:" placeholder="Create Username" />
            <ErrorMessage message="Username taken" />
            <ErrorMessage message="Only letters and numbers allowed" />
            <PasswordInput label="Password:" placeholder="Create Password" />
            <PasswordInput label="" placeholder="Re-type Password" />
            <ErrorMessage message="Passwords do not match" />
            <ErrorMessage message="Passwords must be > 6 characters" />
            <LoginButton title="Create Account" address="LoginSignup" />
        </View>
    )
}
const styles = StyleSheet.create({
    createAccountScreen: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    inputContainer: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    textInputContainer: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 30,
        width: "70%"
    },
    section: {
        height: 20
    }
})
