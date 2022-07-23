import { StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Text, View } from "react-native";
import { AccountTop } from "../Account";
import { useNavigation } from '@react-navigation/native';
import globalStyles from "../../styles/Styles"
import { PGNImage } from "../Tabs"
import { db, store } from "../../utils/firebase";
import React, { useEffect, useState } from "react";
import UrlContext, { UrlProvider } from "../../utils/UrlContext";

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
        <TouchableOpacity onPress={() => {
            if (props.index < props.max) {
                props.setQueueIndex(props.index + 1)
                props.acceptPoint();
            }
        }}>
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
        <TouchableOpacity onPress={() => {
            if (props.index < props.max) {
                props.setQueueIndex(props.index + 1);
                props.rejectPoint();
            }
        }}>
            <Image
                source={require("../../images/reject.png")}
                style={styles.bottomButton}
                resizeMode="contain"
            />
        </TouchableOpacity>
    )
}

function AdminBottom(props) {
    const acceptPoint = () => {
        // First, delete the record from the points queue
        db.collection("points-queue").doc(props.pointData.id + '_' + props.pointData.label).delete().then(() => {
            console.log("(points-queue) Deleted document");
        }).catch((error) => {
            console.log("(points-queue) Error deleting document");
        });

        // Next update the status value in the submitted points and increment the point value
        db.collection('users').doc(props.pointData.id).get().then((doc) => {
            const data = doc.data();
            const submittedPoints = data.submittedPoints;
            for (let i = 0; i < submittedPoints.length; i++) {
                if (submittedPoints[i].label === props.pointData.label) {
                    submittedPoints[i].status = 'accepted';
                    break;
                }
            }
            switch (props.pointData.type) {
                case 'Philanthropy':
                    db.collection('users').doc(props.pointData.id).update({ philanthropyPoints: data.philanthropyPoints + 1 });
                    break;
                case 'Social':
                    db.collection('users').doc(props.pointData.id).update({ socialPoints: data.socialPoints + 1 });
                    break;
                case 'Professional':
                    db.collection('users').doc(props.pointData.id).update({ professionalPoints: data.professionalPoints + 1 });
                    break;
                default:
                    console.log('(accept-point switch statement) no match for ' + props.pointData.type);
                    break;
            }
            db.collection('users').doc(props.pointData.id).update({ submittedPoints: submittedPoints });
        });
    }
    const rejectPoint = () => {
        db.collection("points-queue").doc(props.pointData.id + '_' + props.pointData.label).delete().then(() => {
            console.log("(points-queue) Deleted document");
        }).catch((error) => {
            console.log("(points-queue) Error deleting document");
        });
        db.collection('users').doc(props.pointData.id).get().then((doc) => {
            const data = doc.data();
            const submittedPoints = data.submittedPoints;
            for (let i = 0; i < submittedPoints.length; i++) {
                if (submittedPoints[i].label === props.pointData.label) {
                    submittedPoints[i].status = 'rejected';
                    break;
                }
            }
            db.collection('users').doc(props.pointData.id).update({ submittedPoints: submittedPoints });
        });
    }
    return (
        <View style={styles.adminBottom}>
            <RejectButton rejectPoint={rejectPoint} setQueueIndex={props.setQueueIndex} index={props.index} max={props.max} />
            <AcceptButton acceptPoint={acceptPoint} setQueueIndex={props.setQueueIndex} index={props.index} max={props.max} />
        </View>
    )
}
function PointSheet(props) {
    if (Object.keys(props.data).length === 0) {
        return (<View></View>)
    }
    return (
        <View style={styles.pointSheet}>
            <View style={styles.space}></View>
            <View style={styles.pointTextLine}>
                <Text style={globalStyles.largeSemiBoldText}>{props.data.name}</Text>
            </View>
            <View style={styles.pointTextLine}>
                <Text style={globalStyles.largeSemiBoldText}>{props.data.label}</Text>
            </View>
            <View style={styles.space}></View>
            <Image
                source={(props.image == '') ? require("../../images/unknown-image.png") : { uri: props.image }}
                resizeMode="contain"
                style={styles.pointImage}
            />
            <Text style={globalStyles.largeSemiBoldText}>{props.data.proof}</Text>
        </View>
    )
}

export function AdminPage(props) {
    const [queue, setQueue] = useState([]);
    const [urlMap, setUrlMap] = useState({});
    const [queueIndex, setQueueIndex] = useState(0);
    const [currentPoint, setCurrentPoint] = useState({});
    const [currentImage, setCurrentImage] = useState('');
    const [dummyRender, setDummyRender] = useState(false);
    //fetch data
    useEffect(() => {
        var tempQueue = [];
        db.collection("points-queue")
            .get()
            .then(async (querySnapshot) => {
                querySnapshot.forEach(async (doc) => {
                    const data = doc.data();
                    tempQueue.push(data);
                    const docId = data.id + '_' + data.label;
                    store
                        .ref(`/points/${docId}`) //name in storage in firebase console
                        .getDownloadURL()
                        .then((url) => {
                            console.log("(point-queue) Successfully got point image");
                            urlMap[docId] = url;
                            setDummyRender(true);
                        })
                        .catch((e) => {
                            tempUrlQueue.push('');
                            console.log("(point-queue) Errors while getting point image");
                        });
                })
                setQueue(tempQueue);
            })
    }, []);
    useEffect(() => {
        if (queue.length > 0 && queueIndex < queue.length) {
            setCurrentPoint(queue[queueIndex]);
            setCurrentImage(urlMap[queue[queueIndex].id + '_' + queue[queueIndex].label]);
        }
    }, [urlMap, queueIndex, dummyRender])

    return (
        <View style={styles.adminScreen}>
            <AdminTop />
            <Text style={globalStyles.largeSemiBoldText}>Remaining Points: {queue.length - queueIndex}</Text>
            <View style={styles.pointQueue}>
                {(queueIndex == queue.length) ?
                    <DoneImage /> :
                    <PointSheet
                        data={currentPoint}
                        image={currentImage}
                    />
                }
            </View>
            <AdminBottom
                index={queueIndex}
                setQueueIndex={setQueueIndex}
                max={queue.length}
                pointData={currentPoint}
            />
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