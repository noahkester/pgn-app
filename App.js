import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Image,
  View,
} from "react-native";
import { LoginSignupPage } from "./Screens/LoginSignup";
import { LoginPage } from "./Screens/Login";
import { CreateAccountPage } from "./Screens/CreateAccount";
import { NavigationPage } from "./Screens/Tabs";
import { AccountPage } from "./Screens/Account";
// import styles from "./Styles";
// In App.js in a new project

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from 'react';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic
} from '@expo-google-fonts/poppins'

const Stack = createNativeStackNavigator();

function App() {
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginSignup"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="LoginSignup" component={LoginSignupPage} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="CreateAccount" component={CreateAccountPage} />
          <Stack.Screen name="Navigation" component={NavigationPage} />
          <Stack.Screen name="Account" component={AccountPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default App;
