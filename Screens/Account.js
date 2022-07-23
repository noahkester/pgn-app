import { StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Text, View, Dimensions, ImageBackground, } from "react-native";
import React, { useRef, useEffect, useState, useContext } from "react";
import globalStyles from "../styles/Styles";
import { useNavigation } from "@react-navigation/native";
import colors from "webpack-dev-server/lib/utils/colors";
import { auth, db, store } from "../utils/firebase";
import { findRoleBorder, findRoleColor } from "../styles/Colors"
import LoginContext from '../utils/LoginContext';

import ImageCarousel from "./components/ImageCarousel";
import UrlContext from "../utils/UrlContext";

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
    <View style={{ width: 60 }} />
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
  const urlContext = useContext(UrlContext);
  return (
    <ImageCarousel
      data={[
        { uri: urlContext.professionalUrl },
        { uri: urlContext.socialUrl },
        { uri: urlContext.funnyUrl },
      ]}
    />
  );
}

function Description(props) {
  return (
    <View style={[globalStyles.cardContainer, styles.accountDescription]}>
      <TextInput
        style={globalStyles.smallSemiBoldText}
        multiline={true}
        placeholder="Quote"
        onChangeText={(text) => {
          props.setValue(text.substring(1, text.length - 1));
        }}
        defaultValue={"\"" + props.description + "\""}
      />

    </View>
  );
}
function Chapter(props) {
  return (
    <View style={{ paddingTop: 60 }}>
      <Text style={[globalStyles.mediumSemiBoldText]}>{props.chapter}</Text>
    </View>
  );
}
function AccountInput(props) {
  return (
    <View style={styles.accountInput}>
      <Text style={globalStyles.smallSemiBoldText}>{props.label}</Text>
      <TextInput
        style={[{ width: "70%" }, globalStyles.cardContainer, globalStyles.smallSemiBoldText,]}
        onChangeText={(text) => {
          props.setValue(text);
        }}
        defaultValue={props.input}
      />
    </View>
  );
}
function PledgeClass(props) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%", paddingTop: 20 }}>
      <Text style={globalStyles.smallSemiBoldText}>
        {"PC " + props.pledgeClass}
      </Text>
      <Text style={globalStyles.smallSemiBoldText}>
        {"Status: " + props.status}
      </Text>
    </View>
  );
}
function SaveButton(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Navigation");
        props.onPress();
      }}
      title={"Save and Exit"}
      style={[
        globalStyles.universityColorFill,
        globalStyles.button,
        { marginTop: 40 },
      ]}
    >
      <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>
        {"Save and Exit"}
      </Text>
    </TouchableOpacity>
  );
}
export function SignOutButton(props) {
  const navigation = useNavigation();

  const loginContext = useContext(LoginContext);
  const isAdmin = loginContext.isAdmin;

  return (
    <TouchableOpacity
      onPress={() => {
        auth
          .signOut()
          .then(() => {
            isAdmin.current = false;
            loginContext.setSignIn(false);

            navigation.navigate("Router", { screen: "LoginSignup" });
            console.log("(Account) Signed out. Navigating to Start");
          })
          .catch((error) => console.log(error.message));
      }}
      title={"Signout"}
      style={[
        globalStyles.universityColorFill,
        globalStyles.button,
        { marginTop: 10, marginBottom: 50 },
      ]}
    >
      <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>
        {"Sign out"}
      </Text>
    </TouchableOpacity>
  );
}

export function AccountPage() {

  const loginContext = useContext(LoginContext);
  const curUser = loginContext.currentUser;
  const [bio, setBio] = useState(curUser.bio);
  const [major, setMajor] = useState(curUser.major);
  const [minor, setMinor] = useState(curUser.minor);
  const [activities, setActivities] = useState(curUser.activities.toString());

  const [email, setEmail] = useState(curUser.email);
  const [phone, setPhone] = useState(curUser.phone);
  const [linkedin, setLinkedin] = useState(curUser.linkedin);

  const [changed, setChanged] = useState(false);

  useEffect(() => {
    setChanged(!changed);
    if (
      curUser.bio !== bio ||
      curUser.major !== major ||
      curUser.minor !== minor ||
      curUser.activities.toString() !== activities ||
      curUser.email !== email ||
      curUser.phone !== phone ||
      curUser.linkedin !== linkedin
    ) {
      setChanged(true);
    }
    else {
      setChanged(false);
    }
  }, [bio, major, minor, email, phone, linkedin]);

  const updateProfile = () => {
    const newInfo = {
      id: curUser.id,
      firstname: curUser.firstname,
      lastname: curUser.lastname,
      chapter: curUser.chapter,
      pledgeClass: curUser.pledgeClass,

      major: major,
      minor: minor,

      status: curUser.status,

      activities: activities.split(','),
      bio: bio,

      email: email,
      linkedin: linkedin,
      phone: phone,

      philanthropyPoints: curUser.philanthropyPoints,
      professionalPoints: curUser.professionalPoints,
      socialPoints: curUser.socialPoints,
      submittedPoints: curUser.submittedPoints,
    }

    db.collection("users")
      .doc(auth.currentUser.uid)
      .set(newInfo)
      .then(() => {
        console.log("(Account) New user Information successfully written!");
        // Update useContext for LoginContext
        loginContext.currentUser = test
        db.collection("users")
          .doc(auth.currentUser.uid)
          .get()
          .then((doc) => {
            loginContext.currentUser = doc.data();
          });
      })
      .catch((error) => {
        console.error("(Account) Error writing document: ", error);
      });
  }
  return (
    <View style={styles.createAccountScreen}>
      <View style={{ height: "15%", justifyContent: "space-between", paddingBottom: 10, width: "100%", }}>
        <View></View>
        <AccountTop name={curUser.firstname + " " + curUser.lastname} address="Navigation" rightElement={true} />
      </View>
      <ScrollView style={{ width: "100%" }}>
        <View style={{ alignItems: "center" }}>
          <Profile />
          {(curUser.role !== '') ?
            <View style={{ backgroundColor: findRoleColor(curUser.role), borderWidth: 3, borderColor: findRoleBorder(curUser.role), paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, borderRadius: 100 }}>
              <Text style={{ color: '#FFFFFF', fontFamily: 'Poppins_600SemiBold' }}>{curUser.role}</Text>
            </View>
            :
            null
          }
          <Description description={bio} setValue={setBio} />
          <Chapter chapter={curUser.chapter} />
          <PledgeClass
            pledgeClass={curUser.pledgeClass}
            status={curUser.status}
          />
          <AccountInput label="Major:" input={major} setValue={setMajor} />
          <AccountInput label="Minor:" input={minor} setValue={setMinor} />
          <AccountInput label="Activities:" input={activities} setValue={setActivities} />
          <AccountInput label="Email:" input={email} setValue={setEmail} />
          <AccountInput label="Phone:" input={phone} setValue={setPhone} />
          <AccountInput label="LinkedIn:" input={linkedin} setValue={setLinkedin} />
          {changed ? <SaveButton onPress={updateProfile} /> : null}
          <SignOutButton />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  createAccountScreen: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
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
  academicSection: {
    marginTop: 20,
    width: "80%",
  },
  accountInput: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
