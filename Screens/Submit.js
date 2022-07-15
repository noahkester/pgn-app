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
} from "react-native";
import { AccountTop } from "./Account";
import globalStyles from "../Styles";
import DropDownPicker from "react-native-dropdown-picker";
import { LoginContext } from "../App";
import { useState, useEffect, createContext, useRef, useContext } from "react";
import colors from "../Colors";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import { db, auth, store } from "../firebase";
import { useNavigation } from "@react-navigation/native";
function EventsDropDown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const tempItems = useContext(LoginContext)[7];
  //TODO: filter out events after implementing submittedEvents array
  const [items, setItems] = useState(tempItems.current);
  const typeOfEvent = useContext(NewSubmission)[1];
  const eventName = useContext(NewSubmission)[2];
  const eventWeight = useContext(NewSubmission)[5];
  return (
    //integrate tickIconStyle to each event in items
    <DropDownPicker
      onSelectItem={(item) => {
        eventName.current = item.name;
        eventWeight.current = item.weight;
        typeOfEvent.current = item.type;
      }}
      placeholder="Select Event"
      placeholderStyle={[globalStyles.mediumBoldText, globalStyles.grayText]}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      listMode="SCROLLVIEW"
      itemSeparator={true}
      itemSeparatorStyle={{
        backgroundColor: colors.lightGray,
      }}
      searchable={true}
      searchTextInputStyle={{
        borderWidth: 0,
      }}
      searchContainerStyle={{
        borderBottomColor: colors.lightGray,
      }}
      searchPlaceholderTextColor={colors.gray}
      dropDownContainerStyle={{
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: colors.lightGray,
        shadowColor: "#BBBBBB",
        shadowOpacity: 0.25,
        shadowRadius: 10,
        width: "100%",
        height: 180,
      }}
      textStyle={globalStyles.mediumBoldText}
      style={{
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        shadowColor: "#BBBBBB",
        shadowOpacity: 0.25,
        shadowRadius: 10,
        borderWidth: 0,
      }}
    />
  );
}

function CameraShot() {
  const [image, setImage] = useState(require("../images/camera.png"));
  return (
    <TouchableOpacity
      style={[styles.imageUpload, { zIndex: -1 }]}
      onPress={async () => {
        var result = await ImagePicker.launchCameraAsync();
        //sort out
        if (!result.cancelled) {
          setImage(result);
          imageSrc.current = result.uri;
        }
      }}
    >
      <Image
        source={image}
        style={styles.cameraImage}
        resizeMode="contain"
      />
      <Text style={globalStyles.smallSemiBoldText}>Take a photo</Text>
    </TouchableOpacity>
  );
}
function ImageUpload() {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(require("../images/imageUpload.png"));
  const imageSrc = useContext(NewSubmission)[4];
  useEffect(() => {
    async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus === "granted");
      console.log("Requested");
    };
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      setImage(result);
      imageSrc.current = result.uri;
    }
  };
  return (
    <TouchableOpacity
      style={[styles.imageUpload, { zIndex: -1 }]}
      onPress={() => {
        pickImage();
      }}
    >
      <Image source={image} style={styles.cloudImage} resizeMode="contain" />
      <Text style={globalStyles.smallSemiBoldText}>Select image</Text>
    </TouchableOpacity>
  );
}
function ProofDescription() {
  const proofDesc = useContext(NewSubmission)[3];
  return (
    <View style={styles.descriptionLabel}>
      <Text style={globalStyles.smallSemiBoldText}>Proof Description:</Text>
      <View style={[globalStyles.cardContainer, styles.proofDescription]}>
        <TextInput
          style={globalStyles.smallSemiBoldText}
          //USE THIS if we want to implement textbox getting bigger, using multiline disables the return key
          // from exiting the keyboard
          //onContentSizeChange
          returnKeyType="done"
          onChangeText={(text) => {
            proofDesc.current = text;
          }}
          placeholder="Optional"
        />
      </View>
    </View>
  );
}

export function SubmitPoints(props) {
  const name = useContext(NewSubmission)[0];
  const typeOfEvent = useContext(NewSubmission)[1];
  const eventName = useContext(NewSubmission)[2];
  const proofDesc = useContext(NewSubmission)[3];
  const imageSrc = useContext(NewSubmission)[4];
  const eventWeight = useContext(NewSubmission)[5];

  const navigation = useNavigation();

  const uploadSubmissionImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = store.ref().child("points/" + imageName);
    return ref.put(blob);
  };


  return (
    <TouchableOpacity
      title={props.title}
      style={[
        globalStyles.universityColorFill,
        globalStyles.button,
        styles.submitButton,
      ]}
      onPress={() => {
        //console.log(user);
        db.collection("users")
          .doc(auth.currentUser.uid)
          .update({
            submittedPoints: firebase.firestore.FieldValue.arrayUnion({
              label: eventName.current,
              type: typeOfEvent.current,
              status: "waiting",
              weight: eventWeight.current,
            }),
          })
          .then(() => {
            console.log("SubmittedEvents should be updated");
            uploadSubmissionImage(imageSrc.current, auth.currentUser.uid + "_" + eventName.current);

            db.collection("points-queue")
            .doc(auth.currentUser.uid + "_" + eventName.current)
            .set({
              label: eventName.current,
              id: auth.currentUser.uid,
              name: name,
              type: typeOfEvent.current,
              proof: proofDesc.current,
              status: "waiting",
              weight: eventWeight.current,
              
            }).then(console.log("Event submission added to events"));
            ;
          });

        // console.log(name);
        // console.log(typeOfEvent);
        // console.log(eventName);
        // console.log(proofDesc);
        // console.log(imageSrc);
        navigation.navigate("Navigation");
      }}
    >
      <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>
        Submit
      </Text>
    </TouchableOpacity>
  );
}
const NewSubmission = createContext();

export function SubmitPage(props) {
  const name =
    useContext(LoginContext)[2].firstname +
    " " +
    useContext(LoginContext)[2].lastname;
  const typeOfEvent = useRef("");
  const eventName = useRef("");
  const proofDesc = useRef("");
  const imageSrc = useRef("");
  const eventWeight = useRef(0);

  return (
    <KeyboardAvoidingView enabled={true} behavior={"padding"}>
      <View style={styles.submitScreen}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.submitSubScreen}>
            <View style={styles.submitElement}>
              <AccountTop name="Submit Points" address="Navigation" />
            </View>
            <NewSubmission.Provider
              value={[
                name,
                typeOfEvent,
                eventName,
                proofDesc,
                imageSrc,
                eventWeight,
                ,
              ]}
            >
              <View style={styles.submitElement}>
                <View style={styles.submitEvents}>
                  <EventsDropDown />
                </View>
                <View style={[styles.imageOptions, { zIndex: -1 }]}>
                  <CameraShot />
                  <ImageUpload  type = "points/"/>
                </View>
                <ProofDescription />
              </View>
              <View style={styles.submitElement}>
                <SubmitPoints />
              </View>
            </NewSubmission.Provider>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
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
  submitElement: {
    width: "100%",
    alignItems: "center",
  },
  submitEvents: {
    width: "80%",
    flexDirection: "row",
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
  descriptionLabel: {
    width: "80%",
  },
  proofDescription: {
    marginTop: 20,
  },
  imageOptions: {
    paddingTop: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 100,
  },
});
