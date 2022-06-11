import { TouchableOpacity, StyleSheet, TextInput, Text, View, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import globalStyles from "../Styles"
import { auth } from "../Firebase"
import { AccountTop } from "./Account";
import { useNavigation } from '@react-navigation/native';

// Error Message Text under input fields
export function ErrorMessage(props) {
    return (
        <View style={styles.errorMessage}>
            <Text style={[styles.errorMessageText, globalStyles.smallBoldText, globalStyles.errorRedText]}>{props.message}</Text>
        </View>
    )
}

// Text Input for Login Password
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
// Text Input field for additional user information in new user flow
export function AboutTextInput(props) {
    return (
        <View style={styles.inputContainer}>
            <View style={[styles.largeNewUsertextInputContainer, globalStyles.grayBorder]}>
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

export function NewUserTextInput(props) {
    return (
        <View style={styles.inputContainer}>
            <View style={[styles.newUsertextInputContainer, globalStyles.grayBorder]}>
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
// Used for email / username
export function CustomTextInput(props) {
    return (
        <View style={styles.inputContainer}>
            <Text style={[globalStyles.mediumBoldText, styles.customLabel]}>{props.label}</Text>
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
function LoginButton(props) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={async () => {
                // Handle login defined in LoginPage, checks if user is in firebase
                if (await props.handleLogin()) {
                    // There is a user in firebase, now check if they can go to the Home Page
                    // Or if we need additional information from them and email verification
                    const user = auth.currentUser;
                    if (!user) {
                        // This should never happen but in case
                        console.log("(ERROR): No current user after login success");
                    }
                    if (user.emailVerified) {
                        // User has verified their email, continue to home screen
                        navigation.navigate("Navigation");
                    }
                    else {
                        // User has not verified their email, continue with newUser flow
                        navigation.navigate("Name");
                    }
                }
                // Do not need to catch user attempt failed, handled in the handleLogin method
            }}
            style={[globalStyles.lightGrayFill, globalStyles.button, globalStyles.grayBorder]}
        >
            <Text style={globalStyles.mediumBoldText}>{props.title}</Text>
        </TouchableOpacity>
    );
}
export function LoginPage() {
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");

    const handleLogin = async () => {
        var success = false;
        setEmailMessage("");
        setPasswordMessage("");
        await auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                success = true;
            })
            .catch(error => {
                switch (error.code) {
                    case "auth/invalid-email":
                        setEmailMessage("Invalid email format");
                        break;
                    case "auth/wrong-password":
                        setPasswordMessage("Incorrect password");
                        break;
                    case "auth/user-not-found":
                        setEmailMessage("No user found");
                        break;
                }
            })
        return success;
    };

    return (
        <View style={styles.screen}>
            <View style={styles.backNav}>
                <View></View>
                <AccountTop name={""} address="LoginSignup" />
            </View>
            <KeyboardAvoidingView behaviors="padding" style={styles.loginScreen}>
                <CustomTextInput
                    label="Username:"
                    value={email}
                    onCustomChange={setEmail}
                    placeholder="Enter Email" />
                <ErrorMessage message={emailMessage} />
                <PasswordInput
                    label="Password:"
                    value={password}
                    onCustomChange={setPassword}
                    placeholder="Enter Password" />
                <ErrorMessage message={passwordMessage} />
                <View style={styles.space}></View>
                <LoginButton title="Login" handleLogin={handleLogin} />
            </KeyboardAvoidingView>
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        backgroundColor: "white"
    },
    backNav: {
        justifyContent: "space-between",
        height: "15%",
        paddingBottom: 10
    },
    loginScreen: {
        height: "80%",
        width: "100%",
        marginTop: "30%",
        alignItems: "center",
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
    newUsertextInputContainer: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 30,
        marginTop: 10,
        width: "100%"
    },
    largeNewUsertextInputContainer: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        marginTop: 10,
        width: "100%",
        height: 100
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
    },
})
