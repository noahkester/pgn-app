import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Image,
  View,
} from "react-native";
import { LoginSignupPage } from "./Screens/LoginSignup";
import { StartPage } from "./Screens/Start";
import { LoginPage } from "./Screens/Login";
import { CreateAccountPage } from "./Screens/CreateAccount";
import { NavigationPage } from "./Screens/Tabs";
import { AccountPage } from "./Screens/Account";
import { SubmitPage } from "./Screens/Submit";
import { AdminPage } from "./Screens/Admin";
import { AdminSettingsPage } from "./Screens/AdminSettings";
import { NamePage } from "./Screens/newUser/Name";
import { EducationPage } from "./Screens/newUser/Education";
import { ProfilePicturesPage } from "./Screens/newUser/ProfilePictures";
import { AboutPage } from "./Screens/newUser/About";
import { ContactPage } from "./Screens/newUser/Contact";
import { EmailVerificationPage } from "./Screens/newUser/EmailVerification";
import { PersonPage } from "./Screens/Person";
import { AccountImageUploadPage } from "./Screens/AccountImageUpload";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { auth, getCurrentUser, db } from "./firebase";
// import styles from "./Styles";
// In App.js in a new project

import { CardStyleInterpolators } from "@react-navigation/stack";
import {
  createNativeStackNavigator,
  Card,
} from "@react-navigation/native-stack";
import React, { useState, useEffect, createContext } from "react";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";

const Stack = createNativeStackNavigator();
console.disableYellowBox = true;

// db.collection("users")
//       .get()
export const LoginContext = createContext();
function App() {
  const [isSignedIn, setSignIn] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);

  //for login


  useEffect(() => {
    async function wait() {
      // https://stackoverflow.com/questions/39231344/how-to-wait-for-firebaseauth-to-finish-initializing
      await getCurrentUser(auth)
        .then((user) => {
          if (user.emailVerified) {
            setSignIn(true);
            if (user.email == "pgn.utexas.sudo@gmail.com") {
              setisAdmin(true);
            } else {
            }
          }
        })
        .catch(() => {
          console.log("(Start page) No user: Render Login/Signup");
        });
    }
    wait();

    // //store current user
    // db.collection("users")
    //   .doc(auth.currentUser.uid)
    //   .get()
    //   .then((doc) => {
    //     var data = doc.data();
    //   });
  }, [isSignedIn]);

  function LoadPage() {
    if (isSignedIn) {
      return isAdmin ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
          }}
        >
          <Stack.Screen name="Admin" component={AdminPage} />
          <Stack.Screen name="Settings" component={AdminSettingsPage} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Navigation"
          screenOptions={{
            headerShown: false,

            gestureEnabled: true,
          }}
        >
          <Stack.Screen name="Navigation" component={NavigationPage} />
          <Stack.Screen name="Account" component={AccountPage} />
          <Stack.Screen
            name="AccountImageUpload"
            component={AccountImageUploadPage}
          />
          <Stack.Screen name="Submit" component={SubmitPage} />
          <Stack.Screen name="Person" component={PersonPage} />
        </Stack.Navigator>
      );
    } else {
      return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,

            gestureEnabled: true,
          }}
        >
          <Stack.Screen name="LoginSignup" component={LoginSignupPage} />
          <Stack.Screen name="CreateAccount" component={CreateAccountPage} />
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{
              headerBackButtonMenuEnabled: true,
            }}
          />
          <Stack.Screen name="Name" component={NamePage} />
          <Stack.Screen name="Education" component={EducationPage} />
          <Stack.Screen
            name="ProfilePictures"
            component={ProfilePicturesPage}
          />
          <Stack.Screen name="About" component={AboutPage} />
          <Stack.Screen name="Contact" component={ContactPage} />
          <Stack.Screen
            name="EmailVerification"
            component={EmailVerificationPage}
          />
        </Stack.Navigator>
      );
    }
  }
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <LoginContext.Provider value = {[isSignedIn,setSignIn]}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,

              gestureEnabled: true,
            }}
          >
            <Stack.Screen name="Router" component={LoadPage} />
            {/* <Stack.Screen name="Start" component={StartPage} /> */}
          </Stack.Navigator>
        </LoginContext.Provider>
      </NavigationContainer>
    );
  }
}

export default App;
