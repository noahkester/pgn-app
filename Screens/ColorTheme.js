import { StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Text, View } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Octicons from 'react-native-vector-icons/Octicons';

function Color(props) {
    return (
        <View style={{ padding: 10, borderWidth: 3, borderColor: props.active ? '#85C67E' : '#DBDBDB' }}>
            <View style={{ height: 60, width: 60, borderRadius: 30, backgroundColor: props.color }}>
            </View>
        </View>
    )
}


export function ColorThemePage(props) {
    const navigation = useNavigation();
    const [color, setColor] = useState();

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
            <View style={{ width: '90%', height: 100, alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                <Color active={true} color={'#C57035'} />
                <Color color={'#182A4A'} />
                <Color color={'#B9271A'} />
                <Color color={'#030303'} />
                <Color color={'#327262'} />
                <Color color={'#0D2E5E'} />
                <Color color={'#BE2E26'} />
                <Color color={'#182A4A'} />
                <Color color={'#9C2937'} />
                <Color color={'#046240'} />
                <Color color={'#152B50'} />
                <Color color={'#372666'} />
            </View>
        </View>
    )
}