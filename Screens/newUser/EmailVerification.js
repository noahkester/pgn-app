import {
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Image,
  View,
} from "react-native";
import { NewUserTextInput } from "../Login";
import globalStyles from "../../Styles";
import React, { useState, useEffect } from "react";
import { auth, db, sendEmail } from "../../firebase";
import { NavigationPage } from "../Tabs";
import { useNavigation } from "@react-navigation/native";
// import { LoginContext } from "../../App";
// import { useContext } from "react";
import { NewUserErrorMessage } from "../ErrorMessage";
// TODO, add protection for spamming button (time interval)
// ADD check element that confirms email was sent
export function EmailVerificationPage() {
  const user = auth.currentUser;
  if (user && user.emailVerified) {
    return <NavigationPage />;
  }
  return <LoadingPage />;
}
export function EmailContinueButton(props) {
  const navigation = useNavigation();
  return (
    // For safety might want to add a limit on this
    <TouchableOpacity
      title={"Send Email"}
      style={[
        globalStyles.lightGrayFill,
        globalStyles.button,
        globalStyles.grayBorder,
      ]}
      onPress={() => {
        const user = auth.currentUser;
        if (user) {
          sendEmail(user);
          props.setMessage("Sent! Check your spam folder");
        } else {
          console.log(
            "(EmailVerification) Cannot send to email: no user logged in"
          );
        }
      }}
    >
      <Text style={globalStyles.mediumBoldText}>{"Send Email"}</Text>
    </TouchableOpacity>
  );
}

function LoginInText() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Router", { screen: "Login" });
      }}
    >
      <Text style={[globalStyles.miniSemiBoldText, { marginBottom: 50 }]}>
        Verified? Log in!
      </Text>
    </TouchableOpacity>
  );
}
export function LoadingPage() {
  const [message, setMessage] = useState("");
  return (
    <View style={styles.screen}>
      <View></View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text style={globalStyles.largeSemiBoldText}>Email Verification</Text>
        <Image
          source={require("../../images/paper-plane.png")}
          style={styles.planeImage}
          resizeMode="contain"
        />
        <View style={{ height: 10 }}></View>
        <EmailContinueButton
          title=""
          address="Navigation"
          setMessage={setMessage}
        />
        <NewUserErrorMessage message={message} />
      </View>
      <LoginInText />
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  planeImage: {
    marginTop: 50,
    marginBottom: 50,
    width: 150,
    height: 150,
  },
  submitButton: {
    marginBottom: 10,
  },
});
