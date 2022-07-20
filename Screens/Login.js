import { TouchableOpacity, StyleSheet, TextInput, Text, View, KeyboardAvoidingView, } from "react-native";
import React, { useState } from "react";
import globalStyles from "../styles/Styles";
import { auth, db } from "../utils/firebase";
import { AccountTop } from "./Account";
import { useNavigation, } from "@react-navigation/native";
import { useContext } from "react";
import { setField } from "./newUser/About";
import { ErrorMessage } from "./ErrorMessage";
import LoginContext from "../utils/LoginContext";

// Text Input for Login Password
export function PasswordInput(props) {
  return (
    <View style={{
      flexDirection: "row", width: "90%", justifyContent: "space-between", alignItems: "center",
    }}>
      <Text style={globalStyles.mediumBoldText}>{props.label}</Text>
      <View style={[{
        borderWidth: 1, padding: 10, borderRadius: 30, marginTop: 10, width: "70%"
      }, globalStyles.grayBorder]}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={props.placeholder}
          style={globalStyles.mediumBoldText}
          secureTextEntry={true}
          onChangeText={(text) => props.onCustomChange(text)}
        >
          {props.value}
        </TextInput>
      </View>
    </View>
  );
}

// Used for email / username
export function CustomTextInput(props) {
  return (
    <View style={{
      flexDirection: "row", width: "90%", justifyContent: "space-between", alignItems: "center",
    }}>
      <Text style={globalStyles.mediumBoldText}>
        {props.label}
      </Text>
      <View style={[{
        borderWidth: 1,
        padding: 10,
        borderRadius: 30,
        marginTop: 10,
        width: "70%"
      }, globalStyles.grayBorder]}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={globalStyles.mediumBoldText}
          placeholder={props.placeholder}
          onChangeText={(text) => props.onCustomChange(text)}
        >
          {props.value}
        </TextInput>
      </View>
    </View>
  );
}

function LoginButton(props) {
  const navigation = useNavigation();

  const loginContext = useContext(LoginContext);
  const setSignIn = loginContext.setSignIn;
  const isAdmin = loginContext.isAdmin;
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
            console.log("(login.js) ERROR: No current user after login success");
            return;
          }
          if (user.emailVerified) {
            // User has verified their email, continue to home screen

            if (user.email == "pgn.utexas.sudo@gmail.com") {
              isAdmin.current = true;
              setSignIn(true);
              navigation.navigate("Admin");
            } else {
              isAdmin.current = false;
              setSignIn(true);
              navigation.navigate("Router", { screen: 'Navigation' });
            }
            return;
          } else {
            // Two cases
            // 1: User has not verified their email, but has added account information
            console.log("Checking: " + user.uid);
            db.collection("users")
              .where("id", "==", user.uid)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((user) => {
                  if (user.exists) {
                    console.log(
                      "(Login) User account has been created but missing email verification"
                    );
                    navigation.navigate("EmailVerification");
                  }
                });
                console.log(
                  "(Login) User auth created but missing account information"
                );
                navigation.navigate("Name");
              })
              .catch(() => {
                console.log("(Login) ERROR: Could not get firebase account");
              });
          }
        }
        console.log("In onPress3");
        // Do not need to catch user attempt failed, handled in the handleLogin method
      }}
      style={[
        globalStyles.lightGrayFill,
        globalStyles.button,
        globalStyles.grayBorder,
      ]}
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
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("sign in successfull");
        success = true;
      })
      .catch((error) => {
        switch (error.code) {

          case "auth/invalid-email":
            console.log("sign in bad1");
            setEmailMessage("Invalid email format");
            break;
          case "auth/wrong-password":
            console.log("sign in bad2");
            setPasswordMessage("Incorrect password");
            break;
          case "auth/user-not-found":
            console.log("sign in bad3");
            setEmailMessage("No user found");
            break;
        }
      });
    return success;
  };

  return (
    <View style={{ backgroundColor: "#ffffff" }}>
      <View style={{ marginTop: "15%", justifyContent: "space-between", height: "15%", paddingBottom: 10 }}>
        <AccountTop name={""} address="LoginSignup" />
      </View>
      <KeyboardAvoidingView behaviors="padding" style={{
        height: "80%", width: "100%", marginTop: "30%", alignItems: "center",
      }}>
        <CustomTextInput
          label="Username:"
          value={email}
          onCustomChange={setEmail}
          placeholder="Enter Email"
        />
        <ErrorMessage message={emailMessage} />
        <PasswordInput
          label="Password:"
          value={password}
          onCustomChange={setPassword}
          placeholder="Enter Password"
        />
        <ErrorMessage message={passwordMessage} />
        <View style={{ height: 10 }}></View>
        <LoginButton title="Login" handleLogin={handleLogin} />
      </KeyboardAvoidingView>
    </View>
  );
}
