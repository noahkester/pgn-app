import { StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Text, View } from "react-native";
import { AccountTop } from "./Account";
import { useNavigation } from '@react-navigation/native';
import globalStyles from "../Styles"
import { PGNImage } from "./Tabs"
import React, { useState } from "react";

const pointsQueue = [
    {
        text: "one",
        name: "Noah Kester",
        pledgeClass: "Spring 2022",
        event: "Cold Cookie Profit Share",
        image: "../images/pgn.png",
        description: "This is a descriptiofs jkrf srjbfor bf"
    },
    {
        text: "two",
        name: "Michael Jordan",
        pledgeClass: "Fall 2021",
        event: "Cold Cookie Profit Share",
        image: "../images/pgn.png",
        description: "This is a description"
    },
    {
        text: "three",
        name: "Kyrie Irvin",
        pledgeClass: "Spring 2020",
        event: "Cold Cookie Profit Share",
        image: "../images/pgn.png",
        description: "This is a description"
    },
    {
        text: "four",
        name: "Jason Tatum",
        pledgeClass: "Spring 2020",
        event: "Cold Cookie Profit Share",
        image: "../images/pgn.png",
        description: "This is a description"
    },
    {
        text: "five",
        name: "Luka Doncic",
        pledgeClass: "Fall 2022",
        event: "Cold Cookie Profit Share",
        image: "../images/pgn.png",
        description: "This is a description"
    },
    {
        text: "eof",
        name: "James Harden",
        pledgeClass: "Spring 2022",
        event: "Cold Cookie Profit Share",
        image: "../images/pgn.png",
        description: "This is a description"
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
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <View style={styles.settingsButton}>
                <Image
                    source={require("../images/settings.png")}
                    style={styles.settingsIcon}
                    resizeMode="contain"
                />
                <Text style={globalStyles.smallBoldText}>Settings</Text>
            </View>
        </TouchableOpacity>
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
        <View style={styles.pointSheet}>
            <View style={styles.space}></View>
            <View style={styles.pointTextLine}>
                <Text style={globalStyles.largeSemiBoldText}>Name: </Text>
                <Text style={globalStyles.largeSemiBoldText}>{props.name}</Text>
            </View>
            <View style={styles.pointTextLine}>
                <Text style={globalStyles.largeSemiBoldText}>PC: </Text>
                <Text style={globalStyles.largeSemiBoldText}>{props.pledgeClass}</Text>
            </View>
            <View style={styles.space}></View>
            <Text style={globalStyles.largeSemiBoldText}>{props.event}</Text>
            <Image
                source={require("../images/pgn.png")}
                resizeMode="contain"
                style={styles.pointImage}
            />
            <Text style={globalStyles.largeSemiBoldText}>{props.description}</Text>
        </View>
    )
}
function PointsQueue(props) {
    const points = pointsQueue.map((point) =>
        <PointSheet
            name={point.name}
            pledgeClass={point.pledgeClass}
            event={point.event}
            image={point.image}
            description={point.description}
        />
    )
    if (props.queueIndex >= pointsQueue.length) {
        return (
            <View style={styles.pointQueue}>
                <DoneImage />
            </View>
        )
    }
    return (
        <View style={styles.pointQueue}>
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
    },
    pointSheet: {
        width: "100%",
        //borderWidth: 5
        justifyContent: "center",
        alignItems: "center"
    },
    pointQueue: {
        width: "80%",
    },
    pointImage: {
        height: 200,
        width: 200
    },
    pointTextLine: {
        flexDirection: "row"
    },
    space: {
        height: 20
    }
})