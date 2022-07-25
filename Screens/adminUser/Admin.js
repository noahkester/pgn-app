import { StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Text, View } from "react-native";
import { AccountTop } from "../Account";
import { useNavigation } from '@react-navigation/native';
import globalStyles from "../../styles/Styles"
import { PGNImage } from "../Tabs"
import { db, store } from "../../utils/firebase";
import React, { useEffect, useState } from "react";
import UrlContext, { UrlProvider } from "../../utils/UrlContext";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcons from 'react-native-vector-icons/Ionicons';
var allSettled = require('promise.allsettled');

function SettingsButton() {
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => navigation.navigate("AdminEvents")}>
                <View style={[styles.settingsButton, {}]}>
                    <View style={[{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 30 }, globalStyles.universityColorFill]}>
                        <FontAwesome5Icon
                            name="calendar-day"
                            color={'#FFFFFF'}
                            size={34}
                        />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("AddCode")}
                style={{ marginLeft: 16 }}
            >
                <View style={[styles.settingsButton, {}]}>
                    <View style={[{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 30 }, globalStyles.universityColorFill]}>
                        <IonIcons
                            name="md-barcode"
                            color={'#FFFFFF'}
                            size={42}
                            style={{ marginLeft: 3 }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}
function AdminTop(props) {
    return (
        <View style={{
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
        }}>
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
                    db.collection('users').doc(props.pointData.id).update({ philanthropyPoints: data.philanthropyPoints + props.pointData.weight });
                    break;
                case 'Social':
                    db.collection('users').doc(props.pointData.id).update({ socialPoints: data.socialPoints + props.pointData.weight });
                    break;
                case 'Professional':
                    db.collection('users').doc(props.pointData.id).update({ professionalPoints: data.professionalPoints + props.pointData.weight });
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
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text style={globalStyles.largeSemiBoldText}>{props.data.label}</Text>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16 }}>{props.data.name}</Text>
            <Image
                source={(props.image == '') ? require("../../images/unknown-image.png") : { uri: props.image }}
                resizeMode="contain"
                style={{
                    height: 240,
                    width: 240
                }}
            />
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16 }}>{'Proof: ' + props.data.proof}</Text>
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
                var promises = [];
                var tempUrlMap = {};
                querySnapshot.forEach(async (doc) => {
                    const data = doc.data();
                    tempQueue.push(data);
                    const docId = data.id + '_' + data.label;
                    const promise = store
                        .ref(`/points/${docId}`) //name in storage in firebase console
                        .getDownloadURL()
                        .then((url) => {
                            console.log("(point-queue) Successfully got point image");
                            tempUrlMap[docId] = url;
                            setDummyRender(true);
                        })
                        .catch((e) => {
                            tempUrlQueue.push('');
                            console.log("(point-queue) Errors while getting point image");
                        });
                    promises.push(promise);
                })
                allSettled(promises).then((results) => {
                    results.forEach((result) => {
                        console.log("(people.js) Promise allSettled");
                    });
                    setUrlMap(tempUrlMap);
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
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white"
        }}>
            <AdminTop />
            <Text style={[globalStyles.largeSemiBoldText, { position: 'absolute', top: 180 }]}>Remaining Points: {queue.length - queueIndex}</Text>
            <View style={{
                width: '90%', height: 400, borderRadius: 15,
                backgroundColor: '#FFFFFF',
                shadowColor: "#BBBBBB",
                shadowOpacity: 0.5,
                shadowRadius: 16,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {(queueIndex == queue.length) ?
                    <Image
                        source={require("../../images/adminparty.png")}
                        style={{
                            width: 200,
                            height: 200,
                        }}
                        resizeMode="contain"
                    />
                    :
                    <PointSheet
                        data={currentPoint}
                        image={currentImage}
                    />
                }
            </View>
            {(queueIndex !== queue.length) ?
                <AdminBottom
                    index={queueIndex}
                    setQueueIndex={setQueueIndex}
                    max={queue.length}
                    pointData={currentPoint}
                /> : null
            }
        </View>
    )
}
const styles = StyleSheet.create({
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