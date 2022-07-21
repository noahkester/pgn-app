import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "../styles/Styles";
import { useNavigation } from "@react-navigation/native";
import colors from "webpack-dev-server/lib/utils/colors";
import { auth, db, store } from "../utils/firebase";
import ImageCarousel from "./components/ImageCarousel";

/*
Backend Stuff TODO:

Popualate Fields with database pull
Get inputs on "Save and Exit" and save to database

*/
export function AccountTop(props) {
  const navigation = useNavigation();
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
      <View style={styles.invisiableElement}></View>
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
      <Text
        style={globalStyles.smallSemiBoldText}
        multiline={true}
        placeholder="Quote"
      >
        {quote}
      </Text>
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
      <Text
        style={[
          styles.accountTextInput,
          globalStyles.cardContainer,
          globalStyles.smallSemiBoldText,
        ]}
      >
        {props.input}
      </Text>
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
    <View style={[styles.academicSection, { paddingBottom: 80 }]}>
      <AccountInput label="Email:" input={props.email} />
      <AccountInput label="Phone:" input={props.number} />
      <AccountInput label="LinkedIn:" input={props.linkedin} />
    </View>
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

export function PersonPage({ route }) {
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
  const { memberData } = route.params;
  useEffect(() => {
    setName(memberData.firstname + " " + memberData.lastname);
    setBio(memberData.bio);
    setPledgeClass(memberData.pledgeClass);
    setStatus(memberData.status);
    setMajor(memberData.major);
    setMinor(memberData.minor);
    setEmail(memberData.email);
    setLinkedin(memberData.linkedin);
    setPhone(memberData.phone);
    setChapter(memberData.chapter);
    store
      .ref(`/profile-pictures/${memberData.id}_professional`) //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setProfileUrlProfessional(url);
      })
      .catch((e) =>
        console.log("(Person) Error getting Professional Picture")
      );
    store
      .ref(`/profile-pictures/${memberData.id}_social`) //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setProfileUrlSocial(url);
      })
      .catch((e) => console.log("(Person) Error getting Social Picture"));
    store
      .ref(`/profile-pictures/${memberData.id}_child`) //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setProfileUrlChild(url);
      })
      .catch((e) =>
        console.log("(Person) Error getting Childhood Picture")
      );
  }, []);
  return (
    <View style={styles.createAccountScreen}>
      <View style={styles.navBar}>
        <View></View>
        <AccountTop name={name} address="People" />
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
