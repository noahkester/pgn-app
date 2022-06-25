import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";

import { NavigationPage } from "./Tabs";
import { auth, getCurrentUser } from "../firebase";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

export function StartPage() {

  return (
    <Stack.Navigator
      initialRouteName={"LoginSignup"}
      screenOptions={{ headerShown: false }}
    >
      
      <Stack.Screen name="Navigation" component={NavigationPage} />
    </Stack.Navigator>
  );
}
