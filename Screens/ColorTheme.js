import { StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Text, View } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Octicons from 'react-native-vector-icons/Octicons';
import colors from '../styles/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginContext from "../utils/LoginContext";
function Color(props) {
    const active = props.selectedColor === props.color;
    return (
        <TouchableOpacity
            style={{ margin: 1, padding: 10, borderWidth: 2, borderColor: active ? '#85C67E' : '#DBDBDB' }}
            onPress={async () => {
                props.setColor(props.color);
                Object.assign(colors, { universityColor: props.color });
                await AsyncStorage.setItem('@colorTheme', props.color);
            }}
        >
            <View style={{ height: 60, width: 60, borderRadius: 30, backgroundColor: props.color }}>
            </View>
        </TouchableOpacity>
    )
}


export function ColorThemePage(props) {
    const navigation = useNavigation();
    const loginContext = useContext(LoginContext);
    const color = loginContext.color;
    const setColor = loginContext.setColor;
 

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
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
                <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#262626' }}>{'Color Theme'}</Text>
                <View style={{ width: 60, marginRight: 16 }}></View>
            </View>
            <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                <Color selectedColor={color} setColor={setColor} color={'#BD655A'} />
                <Color selectedColor={color} setColor={setColor} color={'#E34322'} />
                <Color selectedColor={color} setColor={setColor} color={'#ED7234'} />
                <Color selectedColor={color} setColor={setColor} color={'#C57035'} />
                <Color selectedColor={color} setColor={setColor} color={'#5DCE89'} />
                <Color selectedColor={color} setColor={setColor} color={'#3C9B5C'} />
                <Color selectedColor={color} setColor={setColor} color={'#AED766'} />
                <Color selectedColor={color} setColor={setColor} color={'#F0CE5F'} />
                <Color selectedColor={color} setColor={setColor} color={'#9EBDE2'} />
                <Color selectedColor={color} setColor={setColor} color={'#958FFD'} />
                <Color selectedColor={color} setColor={setColor} color={'#986DDC'} />
                <Color selectedColor={color} setColor={setColor} color={'#E78AA8'} />
                <Color selectedColor={color} setColor={setColor} color={'#55585D'} />
                <Color selectedColor={color} setColor={setColor} color={'#C1B5B7'} />
                <Color selectedColor={color} setColor={setColor} color={'#BBBBBB'} />
                <Color selectedColor={color} setColor={setColor} color={'#CCCCCC'} />
            </View>
            <Text style={{ marginTop: 20, textAlign: 'center', fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#8E8E8E' }}>{'Reload app to see changes'}</Text>
        </View>
    )
}