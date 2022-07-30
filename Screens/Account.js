import { StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Text, View, Dimensions, ImageBackground, } from "react-native";
import React, { useRef, useEffect, useState, useContext } from "react";
import globalStyles from "../styles/Styles";
import { useNavigation } from "@react-navigation/native";
import colors from "webpack-dev-server/lib/utils/colors";
import { auth, db, store } from "../utils/firebase";
import { findRoleBorder, findRoleColor } from "../styles/Colors"
import LoginContext from '../utils/LoginContext';
import Octicons from 'react-native-vector-icons/Octicons';
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
    <View style={{
      marginTop: 20,
      width: "85%",
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderColor: '#DBDBDB',
      padding: 15,
      borderRadius: 10,
    }}>
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
function AccountInput(props) {
  return (
    <TextInput
      style={{
        width: "85%",
        borderWidth: 1,
        borderColor: '#D9D9D9',
        backgroundColor: '#FAFAFA',
        padding: 15,
        borderRadius: 10,
        fontFamily: 'Poppins_600SemiBold',
        color: '#808080',
        fontSize: 16,
        marginTop: 10
      }}
      onChangeText={(text) => {
        props.setValue(text);
      }}
      defaultValue={props.value}
      placeholder={props.placeholder}
    />
  );
}
function PledgeClass(props) {
  return (
    <View style={{ width: '85%' }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", paddingTop: 20 }}>
        <Text style={globalStyles.smallSemiBoldText}>
          {"PC " + props.pledgeClass}
        </Text>
        <Text style={globalStyles.smallSemiBoldText}>
          {"Status: " + props.status}
        </Text>
      </View>
      {(props.pledgeTask == "") ?
        null :
        <Text style={[globalStyles.smallSemiBoldText, { marginTop: 10, marginBottom: 10 }]}>{"Pledge task: " + props.pledgeTask}</Text>
      }
    </View >
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
        {
          marginTop: 10,
          marginBottom: 60,
          borderRadius: 30,
          width: "90%",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 15,
          paddingBottom: 15,
          borderWidth: 6,
          borderColor: '#E9C9B2',
        }
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
        {
          marginTop: 10,
          marginBottom: 60,
          borderRadius: 30,
          width: "90%",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 15,
          paddingBottom: 15,
          borderWidth: 6,
          borderColor: '#E9C9B2',
        }
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

  const [hometown, setHometown] = useState(curUser.hometown);
  const [activities, setActivities] = useState(curUser.activities.toString());

  const [email, setEmail] = useState(curUser.email);
  const [phone, setPhone] = useState(curUser.phone);
  const [linkedin, setLinkedin] = useState(curUser.linkedin);

  const [changed, setChanged] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    setChanged(!changed);
    if (
      curUser.bio !== bio ||
      curUser.major !== major ||
      curUser.minor !== minor ||
      curUser.activities.toString() !== activities ||
      curUser.email !== email ||
      curUser.phone !== phone ||
      curUser.linkedin !== linkedin ||
      curUser.hometown !== hometown
    ) {
      setChanged(true);
    }
    else {
      setChanged(false);
    }
  }, [hometown, bio, major, minor, email, phone, linkedin]);

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
      pledgeTask: curUser.pledgeTask,

      hometown: hometown,
      activities: activities.split(','),
      bio: bio,
      role: curUser.role,

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
        <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#262626' }}>{curUser.firstname + ' ' + curUser.lastname}</Text>
        <TouchableOpacity
          style={{ width: 68, height: 68, alignItems: 'center', justifyContent: 'center', borderRadius: 34, marginRight: 16 }}
          onPress={() => {
            navigation.navigate('AddEvent');
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("AccountImageUpload")}>
            <Image
              source={require("../images/imageUpload.png")}
              style={styles.imageLogo}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ width: "100%" }}>
        <View style={{ alignItems: "center" }}>
          <Profile />
          {(curUser.role === '') ? null :
            <View style={{ backgroundColor: findRoleColor(curUser.role), borderWidth: 3, borderColor: findRoleBorder(curUser.role), paddingTop: 6, paddingBottom: 6, paddingLeft: 20, paddingRight: 20, borderRadius: 100 }}>
              <Text style={{ color: '#FFFFFF', fontFamily: 'Poppins_600SemiBold' }}>{curUser.role}</Text>
            </View>
          }
          <Description description={bio} setValue={setBio} />
          <PledgeClass
            pledgeClass={curUser.pledgeClass}
            status={curUser.status}
            pledgeTask={curUser.pledgeTask}
          />
          <View style={{ width: '80%', height: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#DBDBDB' }} />
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, marginLeft: 10, width: '85%' }}>Education</Text>
          <AccountInput placeholder="Major" value={major} setValue={setMajor} />
          <AccountInput placeholder="Minor" value={minor} setValue={setMinor} />
          <View style={{ width: '80%', height: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#DBDBDB' }} />
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, marginLeft: 10, width: '85%' }}>About</Text>
          <AccountInput placeholder="Hometown" value={hometown} setValue={setHometown} />
          <AccountInput placeholder="Activities" value={activities} setValue={setActivities} />
          <View style={{ width: '80%', height: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#DBDBDB' }} />
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, marginLeft: 10, width: '85%' }}>Contact</Text>
          <AccountInput placeholder="Email" value={email} setValue={setEmail} />
          <AccountInput placeholder="Phone" value={phone} setValue={setPhone} />
          <AccountInput placeholder="Linkedin URL" value={linkedin} setValue={setLinkedin} />
          {changed ? <SaveButton onPress={updateProfile} /> : <SignOutButton />}
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
