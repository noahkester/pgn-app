import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Image,
  View,
  TextInput,
  Alert
} from "react-native";
import { AccountTop } from "./Account";
import globalStyles from "../styles/Styles";
import DropDownPicker from "react-native-dropdown-picker";
import LoginContext from "../utils/LoginContext";
import { useState, useEffect, createContext, useRef, useContext } from "react";
import colors from "../styles/Colors";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import { db, auth, store } from "../utils/firebase";
import { useNavigation } from "@react-navigation/native";
import SubmissionContext, {
  SubmissionProvider,
} from "../utils/SubmissionContext";
import * as ImageManipulator from "expo-image-manipulator";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

function EventsDropDown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const loginContext = useContext(LoginContext);
  const [items, setItems] = useState([]);
  const submissionContext = useContext(SubmissionContext);

  const typeOfEvent = submissionContext.typeOfEvent;
  const eventLabel = submissionContext.eventLabel;
  const eventWeight = submissionContext.eventWeight;
  const repeatable = submissionContext.repeatable;

  useEffect(() => {
    //console.log("(submit) rendered");
    var tempItems = loginContext.events.allEvents;
    var approvedOrWaiting = [];

    db.collection("points")
      .where("id", "==", loginContext.currentUser.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.status == "waiting" || data.status == "accepted")
            approvedOrWaiting.push(data.label);
        });
        tempItems = tempItems.filter((event) => {
          for (let i = 0; i < approvedOrWaiting.length; i++) {
            if (event.label === approvedOrWaiting[i] && !event.repeatable) {
              return false;
            }
          }
          return true;
        });
        setItems(tempItems);
      });
  }, []);

  return (
    //integrate tickIconStyle to each event in items
    <DropDownPicker
      onSelectItem={(item) => {
        eventLabel.current = item.label;
        eventWeight.current = item.weight;
        typeOfEvent.current = item.type;
        repeatable.current = item.repeatable;
        //console.log(item.label + " is " + repeatable.current);
      }}
      placeholder="Select Event"
      placeholderStyle={{
        color: "#8E8E8E",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
      }}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      listMode="SCROLLVIEW"
      itemSeparator={true}
      itemSeparatorStyle={{
        backgroundColor: "#DBDBDB",
      }}
      searchable={true}
      searchTextInputStyle={{
        borderWidth: 1,
        borderColor: "#DBDBDB",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 14,
      }}
      searchPlaceholderTextColor={"#8E8E8E"}
      searchContainerStyle={{
        borderBottomColor: colors.lightGray,
      }}
      searchPlaceholder={"Search"}
      dropDownContainerStyle={{
        backgroundColor: "#FFFFFF",
        shadowOpacity: 0.25,
        shadowRadius: 10,
        width: "85%",
        border: 1,
        borderColor: "#DBDBDB",
      }}
      textStyle={{
        color: "#8E8E8E",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 14,
      }}
      style={{
        width: "85%",
        borderWidth: 1,
        borderColor: "#DBDBDB",
      }}
    />
  );
}
function ImageUpload() {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState("");
  const submissionContext = useContext(SubmissionContext);
  var proofOrPhoto = submissionContext.proofOrPhoto;
  const imageSrc = submissionContext.imageSrc;
  useEffect(() => {
    async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus === "granted");
      //console.log("Requested");
    };
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      const resizedResult = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: 200 } }], // resize to width of 300 and preserve aspect ratio
        { format: "jpeg" }
      );
      proofOrPhoto.current = true;
      setImage(resizedResult);
      imageSrc.current = resizedResult.uri;
    }
  };
  return (
    <TouchableOpacity
      style={{
        zIndex: -1,
        width: 140,
        height: 160,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => {
        pickImage();
      }}
    >
      {image === "" ? (
        <MaterialIcons name="add" color={"#262626"} size={60} />
      ) : (
        <Image source={image} style={styles.cloudImage} resizeMode="contain" />
      )}
    </TouchableOpacity>
  );
}
function ProofDescription() {
  const submissionContext = useContext(SubmissionContext);
  const proofDesc = submissionContext.proofDesc;
  var proofOrPhoto = submissionContext.proofOrPhoto;
  return (
    <View
      style={{
        borderWidth: 1,
        width: "85%",
        borderRadius: 10,
        height: 50,
        justifyContent: "center",
        paddingLeft: 10,
        borderColor: "#D8D8D8",
        backgroundColor: "#FFFFFF",
      }}
    >
      <TextInput
        style={globalStyles.smallSemiBoldText}
        //USE THIS if we want to implement textbox getting bigger, using multiline disables the return key
        // from exiting the keyboard
        //onContentSizeChange
        returnKeyType="done"
          onChangeText={(text) => {
          proofDesc.current = text;
          if (text !== "") {
            proofOrPhoto.current = true;
          }else{
            proofOrPhoto.current = false;
          }
        }}
        placeholder="Proof (optional)"
      />
    </View>
  );
}

