import { ScrollView, TouchableOpacity, Image, TextInput, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Linking from 'expo-linking';
import Octicons from 'react-native-vector-icons/Octicons';

import globalStyles from "../styles/Styles";
import { findRoleColor } from '../styles/Colors'
import ImageCarousel from "./components/ImageCarousel";
import { store } from "../utils/firebase";

var allSettled = require('promise.allsettled');

function Profile(props) {
  return (
    <ImageCarousel
      data={[
        { uri: props.profileUrlProfessional },
        { uri: props.profileUrlSocial },
        { uri: props.profileUrlFunny },
      ]}
    />
  );
}
function Description(props) {
  return (
    <View style={{ marginTop: 20, width: "85%", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: '#DBDBDB', padding: 15, borderRadius: 10 }}>
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
    <View style={{
      width: "85%",
      borderWidth: 1,
      borderColor: '#D9D9D9',
      backgroundColor: '#FAFAFA',
      padding: 15,
      borderRadius: 10,
      marginTop: 10
    }}>
      <Text
        style={{ fontFamily: 'Poppins_600SemiBold', color: '#808080', fontSize: 16 }}
      >
        {props.value}
      </Text>
    </View>
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
    </View >
  );
}

function Activities(props) {
  var list = [];
  //TODO BIG ERROR AKIN
  try {
    if (props.activities) {
      list = props.activities.map((activity, index) => {
        return (
          <View key={index} style={{ backgroundColor: '#FAFAFA', borderWidth: 1, marginTop: 10, borderColor: '#D9D9D9', marginLeft: 10, marginRight: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, borderRadius: 8 }}>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#808080' }}>{activity}</Text>
          </View>
        )
      })
    }
  }
  catch {
    //console.log('issue')
  }
  return (
    <View style={{ marginTop: 20, width: '90%', flexDirection: 'row', flexWrap: 'wrap' }}>
      {list}
    </View>
  )
}

export function PersonPage({ route }) {
  const { memberData } = route.params;
  const [profileUrlProfessional, setProfileUrlProfessional] = useState('');
  const [profileUrlSocial, setProfileUrlSocial] = useState('');
  const [profileUrlFunny, setProfileUrlFunny] = useState('');
  const [pageIsReady, setPageIsReady] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    var promises = []
    const p1 = store
      .ref(`/profile-pictures/${memberData.id}_professional`) //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setProfileUrlProfessional(url);
      })
 
    const p2 = store
      .ref(`/profile-pictures/${memberData.id}_social`) //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setProfileUrlSocial(url);
      })

    const p3 = store
      .ref(`/profile-pictures/${memberData.id}_funny`) //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setProfileUrlFunny(url);
      })
      // .catch((e) =>
      //   console.log("(Person) Error getting funny Picture")
      // );
    promises.push(p1);
    promises.push(p2);
    promises.push(p3);
    allSettled(promises).then((results) => {
      setPageIsReady(true);
    })
  }, []);
  return (
    (pageIsReady) ?
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" }}>
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
          <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#262626' }}>{memberData.firstname + ' ' + memberData.lastname}</Text>
          <TouchableOpacity
            style={{ width: 68, height: 68, alignItems: 'center', justifyContent: 'center', borderRadius: 34, marginRight: 16 }}
            onPress={() => {
              navigation.navigate('AddEvent');
            }}
          >
          </TouchableOpacity>
        </View>
        <ScrollView style={{ width: "100%" }}>
          <View style={{ alignItems: "center", marginBottom: 60 }}>
            <Profile
              profileUrlProfessional={profileUrlProfessional}
              profileUrlSocial={profileUrlSocial}
              profileUrlFunny={profileUrlFunny}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {(memberData.role !== '') ?
                <View style={{ backgroundColor: findRoleColor(memberData.role), paddingTop: 6, paddingBottom: 6, paddingLeft: 20, paddingRight: 20, borderRadius: 100 }}>
                  <Text style={{ color: '#FFFFFF', fontFamily: 'Poppins_600SemiBold' }}>{memberData.role}</Text>
                </View>
                :
                null
              }
              {(memberData.linkedin !== '') ?
                <TouchableOpacity
                  style={{ marginLeft: 10, marginRight: 10 }}
                  onPress={() => {
                    Linking.openURL(memberData.linkedin);
                  }}
                >
                  <Image
                    source={require("../images/linkedin.png")}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity> :
                null
              }
            </View>
            <Description description={memberData.bio} />
            <Activities activities={memberData.activities} />
            <PledgeClass pledgeClass={memberData.pledgeClass} status={memberData.status} />
            <View style={{ width: '80%', height: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#DBDBDB' }} />
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, marginLeft: 10, width: '85%' }}>Education</Text>
            <AccountInput value={memberData.major} />
            <AccountInput value={memberData.minor} />
            <View style={{ width: '80%', height: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#DBDBDB' }} />
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, marginLeft: 10, width: '85%' }}>Hometown</Text>
            <AccountInput value={memberData.hometown} />
            <View style={{ width: '80%', height: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#DBDBDB' }} />
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, marginLeft: 10, width: '85%' }}>Contact</Text>
            <AccountInput value={memberData.email} />
            <AccountInput value={memberData.number} />
          </View>
        </ScrollView>
      </View>
      : null
  );
}