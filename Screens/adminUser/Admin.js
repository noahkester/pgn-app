import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as firebase from "firebase";
import globalStyles from "../../styles/Styles";
import { db, store } from "../../utils/firebase";
var allSettled = require("promise.allsettled");

function SettingsButton() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <TouchableOpacity
        style={[
          {
            width: 60,
            height: 60,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 36,
            marginRight: 10,
            backgroundColor: '#C57035' + "40",
          },
        ]}
        onPress={() => {
          navigation.navigate("AddCode");
        }}
      >
        <IonIcons
          name="md-barcode"
          color={'#C57035'}
          size={40}
          style={{ marginLeft: 3 }}
        />
      </TouchableOpacity>
      <Image
        source={require("../../images/pgn.png")}
        resizeMode="cover"
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
}
function AdminTop(props) {
  return (
    <View
      style={{
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
        width: "100%",
        borderBottomWidth: 1,
        borderColor: "#D8D8D8",
      }}
    >
      <SettingsButton />
    </View>
  );
}
function AcceptButton(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.index < props.max) {
          props.setQueueIndex(props.index + 1);
          props.acceptPoint();
        }
      }}
      style={{ width: 100 }}
    >
      <Image
        source={require("../../images/accept.png")}
        style={{ height: '100%', width: '100%' }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}
