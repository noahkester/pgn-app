import React, { useState, useContext } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    View,
    ScrollView,
    TextInput,
} from "react-native";
import globalStyles from "../../styles/Styles";
import colors from "../../styles/Colors";
import { SignOutButton } from "../Account";
import { SubmitPoints } from "../Home";
import LoginContext from "../../utils/LoginContext";
import { useNavigation } from "@react-navigation/native";
import { EventSection } from "../Events";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { db, store } from '../../utils/firebase';
import * as firebase from "firebase";

function AccountTop(props) {
    const navigation = useNavigation();
    return (
        <View
            style={{
                flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                width: "100%", height: 160,
                paddingLeft: 10, paddingRight: 10, paddingTop: 70,
                backgroundColor: '#FFFFFF',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    source={require("../../images/back.png")}
                    style={{ width: 60, height: 60 }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <Text style={globalStyles.largeBoldText}>{props.name}</Text>
            <View style={{ width: 60 }} />
        </View>
    );
}


export function AdminSettingsPage() {
    const loginContext = useContext(LoginContext);
    return (
        <View style={{ flex: 1 }}>
            <AccountTop />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        db.collection("users")
                            .get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    doc.ref.update({
                                        status: 'active'
                                    });
                                })
                            })
                    }}
                    style={{ marginRight: 16 }}
                >
                    <View style={{
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <View style={[{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 30 }, globalStyles.universityColorFill]}>
                            <MaterialCommunityIcons
                                name="file-code"
                                color={'#FFFFFF'}
                                size={42}
                                style={{}}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                <Text>Set all to active</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        db.collection("users")
                            .get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    doc.ref.update({
                                        submittedPoints: []
                                    });
                                })
                            })
                        db.collection("points")
                            .get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    store.ref().child('points/' + doc.id)
                                        .delete().then(() => {
                                            doc.ref.delete();
                                        }).catch((error) => {
                                            console.log("could not delete file " + doc.id);
                                        });
                                })
                            })
                    }}
                    style={{ marginRight: 16 }}
                >
                    <View style={{
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <View style={[{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 30 }, globalStyles.universityColorFill]}>
                            <IonIcons
                                name="md-trash"
                                color={'#FFFFFF'}
                                size={42}
                                style={{}}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                <Text>Delete all points</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {

                    }}
                    style={{ marginRight: 16 }}
                >
                    <View style={{
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <View style={[{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 30 }, globalStyles.universityColorFill]}>
                            <IonIcons
                                name="md-trash"
                                color={'#FFFFFF'}
                                size={42}
                                style={{}}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                <Text>Delete all events and chapter meetings</Text>
            </View>
            <Text>Add User</Text>
            <TextInput
                style={{ backgroundColor: '#FFFFFF', borderWidth: 1 }}
                multiline={true}
                placeholder="Firstname Lastname"
                onChangeText={(text) => {

                }}
                defaultValue={""}
            />
            <TextInput
                style={{ backgroundColor: '#FFFFFF', borderWidth: 1 }}
                multiline={true}
                placeholder="Role"
                onChangeText={(text) => {

                }}
                defaultValue={""}
            />
            <TextInput
                style={{ backgroundColor: '#FFFFFF', borderWidth: 1 }}
                multiline={true}
                placeholder="Pledge Class"
                onChangeText={(text) => {

                }}
                defaultValue={""}
            />
            <TouchableOpacity style={{ marginBottom: 50 }}>
                <Text>Add</Text>
            </TouchableOpacity>
            <Text>Delete User</Text>
            <TextInput
                style={{ backgroundColor: '#FFFFFF', borderWidth: 1 }}
                multiline={true}
                placeholder="Firstname Lastname"
                onChangeText={(text) => {

                }}
                defaultValue={""}
            />
            <TouchableOpacity style={{ marginBottom: 50 }}>
                <Text>Delete</Text>
            </TouchableOpacity>
            <Text>Edit User</Text>
            <TextInput
                style={{ backgroundColor: '#FFFFFF', borderWidth: 1 }}
                multiline={true}
                placeholder="Firstname Lastname"
                onChangeText={(text) => {

                }}
                defaultValue={""}
            />
            <TextInput
                style={{ backgroundColor: '#FFFFFF', borderWidth: 1 }}
                multiline={true}
                placeholder="New Role"
                onChangeText={(text) => {

                }}
                defaultValue={""}
            />
            <TextInput
                style={{ backgroundColor: '#FFFFFF', borderWidth: 1 }}
                multiline={true}
                placeholder="New Pledge Class"
                onChangeText={(text) => {

                }}
                defaultValue={""}
            />
        </View >
    )
}
