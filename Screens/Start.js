import { StyleSheet, TouchableOpacity, Image, Text, View, } from "react-native";
import { LoginSignupPage } from "./LoginSignup";
import { NavigationPage } from "./Tabs";
import { auth } from "../Firebase";
import { useState } from "react";

export function StartPage() {
    // Get the current user
    const user = auth.currentUser;
    
    // Go to Home if there is a user logged in and they have email verification
    if (user && user.emailVerified) {
        return (
            <NavigationPage />
        )
    }
    // Go to Login Signup page to get a user logged in or complete their email verfication
    return (
        <LoginSignupPage />
    )
}