function RejectButton(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.index < props.max) {
          props.setQueueIndex(props.index + 1);
          props.rejectPoint();
        }
      }}
      style={{ width: 100 }}
    >
      <Image
        source={require("../../images/reject.png")}
        style={{ height: '100%', width: '100%' }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

function AdminBottom(props) {
  const acceptPoint = () => {
    // First, update the record from the points queue
    db.collection("points")
      .doc(props.pointData.title)
      .update({ status: "accepted" })
      // .then(() => {
      //   console.log("(points) Updated points status to accepted");
      // })
      // .catch((error) => {
      //   console.log(props.pointData.title);
      //   console.log("(points) Error updating points status");
      // });
    db.collection("users")
      .doc(props.pointData.id)
      .get()
      .then((doc) => {
        // Next update the status value in the submitted points and increment the point value
        const data = doc.data();
        switch (props.pointData.type) {
          case "Philanthropy":
            db.collection("users")
              .doc(props.pointData.id)
              .update({
                philanthropyPoints:
                  data.philanthropyPoints + props.pointData.weight,
              });
            break;
          case "Social":
            db.collection("users")
              .doc(props.pointData.id)
              .update({
                socialPoints: data.socialPoints + props.pointData.weight,
              });
            break;
          case "Professional":
            db.collection("users")
              .doc(props.pointData.id)
              .update({
                professionalPoints:
                  data.professionalPoints + props.pointData.weight,
              });
            break;
          case "Interview":
            db.collection("users")
              .doc(props.pointData.id)
              .update({
                activeInterviews:
                  data.activeInterviews + props.pointData.weight,
              });
            break;
          case 'Excuse':
            db.collection("users")
              .doc(props.pointData.id)
              .update({
                attendance:
                  firebase.firestore.FieldValue.increment(1),
              });
            db.collection("chapter-meetings")
              .doc(props.pointData.code)
              .update({
                attendees: firebase.firestore.FieldValue.arrayUnion(props.pointData.id),
                submittedExcuse: firebase.firestore.FieldValue.arrayRemove(props.pointData.id)
              });
            break;
          // default:
          //   console.log(
          //     "(accept-point switch statement) no match for " +
          //     props.pointData.type
          //   );
          //   break;
        }
      });
  };
  const rejectPoint = () => {
    db.collection("points")
      .doc(props.pointData.title)
      .update({ status: "rejected" })
      // .then(() => {
      //   console.log("(points) Updated points status to rejected");
      // })
      // .catch((error) => {
      //   console.log("(points) Error updating points status");
      //   console.log("here");
      // });
    if (props.pointData.type === 'Excuse') {
      db.collection("chapter-meetings")
        .doc(props.pointData.code)
        .update({
          submittedExcuse: firebase.firestore.FieldValue.arrayRemove(props.pointData.id)
        });
    }
  };
  return (
    <View
      style={{
        height: '14%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "#FAFAFA",
        position: "absolute",
        width: "100%",
        bottom: 0,
        paddingBottom: 10
      }}
    >

      <RejectButton
        rejectPoint={rejectPoint}
        setQueueIndex={props.setQueueIndex}
        index={props.index}
        max={props.max}
      />
      <AcceptButton
        acceptPoint={acceptPoint}
        setQueueIndex={props.setQueueIndex}
        index={props.index}
        max={props.max}
      />
    </View>
  );
}
function PointSheet(props) {
  if (Object.keys(props.data).length === 0) {
    return <View></View>;
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={globalStyles.largeSemiBoldText}>{props.data.label}</Text>
      <Text
        style={{
          fontFamily: "Poppins_500Medium",
          color: "#262626",
          fontSize: 16,
        }}
      >
        {props.data.name}
      </Text>
      <Image
        source={
          !props.image
            ? require("../../images/unknown-image.png")
            : { uri: props.image }
        }
        resizeMode="contain"
        style={{
          height: '60%',
          width: 240,
        }}
      />
      <Text
        style={{
          fontFamily: "Poppins_500Medium",
          color: "#262626",
          fontSize: 16,
        }}
      >
        {"Proof: " + props.data.proof}
      </Text>
    </View>
  );
}

export function AdminPage(props) {
  const [queue, setQueue] = useState([]);
  const [urlMap, setUrlMap] = useState({});
  const [queueIndex, setQueueIndex] = useState(0);
  const [currentPoint, setCurrentPoint] = useState({});
  const [currentImage, setCurrentImage] = useState("");
  const [dummyRender, setDummyRender] = useState(false);
  //fetch data
  useEffect(() => {
    var tempQueue = [];
    db.collection("points")
      .where("status", "==", "waiting")
      .get()
      .then(async (querySnapshot) => {
        var promises = [];
        var tempUrlMap = {};
        querySnapshot.forEach(async (doc) => {
          const data = doc.data();
          tempQueue.push(data);
          const docId = data.id + "_" + data.label;
          const promise = store
            .ref(`/points/${docId}`) //name in storage in firebase console
            .getDownloadURL()
            .then((url) => {
              //console.log("(points) Successfully got point image");
              tempUrlMap[docId] = url;
              setDummyRender(true);
            })
            .catch((e) => {
              tempUrlQueue.push("");
              //console.log("(points) Errors while getting point image");
            });
          promises.push(promise);
        });
        allSettled(promises).then((results) => {
          setUrlMap(tempUrlMap);
        });
        setQueue(tempQueue);
      });
  }, []);
  useEffect(() => {
    if (queue.length > 0 && queueIndex < queue.length) {
      setCurrentPoint(queue[queueIndex]);
      setCurrentImage(
        urlMap[queue[queueIndex].id + "_" + queue[queueIndex].label]
      );
    }
  }, [urlMap, queueIndex, dummyRender]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FAFAFA",
      }}
    >
      <AdminTop />
      {/*<Text style={[globalStyles.largeSemiBoldText]}>Remaining Points: {queue.length - queueIndex}</Text>*/}
      <View
        style={{
          width: "90%",
          height: '50%',
          borderRadius: 15,
          backgroundColor: "#FFFFFF",
          borderWidth: 1,
          borderColor: "#DBDBDB",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 100,
        }}
      >
        {queueIndex == queue.length ? (
          <Image
            source={require("../../images/adminparty.png")}
            style={{
              width: 200,
              height: 200,
            }}
            resizeMode="contain"
          />
        ) : (
          <PointSheet data={currentPoint} image={currentImage} />
        )}
      </View>
      {queueIndex !== queue.length ? (
        <AdminBottom
          index={queueIndex}
          setQueueIndex={setQueueIndex}
          max={queue.length}
          pointData={currentPoint}
        />
      ) : null}
    </View>
  );
}
