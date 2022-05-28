import { StyleSheet, Button, TouchableOpacity, Image, TextInput, Text, View } from "react-native";
import React from "react";
import globalStyles from "../Styles"
import { LoginButton } from "./LoginSignup"
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
                >
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
                >
                </TextInput>
            </View>
        </View>
    )
}
export function LoginPage() {
    return (
        <View style={styles.loginScreen}>
            <CustomTextInput label="Username:" placeholder="Enter Username" />
            <ErrorMessage message="Username does not exist"/>
            <PasswordInput label="Password:" placeholder="Enter Password" />
            <ErrorMessage message="Incorrect password"/>
            <View style={styles.space}></View>
            <LoginButton title="Login" address="Navigation" />
        </View>
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
