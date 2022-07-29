import { StyleSheet, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Text, Image, View, TextInput, } from "react-native";
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
import SubmissionContext, { SubmissionProvider } from "../utils/SubmissionContext"
import * as ImageManipulator from 'expo-image-manipulator';
import IonIcons from 'react-native-vector-icons/Ionicons';

function EventsDropDown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const loginContext = useContext(LoginContext);

  const [items, setItems] = useState([]);
  const submissionContext = useContext(SubmissionContext);

  const typeOfEvent = submissionContext.typeOfEvent;
  const eventLabel = submissionContext.eventLabel;
  const eventWeight = submissionContext.eventWeight;

  useEffect(() => {
    console.log('(submit) rendered');
    var tempItems = []
    var approvedOrWaiting = []
    db.collection("events")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tempItems.push(doc.data());
        });
        db.collection("points")
          .where("id", "==", loginContext.currentUser.id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              if ((data.status == "waiting" || data.status == "accepted"))
                approvedOrWaiting.push(data.label)
            });
            tempItems = tempItems.filter(
              (event) => {
                for (let i = 0; i < approvedOrWaiting.length; i++) {
                  if (event.label === approvedOrWaiting[i]) {
                    return false;
                  }
                }
                return true;
              }
            );
            setItems(tempItems);
          })
      })
  }, [])

  return (
    //integrate tickIconStyle to each event in items
    <DropDownPicker
      onSelectItem={(item) => {
        eventLabel.current = item.label;
        eventWeight.current = item.weight;
        typeOfEvent.current = item.type;
        console.log('selected ');
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

/*function CameraShot() {
  const [image, setImage] = useState(require("../images/camera.png"));
  return (
    <TouchableOpacity
      style={[styles.imageUpload, { zIndex: -1 }]}
      onPress={async () => {
        var result = await ImagePicker.launchCameraAsync();
        //TODO Camera stuff
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
}*/
function ImageUpload() {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(require("../images/imageUpload.png"));
  const submissionContext = useContext(SubmissionContext);
  const imageSrc = submissionContext.imageSrc;
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
      const resizedResult = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: 200 } }], // resize to width of 300 and preserve aspect ratio 
        { format: 'jpeg' },
      );
      setImage(resizedResult);
      imageSrc.current = resizedResult.uri;
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
  const submissionContext = useContext(SubmissionContext);
  const proofDesc = submissionContext.proofDesc;

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
  const submissionContext = useContext(SubmissionContext);

  const name = submissionContext.name;
  const typeOfEvent = submissionContext.typeOfEvent;
  const eventLabel = submissionContext.eventLabel;
  const proofDesc = submissionContext.proofDesc;
  const imageSrc = submissionContext.imageSrc;
  const eventWeight = submissionContext.eventWeight;

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
            submittedPoints: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid + "_" + eventLabel.current)
          })
          .then(() => {
            console.log("(Submit) Points Submission added to user array");
            uploadSubmissionImage(imageSrc.current, auth.currentUser.uid + "_" + eventLabel.current);

            db.collection("points")
              .doc(auth.currentUser.uid + "_" + eventLabel.current)
              .set({
                label: eventLabel.current,
                id: auth.currentUser.uid,
                name: name,
                type: typeOfEvent.current,
                proof: proofDesc.current,
                status: "waiting",
                weight: eventWeight.current,
              }).then(console.log("(Submit) Points Submission added to waiting queue"));
          });
        navigation.navigate("Navigation");
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
    loginContext.currentUser.firstname + " " + loginContext.currentUser.lastname;
  const typeOfEvent = useRef("");
  const eventLabel = useRef("");
  const proofDesc = useRef("");
  const imageSrc = useRef("");
  const eventWeight = useRef(0);
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView enabled={true} behavior={"padding"}>
      <View style={styles.submitScreen}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.submitSubScreen}>
            <View style={styles.submitElement}>
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                paddingLeft: 10,
              }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <Image
                    source={require("../images/back.png")}
                    style={{
                      width: 60,
                      height: 60,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text style={globalStyles.largeBoldText}>Submit</Text>
                <TouchableOpacity
                  style={[{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 30, marginRight: 10 }, globalStyles.universityColorFill]}
                  onPress={() => {
                    navigation.navigate("SubmitAttendance");
                  }}
                >
                  <IonIcons
                    name="md-barcode"
                    color={'#FFFFFF'}
                    size={42}
                    style={{ marginLeft: 3 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <SubmissionProvider
              value={{
                'name': name,
                'typeOfEvent': typeOfEvent,
                'eventLabel': eventLabel,
                'proofDesc': proofDesc,
                'imageSrc': imageSrc,
                'eventWeight': eventWeight
              }}
            >
              <View style={styles.submitElement}>
                <View style={styles.submitEvents}>
                  <EventsDropDown />
                </View>
                <View style={[styles.imageOptions, { zIndex: -1 }]}>
                  {/*<CameraShot />*/}
                  <ImageUpload type="points/" />
                </View>
                <ProofDescription />
              </View>
              <View style={styles.submitElement}>
                <SubmitPoints />
              </View>
            </SubmissionProvider>
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
