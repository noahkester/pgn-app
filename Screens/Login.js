import { StyleSheet, TextInput, Text, View, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import globalStyles from "../Styles"
import { LoginButton } from "./LoginSignup"
import { auth } from "../firebase"

export function ErrorMessage(props) {
    return (
        <View style={styles.errorMessage}>
            <Text style={[styles.errorMessageText, globalStyles.smallBoldText, globalStyles.errorRedText]}>{props.message}</Text>
        </View>
    )
}
export function PasswordInput(props) {
    return (
        <View style={styles.inputContainer}>
            <Text style={globalStyles.mediumBoldText}>{props.label}</Text>
            <View style={[styles.textInputContainer, globalStyles.grayBorder]}>
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder={props.placeholder}
                    style={globalStyles.mediumBoldText}
                    secureTextEntry={true}
                    onChangeText={text => props.onCustomChange(text)}
                >
                    {props.value}
                </TextInput>
            </View>
        </View>
    );
}
export function CustomTextInput(props) {
    return (
        <View style={styles.inputContainer}>
            <Text style={globalStyles.mediumBoldText}>{props.label}</Text>
            <View style={[styles.textInputContainer, globalStyles.grayBorder]}>
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={globalStyles.mediumBoldText}
                    placeholder={props.placeholder}
                    onChangeText={text => props.onCustomChange(text)}
                >
                    {props.value}
                </TextInput>
            </View>
        </View>
    )
}
export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        var success = false;
        await auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("Logged in as: ", user.email);
                success = true;
            })
            .catch(error => console.log(error.message))
        return success;
    };

    return (
        <KeyboardAvoidingView behaviors="padding" style={styles.loginScreen}>
            <CustomTextInput
                label="Username:"
                value={email}
                onCustomChange={setEmail}
                placeholder="Enter Email" />
            <ErrorMessage message="Email not registered" />
            <PasswordInput
                label="Password:"
                value={password}
                onCustomChange={setPassword}
                placeholder="Enter Password" />
            <ErrorMessage message="Incorrect password" />
            <View style={styles.space}></View>
            <LoginButton title="Login" address="Navigation" customOnPress={handleLogin} />
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    loginScreen: {
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
        borderWidth: 1,
        padding: 10,
        borderRadius: 30,
        marginTop: 10,
        width: "70%"
    },
    space: {
        height: 10
    },
    errorMessage: {
        flexDirection: "row",
        justifyContent: "end",
        width: "100%",
    },
    errorMessageText: {
        paddingLeft: "35%",
    }
})
