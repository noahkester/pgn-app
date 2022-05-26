import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Image,
  View, 
} from "react-native";
import { FirstPage } from "./Screens/Login_SignUp";
import { LoginPage } from "./Screens/Login";
import { NavigationPage } from "./Screens/Tabs";
// import styles from "./Styles";

// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login/Signup"
      screenOptions={{
        headerShown : false,
        } 
      }
        >
        <Stack.Screen name="Login/Signup" component={FirstPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Navigation" component={NavigationPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
