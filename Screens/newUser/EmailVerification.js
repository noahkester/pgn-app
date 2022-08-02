import { TouchableOpacity, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';

import { auth, sendEmail } from "../../utils/firebase";
import { NavigationPage } from "../Tabs";

export function EmailVerificationPage() {
  const user = auth.currentUser;
  if (user && user.emailVerified) {
    return <NavigationPage />;
  }
  return <LoadingPage />;
}

export function LoadingPage() {
  const [message, setMessage] = useState('');

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
      <View style={{ marginTop: 32, height: 100, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
      </View>
      <View style={{ alignItems: "center", marginTop: 120 }}>
        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#262626', marginBottom: 20 }}>Email Verification</Text>
        <FontAwesome
          name={'paper-plane'}
          size={140}
          color={'#9C9C9C'}
          resizeMode='contain'
        />
        {(message == '') ? null :
          <Text style={{ paddingTop: 30, fontFamily: 'Poppins_500Medium', color: '#5FB05F' }}>{message}</Text>
        }
      </View>
      <View style={{ width: '100%', alignItems: 'center', position: 'absolute', bottom: 60 }}>
        <TouchableOpacity
          style={{ width: '90%', height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 30, borderWidth: 1, borderColor: '#DBDBDB', backgroundColor: '#FFFFFF' }}
          onPress={() => {
            const user = auth.currentUser;
            if (user) {
              sendEmail(user);
              setMessage("Sent! Check your spam folder");
            } else {
              setMessage("Issue sending email. Refresh app");
            }
          }}
        >
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626' }}>{'Send Email'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 6 }}
          onPress={() => {
            navigation.navigate("Router", { screen: "Login" });
          }}
        >
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12, color: '#8E8E8E' }}>Verified? Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
