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
import Octicons from 'react-native-vector-icons/Octicons';

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
      }}
      placeholder="Select Event"
      placeholderStyle={{
        color: '#8E8E8E',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16
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
        backgroundColor: '#DBDBDB',
      }}
      searchable={true}
      searchTextInputStyle={{
        borderWidth: 1,
        borderColor: '#DBDBDB',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14
      }}
      searchPlaceholderTextColor={'#8E8E8E'}
      searchContainerStyle={{
        borderBottomColor: colors.lightGray,
      }}
      searchPlaceholder={'Search'}
      dropDownContainerStyle={{
        backgroundColor: "#FFFFFF",
        shadowOpacity: 0.25,
        shadowRadius: 10,
        width: "85%",
        border: 1,
        borderColor: '#DBDBDB',
      }}
      textStyle={{
        color: '#8E8E8E',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14
      }}
      style={{
        width: "85%",
        borderWidth: 1,
        borderColor: '#DBDBDB',
      }}
    />
  );
}
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
    </TouchableOpacity>
  );
}
function ProofDescription() {
  const submissionContext = useContext(SubmissionContext);
  const proofDesc = submissionContext.proofDesc;

  return (
    <View style={{ borderWidth: 1, width: '85%', borderRadius: 10, height: 50, justifyContent: 'center', paddingLeft: 10, borderColor: '#D8D8D8' }}>
      <TextInput
        style={globalStyles.smallSemiBoldText}
        //USE THIS if we want to implement textbox getting bigger, using multiline disables the return key
        // from exiting the keyboard
        //onContentSizeChange
        returnKeyType="done"
        onChangeText={(text) => {
          proofDesc.current = text;
        }}
        placeholder="Proof (optional)"
      />
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
        {
          borderRadius: 10,
          borderColor: '#E9C9B2',
          width: "90%",
          alignItems: "center",
          justifyContent: "center",
          height: 50
        }
      ]}
      onPress={() => {
        db.collection("users")
          .doc(auth.currentUser.uid)
          .update({
            submittedPoints: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid + "_" + eventLabel.current)
          })
          .then(() => {
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
    <KeyboardAvoidingView style={{ flex: 1 }} enabled={true} behavior={"padding"}>
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
          <View style={{ marginTop: 32, height: 100, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={{ width: 68, alignItems: 'center' }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Octicons
                name="chevron-left"
                color={'#262626'}
                size={42}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 36, marginRight: 10, backgroundColor: colors.universityColor + '40' }]}
              onPress={() => {
                navigation.navigate("SubmitAttendance");
              }}
            >
              <IonIcons
                name="md-barcode"
                color={colors.universityColor}
                size={40}
                style={{ marginLeft: 3 }}
              />
            </TouchableOpacity>
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
            <View style={{ width: "100%", alignItems: "center" }}>
              <Text style={{ marginTop: 60, fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#262626', marginBottom: 20 }}>Submit Point</Text>
              <View style={styles.submitEvents}>
                <EventsDropDown />
              </View>
              <View style={{ zIndex: -1, width: '85%', height: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#DBDBDB' }} />
              <View style={{ zIndex: -1, borderWidth: 1, width: '85%', borderRadius: 10, borderColor: '#DBDBDB', alignItems: 'center', justifyContent: 'center' }}>
                <ImageUpload type="points/" />
              </View>
              <View style={{ width: '85%', height: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#DBDBDB' }} />
              <ProofDescription />
            </View>
            <View style={{
              width: "100%",
              alignItems: "center",
              position: 'absolute',
              bottom: 60
            }}>
              <SubmitPoints />
            </View>
          </SubmissionProvider>
        </View>
      </TouchableWithoutFeedback>
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
