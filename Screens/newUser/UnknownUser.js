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
        <View style={{ flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={require("../../images/warning.png")}
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
            />
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#262626', marginBottom: 10 }}>User not found</Text>
            <Text style={{ width: '70%', textAlign: 'center', fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#8E8E8E', marginBottom: 10 }}>Sorry! Your name was not found in the database of members. Make sure your name matches the official name you gave PGN</Text>
            <Text style={{ width: '70%', textAlign: 'center', fontFamily: 'Poppins_600SemiBold', fontSize: 12, color: '#8E8E8E', marginBottom: 20 }}>Ex: Robert, Robby, Bob</Text>
            <TouchableOpacity
                onPress={async () => {
                    navigation.navigate('LoginSignup')
                }}
                style={{ marginTop: 10, width: '90%', height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 30, borderWidth: 1, borderColor: '#DBDBDB', backgroundColor: '#FFFFFF' }}
            >
                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626' }}>{'Go back'}</Text>
            </TouchableOpacity>
        </View>
    )
}