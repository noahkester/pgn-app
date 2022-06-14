import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Image,
  View,
} from "react-native";

import { StartPage } from "./Screens/Start";
import { LoginSignupPage } from "./Screens/LoginSignup";
import { LoginPage } from "./Screens/Login";
import { CreateAccountPage } from "./Screens/CreateAccount";
import { NavigationPage } from "./Screens/Tabs";
import { AccountPage } from "./Screens/Account";
import { SubmitPage } from "./Screens/Submit";
import { AdminPage } from "./Screens/Admin";
import { AdminSettingsPage } from "./Screens/AdminSettings";
import { NamePage } from "./Screens/newUser/Name";
import { EducationPage } from "./Screens/newUser/Education";
import { ProfilePicturesPage } from "./Screens/newUser/ProfilePictures";
import { AboutPage } from "./Screens/newUser/About";
import { ContactPage } from "./Screens/newUser/Contact";
import { EmailVerificationPage } from "./Screens/newUser/EmailVerification";
// import styles from "./Styles";
// In App.js in a new project

import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import {
  createNativeStackNavigator,
  Card,
} from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { auth, getEvents } from "./Firebase";
import AppLoading from "expo-app-loading";
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
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";

const Stack = createNativeStackNavigator();
console.disableYellowBox = true;

function App() {
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
  });
  // Get Events here
  //const events = getEvents();
  //console.log("(App) Events: " + events);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
          screenOptions={{
            headerShown: false,
            //TODO will have to set it false, when launching so the swiping to get to
            //the previous screen is disabled
            gestureEnabled: true,

          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{
              headerBackButtonMenuEnabled: true,
            }}
          />
          <Stack.Screen name="Start" component={StartPage} />
          <Stack.Screen name="CreateAccount" component={CreateAccountPage} />
          <Stack.Screen name="Navigation" component={NavigationPage} />
          <Stack.Screen name="Account" component={AccountPage} />
          <Stack.Screen name="Submit" component={SubmitPage} />
          <Stack.Screen name="Admin" component={AdminPage} />
          <Stack.Screen name="Settings" component={AdminSettingsPage} />

          <Stack.Screen name="Name" component={NamePage} />
          <Stack.Screen name="Education" component={EducationPage} />
          <Stack.Screen
            name="ProfilePictures"
            component={ProfilePicturesPage}
          />
          <Stack.Screen name="About" component={AboutPage} />
          <Stack.Screen name="Contact" component={ContactPage} />
          <Stack.Screen
            name="EmailVerification"
            component={EmailVerificationPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
