import React, { useState, useContext, useRef, useEffect } from "react";
import { StyleSheet, ScrollView, Button, TouchableOpacity, Text, Image, View, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Octicons from 'react-native-vector-icons/Octicons';
import { db } from "../../utils/firebase";

function PersonCard(props) {
    //TODO pull this
    const totalPrp = 6;
    const totalPp = 6;
    const totalSp = 6;
    const totalAi = 3;
    const totalAttd = 8;
    var prpColor = '#E35B56'
    if (props.prp < totalPrp && props.prp > 0) {
        prpColor = '#EFA039';
    }
    if (props.prp >= totalPrp) {
        prpColor = '#85C67E';
    }
    var ppColor = '#E35B56'
    if (props.pp < totalPp && props.pp > 0) {
        ppColor = '#EFA039';
    }
    if (props.pp >= totalPrp) {
        ppColor = '#85C67E';
    }
    var spColor = '#E35B56'
    if (props.sp < totalSp && props.sp > 0) {
        spColor = '#EFA039';
    }
    if (props.sp >= totalSp) {
        spColor = '#85C67E';
    }
    var aiColor = '#E35B56'
    if (props.ai < totalAi && props.ai > 0) {
        aiColor = '#EFA039';
    }
    if (props.ai >= totalAi) {
        aiColor = '#85C67E';
    }
    var attdColor = '#E35B56'
    if (props.attd < totalAttd && props.attd > 0) {
        attdColor = '#EFA039';
    }
    if (props.attd >= totalAttd) {
        attdColor = '#85C67E';
    }

    return (
        <View style={{ width: '85%' }}>
            <View style={{ flex: 1, borderWidth: 1, borderColor: '#DBDBDB', height: 60, marginBottom: 10, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ height: 60, width: '40%', justifyContent: 'center' }}>
                    <Text style={{ marginLeft: 10, fontFamily: 'Poppins_600SemiBold', fontSize: 14 }}>{props.firstname}</Text>
                    <Text style={{ marginLeft: 10, fontFamily: 'Poppins_600SemiBold', fontSize: 14 }}>{props.lastname}</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '60%' }}>
                    <View style={{ width: '19%', height: '100%', borderWidth: 1, backgroundColor: prpColor, alignItems: 'center', justifyContent: 'center', borderColor: '#DBDBDB' }}>
                        <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#FFFFFF' }}>{props.prp}</Text>
                    </View>
                    <View style={{ width: '19%', height: '100%', borderWidth: 1, backgroundColor: ppColor, alignItems: 'center', justifyContent: 'center', borderColor: '#DBDBDB' }}>
                        <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#FFFFFF' }}>{props.pp}</Text>
                    </View>
                    <View style={{ width: '19%', height: '100%', borderWidth: 1, backgroundColor: spColor, alignItems: 'center', justifyContent: 'center', borderColor: '#DBDBDB' }}>
                        <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#FFFFFF' }}>{props.sp}</Text>
                    </View>
                    <View style={{ width: '19%', height: '100%', borderWidth: 1, backgroundColor: aiColor, alignItems: 'center', justifyContent: 'center', borderColor: '#DBDBDB' }}>
                        <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#FFFFFF' }}>{props.ai}</Text>
                    </View>
                    <View style={{ width: '24%', height: '100%', borderWidth: 1, borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: attdColor, alignItems: 'center', justifyContent: 'center', borderColor: '#DBDBDB' }}>
                        <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#FFFFFF' }}>{(props.attd / totalAttd * 100) + '%'}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}


export function ViewPeoplePage() {
    const navigation = useNavigation();
    const [allUsers, setAllUsers] = useState([]);
    useEffect(() => {
        db.collection("users")
            .get()
            .then((querySnapshot) => {
                var tempAllUsers = [];
                querySnapshot.forEach((doc) => {
                    var data = doc.data();
                    tempAllUsers.push(data)
                });
                setAllUsers(tempAllUsers);
            });
    }, [])
    const data = allUsers.map((d) => {
        return (
            <PersonCard
                firstname={d.firstname}
                lastname={d.lastname}
                prp={d.professionalPoints}
                pp={d.philanthropyPoints}
                sp={d.socialPoints}
                ai={d.activeInterviews}
                attd={3} //TODO add attendance number in database
            />
        )
    })
    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <View style={{ marginTop: 32, height: 100, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ width: 68 }}></View>
            </View>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={{ width: '85%', height: 30, flexDirection: 'row' }}>
                    <View style={{ width: '40%' }}></View>
                    <View style={{ width: '60%', flexDirection: 'row' }}>
                        <Text style={{ width: '19%', fontFamily: 'Poppins_600SemiBold', textAlign: 'center' }}>PRP</Text>
                        <Text style={{ width: '19%', fontFamily: 'Poppins_600SemiBold', textAlign: 'center' }}>PP</Text>
                        <Text style={{ width: '19%', fontFamily: 'Poppins_600SemiBold', textAlign: 'center' }}>SP</Text>
                        <Text style={{ width: '19%', fontFamily: 'Poppins_600SemiBold', textAlign: 'center' }}>AI</Text>
                        <Text style={{ width: '24%', fontFamily: 'Poppins_600SemiBold', textAlign: 'center' }}>Attd</Text>
                    </View>
                </View>
                <ScrollView style={{ width: '100%' }}>
                    <View style={{ alignItems: 'center', marginBottom: 300 }}>
                        {data}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}