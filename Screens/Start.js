import { StyleSheet, TouchableOpacity, Image, Text, View, } from "react-native";
import { LoginSignupPage } from "./LoginSignup";
import { NavigationPage } from "./Tabs";
import { auth, getCurrentUser } from "../Firebase";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

export function StartPage({ navigation }) {
    const [validUser, setValidUser] = useState(false);
    useEffect(() => {
        async function wait() {
            // https://stackoverflow.com/questions/39231344/how-to-wait-for-firebaseauth-to-finish-initializing
            await getCurrentUser(auth).then(user => {
                setValidUser(user.emailVerified);
            }).catch(() => {
                console.log("(Start page) No user: Render Login/Signup");
            });
        }
        wait();
    }, [])
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            {
                (validUser) ?
                    (<Stack.Screen name="Navigation" component={NavigationPage} />)
                    :
                    (<Stack.Screen name="LoginSignup" component={LoginSignupPage} />)
            }
        </Stack.Navigator>
    )
}