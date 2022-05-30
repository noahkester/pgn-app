import { StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Text, View } from "react-native";
import { AccountTop } from "./Account";
import { useNavigation } from '@react-navigation/native';
import globalStyles from "../Styles"
import { PGNImage } from "./Tabs"
import React, { useState } from "react";

const pointsQueue = [
    {
        text: "one"
    },
    {
        text: "two"
    },
    {
        text: "three"
    },
    {
        text: "four"
    },
    {
        text: "five"
    },
    {
        text: "eof"
    }
]


function DoneImage() {
    return (
        <Image
            source={require("../images/adminparty.png")}
            style={styles.adminParty}
            resizeMode="contain"
        />
    )
}
function SettingsButton() {
    return (
        <View style={styles.settingsButton}>
            <Image
                source={require("../images/settings.png")}
                style={styles.settingsIcon}
                resizeMode="contain"
            />
            <Text style={globalStyles.smallBoldText}>Settings</Text>
        </View>
    )
}
function AdminTop(props) {
    const navigation = useNavigation();
    return (
        <View style={styles.adminTop}>
            <SettingsButton />
            <PGNImage />
        </View>
    )
}
function AcceptButton(props) {
    return (
        <TouchableOpacity onPress={() => props.customOnPress(props.index + 1)}>
            <Image
                source={require("../images/accept.png")}
                style={styles.bottomButton}
                resizeMode="contain"
            />
        </TouchableOpacity>
    )
}
function RejectButton(props) {
    return (
        <TouchableOpacity onPress={() => props.customOnPress(props.index + 1)}>
            <Image
                source={require("../images/reject.png")}
                style={styles.bottomButton}
                resizeMode="contain"
            />
        </TouchableOpacity>
    )
}
function AdminBottom(props) {
    return (
        <View style={styles.adminBottom}>
            <RejectButton customOnPress={props.customOnPress} index={props.index} />
            <AcceptButton customOnPress={props.customOnPress} index={props.index} />
        </View>
    )
}
function PointSheet(props) {
    return (
        <Text>{props.text}</Text>
    )
}
function PointsQueue(props) {
    const points = pointsQueue.map((point) =>
        <PointSheet
            text={point.text}
        />
    )
    return (
        <View>
            {points[props.queueIndex]}
        </View>
    )
}
export function AdminPage(props) {
    const [queueIndex, setQueueIndex] = useState(0);
    return (
        <View style={styles.adminScreen}>
            <AdminTop />
            <Text style={globalStyles.largeSemiBoldText}>Remaining Points: {pointsQueue.length - queueIndex}</Text>
            <PointsQueue queueIndex={queueIndex} />
            <AdminBottom index={queueIndex} customOnPress={setQueueIndex} />
        </View>
    )
}
const styles = StyleSheet.create({
    adminScreen: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    adminParty: {
        width: 300,
        height: 300,
    },
    adminTop: {
        height: 160,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "white",
        paddingTop: 25,
        position: "absolute",
        top: 0,
        width: "100%"
    },
    adminBottom: {
        height: 160,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "white",
        position: "absolute",
        width: "100%",
        bottom: 0
    },
    settingsIcon: {
        width: 60,
        height: 60
    },
    settingsButton: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    bottomButton: {
        width: 100,
        height: 100
    }
})