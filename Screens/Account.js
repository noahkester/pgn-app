import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  View,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import globalStyles from "../Styles";
import { useNavigation } from "@react-navigation/native";
import colors from "webpack-dev-server/lib/utils/colors";
import { auth, db, store } from "../firebase";
import { LoginContext } from "../App";
import { useContext } from "react";
import ImageCarousel from "./ImageCarousel";

export function AccountTop(props) {
  const navigation = useNavigation();
  const rightElement = props.rightElement ? (
    <TouchableOpacity onPress={() => navigation.navigate("AccountImageUpload")}>
      <Image
        source={require("../images/imageUpload.png")}
        style={styles.imageLogo}
        resizeMode="contain"
      />
    </TouchableOpacity>
  ) : (
    <View style={styles.invisiableElement}></View>
  );

  return (
    <View style={styles.accountTop}>
      <TouchableOpacity onPress={() => navigation.navigate(props.address)}>
        <Image
          source={require("../images/back.png")}
          style={styles.accountLogo}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={globalStyles.largeBoldText}>{props.name}</Text>
      {rightElement}
    </View>
  );
}

function Profile(props) {
  return (
    <ImageCarousel
      data={[
        { uri: props.profileUrlProfessional },
        { uri: props.profileUrlSocial },
        { uri: props.profileUrlChild },
      ]}
    />
  );
}

function Description(props) {
  var quote = props.description;
  if (quote != "") {
    quote = '"' + quote + '"';
  }
  return (
    <View style={[globalStyles.cardContainer, styles.accountDescription]}>
      <TextInput
        style={globalStyles.smallSemiBoldText}
        multiline={true}
        placeholder="Quote"
      >
        {quote}
      </TextInput>
    </View>
  );
}
function Chapter(props) {
  return (
    <View style={{ paddingTop: 60 }}>
      <Text style={[globalStyles.smallSemiBoldText]}>{props.chapter}</Text>
    </View>
  );
}
function AccountInput(props) {
  return (
    <View style={styles.accountInput}>
      <Text style={globalStyles.smallSemiBoldText}>{props.label}</Text>
      <TextInput
        style={[
          styles.accountTextInput,
          globalStyles.cardContainer,
          globalStyles.smallSemiBoldText,
        ]}
      >
        {props.input}
      </TextInput>
    </View>
  );
}
function AcademicInfo(props) {
  return (
    <View style={styles.academicSection}>
      <AccountInput label="Major:" input={props.major} />
      <AccountInput label="Minor:" input={props.minor} />
    </View>
  );
}
function ContactInfo(props) {
  return (
    <View style={styles.academicSection}>
      <AccountInput label="Email:" input={props.email} />
      <AccountInput label="Phone:" input={props.number} />
      <AccountInput label="LinkedIn:" input={props.linkedin} />
    </View>
  );
}
function SaveButton(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Navigation")}
      title={"Save and Exit"}
      style={[
        globalStyles.universityColorFill,
        globalStyles.button,
        styles.saveButton,
      ]}
    >
      <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>
        {"Save and Exit"}
      </Text>
    </TouchableOpacity>
  );
}
function SignOutButton(props) {
  const [,setSignIn] = useContext(LoginContext);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        auth
          .signOut()
          .then(() => {
            setSignIn(false);
            navigation.navigate("Router", {screen: "LoginSignup"});
            console.log("(Account) Signed out. Navigating to Start");
          })
          .catch((error) => console.log(error.message));
      }}
      title={"Signout"}
      style={[
        globalStyles.universityColorFill,
        globalStyles.button,
        styles.signoutButton,
      ]}
    >
      <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>
        {"Sign out"}
      </Text>
    </TouchableOpacity>
  );
}
function PledgeClass(props) {
  return (
    <View style={styles.pledgeClass}>
      <Text style={globalStyles.smallSemiBoldText}>
        {"PC " + props.pledgeClass}
      </Text>
      <Text style={globalStyles.smallSemiBoldText}>
        {"Status: " + props.status}
      </Text>
    </View>
  );
}

export function AccountPage() {
  const [name, setName] = useState("Firstname, Lastname");
  const [profileUrlProfessional, setProfileUrlProfessional] = useState("");
  const [profileUrlSocial, setProfileUrlSocial] = useState("");
  const [profileUrlChild, setProfileUrlChild] = useState("");
  const [bio, setBio] = useState("");
  const [pledgeClass, setPledgeClass] = useState("");
  const [status, setStatus] = useState("");
  const [major, setMajor] = useState("");
  const [minor, setMinor] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [phone, setPhone] = useState("");
  const [chapter, setChapter] = useState("");
  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((doc) => {
        const data = doc.data();
        setName(data.firstname + " " + data.lastname);
        setBio(data.bio);
        setPledgeClass(data.pledgeClass);
        setStatus(data.status);
        setMajor(data.major);
        setMinor(data.minor);
        setEmail(data.email);
        setLinkedin(data.linkedin);
        setPhone(data.phone);
        setChapter(data.chapter);
      })
      .catch("(Account) Error could not read document");
    store
      .ref(`/profile-pictures/${auth.currentUser.uid}_professional`) //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setProfileUrlProfessional(url);
      })
      .catch((e) =>
        console.log("(Tabs) Errors while getting Profile Picture ", e)
      );
    store
      .ref(`/profile-pictures/${auth.currentUser.uid}_social`) //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setProfileUrlSocial(url);
      })
      .catch((e) =>
        console.log("(Tabs) Errors while getting Profile Picture ", e)
      );
    store
      .ref(`/profile-pictures/${auth.currentUser.uid}_child`) //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setProfileUrlChild(url);
      })
      .catch((e) =>
        console.log("(Tabs) Errors while getting Profile Picture ", e)
      );
  }, []);
  return (
    <View style={styles.createAccountScreen}>
      <View style={styles.navBar}>
        <View></View>
        <AccountTop name={name} address="Navigation" rightElement={true} />
      </View>
      <ScrollView style={styles.accountInfo}>
        <View style={styles.innerScroll}>
          <Profile
            profileUrlProfessional={profileUrlProfessional}
            profileUrlSocial={profileUrlSocial}
            profileUrlChild={profileUrlChild}
          />
          <Description description={bio} />
          <Chapter chapter={chapter} />
          <PledgeClass pledgeClass={pledgeClass} status={status} />
          <AcademicInfo major={major} minor={minor} />
          <ContactInfo email={email} number={phone} linkedin={linkedin} />
          <SaveButton />
          <SignOutButton />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  navBar: {
    height: "15%",
    justifyContent: "space-between",
    paddingBottom: 10,
    width: "100%",
  },
  createAccountScreen: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  accountInfo: {
    width: "100%",
  },
  innerScroll: {
    alignItems: "center",
  },
  createAccountSubScreen: {
    height: "85%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInputContainer: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 30,
    width: "70%",
  },
  section: {
    height: 20,
  },
  accountLogo: {
    width: 60,
    height: 60,
  },
  imageLogo: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  accountTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 10,
  },
  largeProfile: {
    marginTop: 15,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  accountDescription: {
    marginTop: 20,
    width: "80%",
  },
  saveButton: {
    marginTop: 40,
  },
  academicSection: {
    marginTop: 20,
    width: "80%",
  },
  accountInput: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  accountTextInput: {
    width: "70%",
  },
  invisiableElement: {
    width: 60,
  },
  pledgeClass: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    paddingTop: 20,
  },
  signoutButton: {
    marginTop: 10,
    marginBottom: 50,
  },
});
