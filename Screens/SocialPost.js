import { ScrollView, TouchableOpacity, Image, TextInput, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Octicons from 'react-native-vector-icons/Octicons';

export function SocialPostScreen() {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginTop: 32, height: 100, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity
                    style={{ width: 68, alignItems: 'center' }}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Octicons
                        name="chevron-left"
                        color={'#262626'}
                        size={42}
                    />
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#262626' }}>{'Create Post'}</Text>
                <TouchableOpacity
                    style={{ width: 60, height: 68, alignItems: 'center', justifyContent: 'center', borderRadius: 34, marginRight: 16 }}
                    onPress={() => {
                        navigation.navigate('AddEvent');
                    }}
                >
                </TouchableOpacity>
            </View>
        </View>
    )
}