export function SubmitPoints(props) {
  const submissionContext = useContext(SubmissionContext);
  const proofOrPhoto = submissionContext.proofOrPhoto;
  const name = submissionContext.name;
  const typeOfEvent = submissionContext.typeOfEvent;
  const eventLabel = submissionContext.eventLabel;
  const proofDesc = submissionContext.proofDesc;
  const imageSrc = submissionContext.imageSrc;
  const eventWeight = submissionContext.eventWeight;
  const repeatable = submissionContext.repeatable;
  const loginContext = useContext(LoginContext);
  const navigation = useNavigation();

  const uploadSubmissionImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = store
      .ref()
      .child("points/" + imageName);
    return ref.put(blob);
  };

  return (
    <TouchableOpacity
      title={props.title}
      style={
        {
          borderRadius: 10,
          borderColor: "#E9C9B2",
          width: "90%",
          alignItems: "center",
          justifyContent: "center",
          height: 50,
          backgroundColor: loginContext.color,
        }
      }
      onPress={() => {
        if (proofOrPhoto.current && eventLabel.current !== "") {
          const suffix = repeatable.current ? Math.floor(Math.random() * 1000000000) : "";
          db.collection("users")
            .doc(auth.currentUser.uid)
            .update({
              submittedPoints: firebase.firestore.FieldValue.arrayUnion(
                auth.currentUser.uid + "_" + eventLabel.current + suffix
              ),
            })
            .then(() => {
              //console.log('repeatable is ' + repeatable.current);
              uploadSubmissionImage(
                imageSrc.current,
                auth.currentUser.uid + "_" + eventLabel.current + suffix
              );

              db.collection("points")
                .doc(auth.currentUser.uid + "_" + eventLabel.current + suffix)
                .set({
                  label: eventLabel.current,
                  id: auth.currentUser.uid,
                  name: name,
                  type: typeOfEvent.current,
                  proof: proofDesc.current,
                  status: "waiting",
                  weight: eventWeight.current,
                  title: auth.currentUser.uid + "_" + eventLabel.current + suffix
                })
                // .then(
                //   console.log(
                //     "(Submit) Points Submission added to waiting queue"
                //   )
                // );
            });
          navigation.navigate("Navigation");
        } else {
          Alert.alert("Event + Photo or Proof is required!");
        }
      }}
    >
      <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>
        Submit Point
      </Text>
    </TouchableOpacity>
  );
}
const NewSubmission = createContext();

export function SubmitPage(props) {
  const loginContext = useContext(LoginContext);
  const name =
    loginContext.currentUser.firstname +
    " " +
    loginContext.currentUser.lastname;
  const typeOfEvent = useRef("");
  const eventLabel = useRef("");
  const proofDesc = useRef("");
  const imageSrc = useRef("");
  const eventWeight = useRef(0);
  var proofOrPhoto = useRef(false);
  const repeatable = useRef(false);
  const navigation = useNavigation();

  return (

    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
        <View
          style={{
            marginTop: 32,
            height: 100,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{ width: 68, alignItems: "center" }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Octicons name="chevron-left" color={"#262626"} size={42} />
          </TouchableOpacity>
        </View>
        <SubmissionProvider
          value={{
            name: name,
            typeOfEvent: typeOfEvent,
            eventLabel: eventLabel,
            proofDesc: proofDesc,
            imageSrc: imageSrc,
            eventWeight: eventWeight,
            repeatable: repeatable,
            proofOrPhoto: proofOrPhoto,
          }}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: "100%", alignItems: "center", marginBottom: 180 }}>
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 20,
                  color: "#262626",
                  marginBottom: 20,
                }}
              >
                Submit Point
              </Text>
              <View style={{ marginBottom: 20 }}>
                <EventsDropDown />
              </View>

              <View
                style={{
                  zIndex: -1,
                  borderWidth: 1,
                  width: "85%",
                  borderRadius: 10,
                  borderColor: "#DBDBDB",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <ImageUpload type="points/" />
              </View>
              <View
                style={{ width: "100%", alignItems: "center", marginTop: 20 }}
              >
                <ProofDescription />
              </View>
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                position: "absolute",
                bottom: 60,
              }}
            >
              <SubmitPoints />
            </View>
          </View>
        </SubmissionProvider>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  submitScreen: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  submitSubScreen: {
    width: "100%",
    height: "85%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  submitDropDown: {
    width: "80%",
    borderWidth: 1,
  },
  hiddenDropDown: {
    visibility: "hidden",
  },
  cloudImage: {
    width: 100,
    height: 140,
  },
  cameraImage: {
    width: 100,
    height: 140,
  },
  imageUpload: {
    width: 140,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  proofDescription: {
    marginTop: 20,
  },
});
