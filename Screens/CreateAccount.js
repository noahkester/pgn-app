import { StyleSheet, KeyboardAvoidingView, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import globalStyles from "../Styles"
import { PasswordInput, CustomTextInput, ErrorMessage } from "./Login"
import { auth, db } from "../Firebase"
import { AccountTop } from "./Account";
import ucolors from "../UniversityColors";
import DropDownPicker from "react-native-dropdown-picker";
import colors from "../Colors";
import { useNavigation } from '@react-navigation/native';

function CreateAccountButton(props) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={async () => {
                // Handle create account defined in CreateAccountPage
                if (await props.handleCreateAccount()) {
                    const user = auth.currentUser;
                    if (!user) {
                        // This should never happen but in case
                        console.log("(ERROR): No current user after create account success");
                    }
                    navigation.navigate("Name");
                }
                // Do not need to catch user attempt failed, handled in the handleCreateAccount method
            }}
            style={[globalStyles.lightGrayFill, globalStyles.button, globalStyles.grayBorder]}
        >
            <Text style={globalStyles.mediumBoldText}>{props.title}</Text>
        </TouchableOpacity>
    );
}

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
                console.log("(Create Account) New user with email: ", user.email);
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
                <CreateAccountButton title="Create Account" handleCreateAccount={handleCreateAccount} />
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
    },
})
