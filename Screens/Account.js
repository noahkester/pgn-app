import { StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Text, View, Dimensions, ImageBackground, } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import globalStyles from "../styles/Styles";
import colors from '../styles/Colors'
import { findRoleColor } from "../styles/Colors"
import ImageCarousel from "./components/ImageCarousel";

import { auth, db } from "../utils/firebase";
import LoginContext from '../utils/LoginContext';
import UrlContext from "../utils/UrlContext";

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
    <View style={{ marginTop: 20, width: "90%", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: '#DBDBDB', padding: 15, borderRadius: 10 }}>
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
        width: "90%",
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
function Role(props) {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {(props.role === '') ? null :
        <View style={{ backgroundColor: findRoleColor(props.role), height: 30, paddingLeft: 20, paddingRight: 20, borderRadius: 100, justifyContent: 'center' }}>
          <Text style={{ color: '#FFFFFF', fontFamily: 'Poppins_600SemiBold' }}>{props.role}</Text>
        </View>
      }
      <TouchableOpacity
        style={{ marginLeft: 10, width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 25, backgroundColor: colors.universityColor + '40' }}
        onPress={() => {
          navigation.navigate('Theme');
        }}
      >
        <FontAwesome5
          name="palette"
          color={colors.universityColor}
          size={30}
        />
      </TouchableOpacity>
    </View>
  )
}
function PledgeClass(props) {
  return (
    <View style={{ width: '90%' }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", paddingTop: 20 }}>
        <Text style={globalStyles.smallSemiBoldText}>
          {"PC " + props.pledgeClass}
        </Text>
        <Text style={globalStyles.smallSemiBoldText}>
          {"Status: " + props.status}
        </Text>
      </View>
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
          borderRadius: 10,
          width: "90%",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 15,
          paddingBottom: 15,
          borderColor: colors.universityFadedColor,
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

  return (
    <TouchableOpacity
      onPress={() => {
        auth.signOut()
      }}
      title={"Signout"}
      style={[
        globalStyles.universityColorFill,
        {
          marginTop: 10,
          marginBottom: 60,
          borderRadius: 10,
          width: "90%",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 15,
          paddingBottom: 15,
          borderColor: colors.universityFadedColor,
        }
      ]}
    >
      <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>
        {"Sign out"}
      </Text>
    </TouchableOpacity>
  );
}
function AccountLabel(props) {
  return (
    <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, marginLeft: 10, width: '90%' }}>{props.label}</Text>
  )
}


export function AccountPage() {

  const loginContext = useContext(LoginContext);
  const curUser = loginContext.currentUser;
  // const setCurrentUser = loginContext.setCurrentUser;
  const [bio, setBio] = useState(curUser.bio);
  const [major, setMajor] = useState(curUser.major);
  const [minor, setMinor] = useState(curUser.minor);

  const [hometown, setHometown] = useState(curUser.hometown);
  const [activities, setActivities] = useState(curUser.activities.join(', '));



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
      curUser.activities.join(', ') !== activities ||
      curUser.phone !== phone ||
      curUser.linkedin !== linkedin ||
      curUser.hometown !== hometown
    ) {
      setChanged(true);
    }
    else {
      setChanged(false);
    }
  }, [hometown, bio, activities, major, minor, phone, linkedin]);

    
  const updateProfile = () => {
    const newInfo = {

      major: major,
      minor: minor,

      hometown: hometown,
      activities: activities.split(/\,\s|\,/ ),
      bio: bio,
      role: curUser.role,

      linkedin: linkedin,
      phone: phone,

    }

    db.collection("users")
      .doc(auth.currentUser.uid)
      .set(newInfo, {merge : true})

  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF", }}>
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

        <TouchableOpacity onPress={() => navigation.navigate("AccountImageUpload")}>
          <View style={{ marginRight: 16, width: 60, height: 60, borderRadius: 36, backgroundColor: colors.universityColor + '40', alignItems: 'center', justifyContent: 'center' }}>
            <MaterialCommunityIcons
              name="image-plus"
              color={colors.universityColor}
              size={38}
            />
          </View>
        </TouchableOpacity>

      </View>
      <ScrollView style={{ width: "100%" }}>
        <View style={{ alignItems: "center" }}>
          <Profile />
          <Role role={curUser.role} />
          <Description description={bio} setValue={setBio} />

          <PledgeClass pledgeClass={curUser.pledgeClass} status={curUser.status} />

          <View style={{ width: '90%', height: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#DBDBDB' }} />

          <AccountLabel label={'Education'} />
          <AccountInput placeholder="Major" value={major} setValue={setMajor} />
          <AccountInput placeholder="Minor" value={minor} setValue={setMinor} />
          <View style={{ width: '90%', height: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#DBDBDB' }} />

          <AccountLabel label={'About'} />
          <AccountInput placeholder="Hometown" value={hometown} setValue={setHometown} />
          <AccountInput placeholder="Activities" value={activities} setValue={setActivities} />
          <View style={{ width: '90%', height: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#DBDBDB' }} />

          <AccountLabel label={'Contact'} />
          <AccountInput placeholder="Phone" value={phone} setValue={setPhone} />
          <AccountInput placeholder="Linkedin URL" value={linkedin} setValue={setLinkedin} />
          {changed ?
            <SaveButton onPress={updateProfile} /> :
            <SignOutButton />}
        </View>
      </ScrollView>
    </View>
  );
}