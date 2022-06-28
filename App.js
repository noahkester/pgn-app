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
import { findTimeCategory } from "./Screens/Events";
// import styles from "./Styles";
// In App.js in a new project

import { CardStyleInterpolators } from "@react-navigation/stack";
import {
  createNativeStackNavigator,
  Card,
} from "@react-navigation/native-stack";
import React, {
  useState,
  useEffect,
  createContext,
  useMemo,
  useRef,
} from "react";

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

export const LoginContext = createContext();

function App() {
  const todayEvents = useRef([]);
  const tomorrowEvents = useRef([]);
  const futureEvents = useRef([]);
  const extraEvents = useRef([]);
  const [isSignedIn, setSignIn] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);
  //no need to rerender
  const [currentUser, setCurrentUser] = useState("");

  //for events

  console.log("App inside function\n");
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
  }, []);

  useEffect(() => {
    var temptodayEvents = [];
    var temptomorrowEvents = [];
    var tempfutureEvents = [];
    var tempextraEvents = [];
    if (isSignedIn) {
      db.collection("users")
        .doc(auth.currentUser.uid)
        .get()
        .then((doc) => {
          var data = doc.data();
          db.collection("events")
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                var data1 = doc.data();
                var timeCategory = findTimeCategory(data1.time);
                switch (timeCategory) {
                  case 0:
                    temptodayEvents.push(data1);
                    break;
                  case 1:
                    temptomorrowEvents.push(data1);
                    break;
                  case -1: // TODO
                    tempextraEvents.push(data1);
                    break;
                  case 2:
                    tempfutureEvents.push(data1);
                    break;
                }
              });
              todayEvents.current = temptodayEvents;
              tomorrowEvents.current = temptomorrowEvents;
              futureEvents.current = tempfutureEvents;
              extraEvents.current = tempextraEvents;

              console.log("(APP) Events and User Read in App.js");
              setCurrentUser(data);
            });
        });
    }
  }, [isSignedIn]);

  if (isSignedIn) {
  }

  function LoadPage() {
    if (isSignedIn) {
      return isAdmin ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
          }}
        >
          <Stack.Screen name="Admin" children={AdminPage} />
          <Stack.Screen name="Settings" children={AdminSettingsPage} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Navigation"
          screenOptions={{
            headerShown: false,

            gestureEnabled: true,
          }}
        >
          <Stack.Screen name="Navigation" children={NavigationPage} />
          <Stack.Screen name="Account" children={AccountPage} />
          <Stack.Screen
            name="AccountImageUpload"
            component={AccountImageUploadPage}
          />
          <Stack.Screen name="Submit" children={SubmitPage} />
          <Stack.Screen name="Person" children={PersonPage} />
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
          <Stack.Screen name="LoginSignup" children={LoginSignupPage} />
          <Stack.Screen name="CreateAccount" children={CreateAccountPage} />
          <Stack.Screen
            name="Login"
            children={LoginPage}
            options={{
              headerBackButtonMenuEnabled: true,
            }}
          />
          <Stack.Screen name="Name" children={NamePage} />
          <Stack.Screen name="Education" children={EducationPage} />
          <Stack.Screen
            name="ProfilePictures"
            children={ProfilePicturesPage}
          />
          <Stack.Screen name="About" children={AboutPage} />
          <Stack.Screen name="Contact" children={ContactPage} />
          <Stack.Screen
            name="EmailVerification"
            children={EmailVerificationPage}
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
        <LoginContext.Provider
          value={[
            isSignedIn,
            setSignIn,
            currentUser,
            todayEvents,
            tomorrowEvents,
            futureEvents,
            extraEvents,
          ]}
        >
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
