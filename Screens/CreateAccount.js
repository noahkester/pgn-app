import { StyleSheet, KeyboardAvoidingView, Text, View } from "react-native";
import React, { useState } from "react";
import globalStyles from "../Styles"
import { LoginButton } from "./LoginSignup"
import { PasswordInput, CustomTextInput, ErrorMessage } from "./Login"
import { auth } from "../firebase"
import { AccountTop } from "./Account";
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
    const [emailMessage, setEmailMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const handleCreateAccount = async () => {
        setEmailMessage("");
        setPasswordMessage("");
        var success = false;
        if (password1 !== password2) {
            setPasswordMessage("Passwords do not match");
            return;
        }
        await auth
            .createUserWithEmailAndPassword(email, password1)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("Created user as: ", user.email);
                success = true;
            })
            .catch(error => {
                switch (error.code) {
                    case "auth/invalid-email":
                        setEmailMessage("Invalid email format");
                        break;
                    case "auth/email-already-exists":
                        setEmailMessage("Email already registered");
                        break;
                    case "auth/weak-password":
                    case "auth/invalid-password":
                        setPasswordMessage("Password must be > 6 characters");
                        break;
                }
            })
        return success;
    }
    return (
        <View style={styles.screen}>
            <View style={styles.backNav}>
                <View></View>
                <AccountTop name={""} address="LoginSignup" />
            </View>
            <KeyboardAvoidingView behaviors="padding" style={styles.createAccountScreen}>
                <Text style={globalStyles.mediumBoldText}>Create New Account</Text>
                <View style={styles.section} />
                <CustomTextInput
                    label="Email:"
                    value={email}
                    onCustomChange={setEmail}
                    placeholder="Enter Email" />
                <ErrorMessage message={emailMessage} />
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
                <ErrorMessage message={passwordMessage} />
                <LoginButton title="Create Account" address="LoginSignup" customOnPress={handleCreateAccount} />
            </KeyboardAvoidingView>
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        backgroundColor: "white"
    },
    backNav: {
        height: "15%",
        justifyContent: "space-between",
        paddingBottom: 10
    },
    createAccountScreen: {
        height: "80%",
        width: "100%",
        marginTop: "25%",
        alignItems: "center",
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
