import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";
import { LoginSignupPage } from "./LoginSignup";
import { NavigationPage } from "./Tabs";
import { auth, getCurrentUser } from "../firebase";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

export function StartPage() {
  const navigation = useNavigation();
  useEffect(() => {
    async function wait() {
      // https://stackoverflow.com/questions/39231344/how-to-wait-for-firebaseauth-to-finish-initializing
      await getCurrentUser(auth)
        .then((user) => {
          if (user.emailVerified) {
            if (user.email == "pgn.utexas.sudo@gmail.com") {
              navigation.navigate("Admin");
            } else {
              navigation.navigate("Navigation");
            }
          }
        })
        .catch(() => {
          console.log("(Start page) No user: Render Login/Signup");
        });
    }
    wait();
  }, []);
  return (
    <Stack.Navigator
      initialRouteName={"LoginSignup"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginSignup" component={LoginSignupPage} />
      <Stack.Screen name="Navigation" component={NavigationPage} />
    </Stack.Navigator>
  );
}
