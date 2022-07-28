import {
    StyleSheet,
    Button,
    TouchableOpacity,
    Text,
    Image,
    View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useContext } from "react";

export function UnknownUserPage() {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>User not registed as PGN member:</Text>
            <Text>Please talk with an admin if you believe this is a mistake</Text>
            <Text>Make sure the name you input matches the name you gave PGN</Text>
            <Text>Example: Michael vs Mike will cause this error</Text>
            <TouchableOpacity
                style={{ marginTop: 30 }}
                onPress={()=>{
                    navigation.navigate("LoginSignup");
                }}
            >
                <Text>Go back</Text>
            </TouchableOpacity>
        </View>
    )
}