import { TouchableOpacity, TextInput, Text, View, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Octicons from 'react-native-vector-icons/Octicons';

import LoginContext from "../../utils/LoginContext";
import { auth, db, sendPasswordReset } from "../../utils/firebase";

const adminEmail = 'pgn.utexas.sudo@gmail.com';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigation = useNavigation();

  const loginContext = useContext(LoginContext);
  const setAppIsReady = loginContext.setAppIsReady;
  const setSignIn = loginContext.setSignIn;
  const isAdmin = loginContext.isAdmin;

  const handleLogin = () => {
    setEmailError('');
    setPasswordError('');
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("\n(Login) Sign in Successful!\n");
        const user = auth.currentUser;
        if (user.emailVerified) {
          // User has verified their email, continue to home screen
          loginContext.setAppIsReady(false);
          return;
        }
        else {
          db.collection("users")
            .doc(user.uid)
            .get()
            .then((doc) => {
              if (doc.exists) {
                console.log("(Login) User account has been created but missing email verification");
                navigation.navigate("EmailVerification");
              }
              else {
                console.log("(Login) User Account has not been created");
                navigation.navigate("Name");
              }
            })
            .catch(() => {
              console.log("(Login) Firebase issues");
            });
        }
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setEmailError("Invalid email format");
            break;
          case "auth/wrong-password":
            setPasswordError("Incorrect password");
            break;
          case "auth/user-not-found":
            setEmailError("No user found");
            break;
        }
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <View style={{ marginTop: 32, height: 100, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={{ marginLeft: 16 }}
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
      </View>
      <View
        style={{ flex: 1, alignItems: "center", marginTop: 180 }}
      >
        <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#262626', marginBottom: 20 }}>Log in</Text>
          <View style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderRadius: 10, borderColor: '#DBDBDB', width: '90%', height: 50, paddingLeft: 20, justifyContent: 'center' }}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626' }}
              placeholder={'Email Address'}
              onChangeText={(text) => setEmail(text)}
            >
              {email}
            </TextInput>
          </View>
          {(emailError == '') ? null :
            <Text style={{ width: '90%', paddingTop: 4, paddingLeft: 10, fontFamily: 'Poppins_500Medium', color: '#E35B56' }}>{emailError}</Text>
          }
          <View style={{ width: '90%', height: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#DBDBDB' }} />
          <View style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderRadius: 10, borderColor: '#DBDBDB', width: '90%', height: 50, paddingLeft: 20, justifyContent: 'center' }}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626' }}
              placeholder={'Password'}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            >
              {password}
            </TextInput>
          </View>
          {(passwordError == '') ? null :
            <Text style={{ width: '90%', paddingTop: 4, paddingLeft: 10, fontFamily: 'Poppins_500Medium', color: '#E35B56' }}>{passwordError}</Text>
          }
        </View>
        <View style={{ width: '100%', alignItems: 'center', position: 'absolute', bottom: 60 }}>
          <TouchableOpacity
            style={{ width: '90%', height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#DBDBDB', backgroundColor: '#FFFFFF' }}
            onPress={handleLogin}
          >
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626' }}>{'Log in'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 6 }}
            onPress={() => {
              sendPasswordReset(email);
            }}
          >
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12, color: '#8E8E8E' }}>Password Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
