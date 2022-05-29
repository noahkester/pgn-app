import { StyleSheet, KeyboardAvoidingView, Text, View } from "react-native";
import React, { useState } from "react";
import globalStyles from "../Styles"
import { LoginButton } from "./LoginSignup"
import { PasswordInput, CustomTextInput, ErrorMessage } from "./Login"
import { auth } from "../firebase"
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
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const handleCreateAccount = async () => {
        var success = false;
        if (password1 !== password2) {
            console.log("Passwords do not match: ", password1, password2);
            return;
        }
        console.log("Password: ", password1);
        await auth
            .createUserWithEmailAndPassword(email, password1)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("Created user as: ", user.email);
                success = true;
            })
            .catch(error => console.log(error.message))
        return success;
    }
    return (
        <KeyboardAvoidingView behaviors="padding" style={styles.createAccountScreen}>
            <Text style={globalStyles.mediumBoldText}>Create New Account</Text>
            <View style={styles.section} />
            <CustomTextInput
                label="Email:"
                value={email}
                onCustomChange={setEmail}
                placeholder="Enter Email" />
            <ErrorMessage message="Email already registred" />
            <PasswordInput
                label="Password:"
                value={password1}
                onCustomChange={setPassword1}
                placeholder="Create Password" />
            <PasswordInput
                label=""
                value={password2}
                onCustomChange={setPassword2}
                placeholder="Re-type Password" />
            <ErrorMessage message="Passwords do not match" />
            <ErrorMessage message="Passwords must be > 6 characters" />
            <LoginButton title="Create Account" address="LoginSignup" customOnPress={handleCreateAccount} />
        </KeyboardAvoidingView>
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
