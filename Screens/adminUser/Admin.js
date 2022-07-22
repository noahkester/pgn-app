import { StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Text, View } from "react-native";
import { AccountTop } from "../Account";
import { useNavigation } from '@react-navigation/native';
import globalStyles from "../../styles/Styles"
import { PGNImage } from "../Tabs"
import { db, store } from "../../utils/firebase";
import React, { useEffect, useState } from "react";

// const pointsQueue = [
//     {
//         text: "one",
//         name: "Noah Kester",
//         pledgeClass: "Spring 2022",
//         event: "Cold Cookie Profit Share",
//         image: "../images/pgn.png",
//         description: "This is a descriptiofs jkrf srjbfor bf"
//     },
//     {
//         text: "two",
//         name: "Michael Jordan",
//         pledgeClass: "Fall 2021",
//         event: "Cold Cookie Profit Share",
//         image: "../images/pgn.png",
//         description: "This is a description"
//     },
//     {
//         text: "three",
//         name: "Kyrie Irvin",
//         pledgeClass: "Spring 2020",
//         event: "Cold Cookie Profit Share",
//         image: "../images/pgn.png",
//         description: "This is a description"
//     },
//     {
//         text: "four",
//         name: "Jason Tatum",
//         pledgeClass: "Spring 2020",
//         event: "Cold Cookie Profit Share",
//         image: "../images/pgn.png",
//         description: "This is a description"
//     },
//     {
//         text: "five",
//         name: "Luka Doncic",
//         pledgeClass: "Fall 2022",
//         event: "Cold Cookie Profit Share",
//         image: "../images/pgn.png",
//         description: "This is a description"
//     },
//     {
//         text: "eof",
//         name: "James Harden",
//         pledgeClass: "Spring 2022",
//         event: "Cold Cookie Profit Share",
//         image: "../images/pgn.png",
//         description: "This is a description"
//     }
// ]


function DoneImage() {
    return (
        <Image
            source={require("../../images/adminparty.png")}
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
                    source={require("../../images/settings.png")}
                    style={styles.settingsIcon}
                    resizeMode="contain"
                />
                <Text style={globalStyles.smallBoldText}>Settings</Text>
            </View>
        </TouchableOpacity>
    )
}
function AdminTop(props) {
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
                source={require("../../images/accept.png")}
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
                source={require("../../images/reject.png")}
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
    const [imageUri, setImageUri] = useState('');
    useEffect(() => {
        store
            .ref(`/points/${props.image}`) //name in storage in firebase console
            .getDownloadURL()
            .then((url) => {
                console.log(url);
                setImageUri(url);
                console.log("(admin.js) Successfully got point image " + props.image);
            })
            .catch((e) => {
                console.log("(admin.js) Errors while getting " + props.image);
            });
    }, [])
    return (
        <View style={styles.pointSheet}>
            <View style={styles.space}></View>
            <View style={styles.pointTextLine}>
                <Text style={globalStyles.largeSemiBoldText}>{props.name}</Text>
            </View>
            <View style={styles.pointTextLine}>
                <Text style={globalStyles.largeSemiBoldText}>{props.label}</Text>
            </View>
            <View style={styles.space}></View>
            <Text style={globalStyles.largeSemiBoldText}>{props.event}</Text>
            <Image
                source={(imageUri == '') ? require("../../images/unknown-image.png") : { uri: imageUri }}
                resizeMode="contain"
                style={styles.pointImage}
            />
            <Text style={globalStyles.largeSemiBoldText}>{props.proof}</Text>
        </View>
    )
}
function PointsQueue(props) {
    const points = props.pointsQueue.map((point) => {
        console.log(point);
        return (
            <PointSheet
                name={point.name}
                label={point.label}
                event={point.event}
                image={point.id + "_" + point.label}
                proof={point.proof}
            />);
    }
    )
    //console.log('(Admin) Points queue: ' + JSON.stringify(points[2]));
    if (props.queueIndex >= props.pointsQueue.length) {
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
    const [pointsQueue, setPointsQueue] = useState([]);
    //fetch data
    useEffect(() => {
        var tempQueue = [];
        db.collection("points-queue")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    tempQueue.push(doc.data());
                })
                setPointsQueue(tempQueue);
            })
    }, []);
    const [queueIndex, setQueueIndex] = useState(0);
    return (
        <View style={styles.adminScreen}>
            <AdminTop />
            <Text style={globalStyles.largeSemiBoldText}>Remaining Points: {pointsQueue.length - queueIndex}</Text>
            <PointsQueue queueIndex={queueIndex} pointsQueue={pointsQueue} />
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