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
import { auth, getCurrentUser, db, store } from "./firebase";
import { findTimeCategory } from "./Screens/Events";
import * as SplashScreen from "expo-splash-screen";
// import styles from "./Styles";
// In App.js in a new project

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, {
  useState,
  useEffect,
  createContext,
  useMemo,
  useCallback,
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
  const allEvents = useRef([]);
  const [appIsReady, setAppIsReady] = useState(false);
  const [isSignedIn, setSignIn] = useState(false);
  const isAdmin = useRef(false);
  //no need to rerender
  const currentUser= useRef("");

  //for profileURL
  const [profileUrl, setProfileUrl] = useState(undefined);

  console.log("App inside function\n");
  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // make any API calls you need to do here
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
      }
    }
    async function wait() {
      // https://stackoverflow.com/questions/39231344/how-to-wait-for-firebaseauth-to-finish-initializing
      await getCurrentUser(auth)
        .then((user) => {
          if (user.emailVerified) {
            if (user.email == "pgn.utexas.sudo@gmail.com") {
              isAdmin.current = true;
              console.log("is Admin set to true");
            } else {
            }
            setSignIn(true);
            console.log("Sign In set to true");
          }
        })
        .catch(() => {
          console.log("(Start page) No user: Render Login/Signup");
          setAppIsReady(true);
        });
    }
 
    wait();
    prepare();
  }, []);

  async function loadInfo() {
    console.log("inside LoadInfo");
    if (isSignedIn) {
      if (!isAdmin.current) {
        var temptodayEvents = [];
        var temptomorrowEvents = [];
        var tempfutureEvents = [];
        var tempextraEvents = [];
        var tempAllEvents = [];
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
                  tempAllEvents.push(data1);
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
                allEvents.current = tempAllEvents;
                //console.log("All Events: " + JSON.stringify(tempAllEvents));
                console.log("(APP) Events and User Read in App.js");
                currentUser.current = data;
              
              });
            store
              .ref(`/profile-pictures/${auth.currentUser.uid}_professional`) //name in storage in firebase console
              .getDownloadURL()
              .then((url) => {
                setProfileUrl(url);
                setAppIsReady(true);
                console.log("App is ready1");
              })
              .catch((e) =>
                console.log("(Tabs) Errors while getting Profile Picture ", e)
              );
          });
      }else{
        //TODO Do fetch calls for admin.js
        setAppIsReady(true);
      }
    }

  }

  useEffect(() => {
    console.log(
      "\n\n\ninside UseEffect: isAdmin: " +
        isAdmin.current +
        ", isSignedIn: " +
        isSignedIn +
        "\n\n\n"
    );
    loadInfo();
  }, [isSignedIn]);

  function LoadPage() {
    // var test = isAdmin ? "Admin" : "Navigation";

    if (isSignedIn) {
      return isAdmin.current ? (
        <Stack.Navigator
          initialRouteName="Admin"
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
          <Stack.Screen name="Login" component={LoginPage} />
          {/* <Stack.Screen name="Admin" component={AdminPage} />
          <Stack.Screen name="Settings" component={AdminSettingsPage} /> */}
          <Stack.Screen name="CreateAccount" component={CreateAccountPage} />

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

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
  });
  console.log("About To Returnn in App.js");
 if(!appIsReady || !fontsLoaded ){
    return null;
  }else {

    return (
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <LoginContext.Provider
            value={[
              isSignedIn,
              setSignIn,
              currentUser.current,
              todayEvents,
              tomorrowEvents,
              futureEvents,
              extraEvents,
              allEvents,
              isAdmin,
              profileUrl,
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
      </View>
    );
  }
}

export default App;
