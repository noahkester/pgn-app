import { StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Text, View, Dimensions, ImageBackground, } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import globalStyles from "../styles/Styles";
import { useNavigation } from "@react-navigation/native";
import colors from "webpack-dev-server/lib/utils/colors";
import { auth, db, store } from "../utils/firebase";

import LoginContext from '../utils/LoginContext';

import { useContext } from "react";
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
  const loginContext = useContext(LoginContext);
  const curUser = loginContext.currentUser;

  return (
    <View style={styles.createAccountScreen}>
      <View style={styles.navBar}>
        <View></View>
        <AccountTop name={curUser.firstname + " " + curUser.lastname} address="Navigation" rightElement={true} />
      </View>
      <ScrollView style={styles.accountInfo}>
        <View style={styles.innerScroll}>
          <Profile />
          <Description description={curUser.bio} />
          <Chapter chapter={curUser.chapter} />
          <PledgeClass pledgeClass={curUser.pledgeClass} status={curUser.status} />
          <AcademicInfo major={curUser.major} minor={curUser.minor} />
          <ContactInfo email={curUser.email} number={curUser.phone} linkedin={curUser.linkedin} />
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
