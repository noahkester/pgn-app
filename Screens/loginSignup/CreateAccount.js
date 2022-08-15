import {
  TouchableOpacity,
  TextInput,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Octicons from "react-native-vector-icons/Octicons";

import { auth } from "../../utils/firebase";

export function CreateAccountPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigation = useNavigation();

  const handleCreateAccount = () => {
    setEmailError("");
    setPasswordError("");
    if (password !== password2) {
      setPasswordError("Passwords do not match");
      setPassword("");
      setPassword2("");
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("(Create Account) New user with email: ", user.email);
        navigation.navigate("Name");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setEmailError("Invalid email format");
            break;
          case "auth/email-already-exists":
          case "auth/email-already-in-use":
            setEmailError("Email already registered");
            break;
          case "auth/weak-password":
          case "auth/invalid-password":
            setPasswordError("Password must be > 6 characters");
            break;
          default:
            console.log(error.code);
        }
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
        <View
          style={{
            marginTop: 32,
            height: 100,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: 16 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Octicons name="chevron-left" color={"#262626"} size={42} />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
          behavior="height"
          enabled = {false}
          style = {{flex: 1}}
        >
          <View style={{ flex: 1, alignItems: "center", marginTop: 180 }}>
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 20,
                  color: "#262626",
                  marginBottom: 20,
                }}
              >
                Create account
              </Text>
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "#DBDBDB",
                  width: "90%",
                  height: 50,
                  paddingLeft: 20,
                  justifyContent: "center",
                }}
              >
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 16,
                    color: "#262626",
                  }}
                  placeholder={"Email Address"}
                  onChangeText={(text) => setEmail(text)}
                >
                  {email}
                </TextInput>
              </View>
              {emailError == "" ? null : (
                <Text
                  style={{
                    width: "90%",
                    paddingTop: 4,
                    paddingLeft: 10,
                    fontFamily: "Poppins_500Medium",
                    color: "#E35B56",
                  }}
                >
                  {emailError}
                </Text>
              )}
              <View
                style={{
                  width: "90%",
                  height: 1,
                  marginTop: 10,
                  marginBottom: 10,
                  backgroundColor: "#DBDBDB",
                }}
              />
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "#DBDBDB",
                  width: "90%",
                  height: 50,
                  paddingLeft: 20,
                  justifyContent: "center",
                }}
              >
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 16,
                    color: "#262626",
                  }}
                  placeholder={"Password"}
                  secureTextEntry={true}
                  onChangeText={(text) => setPassword(text)}
                >
                  {password}
                </TextInput>
              </View>
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  marginTop: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "#DBDBDB",
                  width: "90%",
                  height: 50,
                  paddingLeft: 20,
                  justifyContent: "center",
                }}
              >
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 16,
                    color: "#262626",
                  }}
                  placeholder={"Re-Type Password"}
                  secureTextEntry={true}
                  onChangeText={(text) => setPassword2(text)}
                >
                  {password2}
                </TextInput>
              </View>
              {passwordError == "" ? null : (
                <Text
                  style={{
                    width: "90%",
                    paddingTop: 4,
                    paddingLeft: 10,
                    fontFamily: "Poppins_500Medium",
                    color: "#E35B56",
                  }}
                >
                  {passwordError}
                </Text>
              )}
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                position: "absolute",
                bottom: 60,
              }}
            >
              <TouchableOpacity
                style={{
                  width: "90%",
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#DBDBDB",
                  backgroundColor: "#FFFFFF",
                }}
                onPress={handleCreateAccount}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 16,
                    color: "#262626",
                  }}
                >
                  {"Create account"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
