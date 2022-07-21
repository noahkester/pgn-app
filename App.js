import React, { useState, useEffect, createContext, useMemo, useCallback, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, TouchableOpacity, Text, Image, View } from "react-native";
import { useFonts, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";

// Screens and Page imports
import { LoginSignupPage } from "./Screens/loginSignup/LoginSignup";
import { LoginPage } from "./Screens/loginSignup/Login";
import { CreateAccountPage } from "./Screens/loginSignup/CreateAccount";
import { NavigationPage } from "./Screens/Tabs";
import { AccountPage } from "./Screens/Account";
import { SubmitPage } from "./Screens/Submit";
import { AdminPage } from "./Screens/adminUser/Admin";
import { AdminSettingsPage } from "./Screens/adminUser/AdminSettings";
import { NamePage } from "./Screens/newUser/Name";
import { EducationPage } from "./Screens/newUser/Education";
import { ProfilePicturesPage } from "./Screens/newUser/ProfilePictures";
import { AboutPage } from "./Screens/newUser/About";
import { ContactPage } from "./Screens/newUser/Contact";
import { EmailVerificationPage } from "./Screens/newUser/EmailVerification";
import { PersonPage } from "./Screens/Person";
import { AccountImageUploadPage } from "./Screens/AccountImageUpload";

// Firebase and misc imports
import { auth, getCurrentUser, db, store } from "./utils/firebase";
import { findTimeCategory } from "./Screens/Events";

// Context import
import { LoginProvider } from './utils/LoginContext';
import { UrlContext, UrlProvider } from './utils/UrlContext';

const Stack = createNativeStackNavigator();

function App() {
  // Persistant references used throughout the app
  const todayEvents = useRef([]);
  const tomorrowEvents = useRef([]);
  const futureEvents = useRef([]);
  const extraEvents = useRef([]);
  const allEvents = useRef([]);

  // User Context

  // States used for rendering app and checking for user sign-in status
  const [appIsReady, setAppIsReady] = useState(false);
  const [isSignedIn, setSignIn] = useState(false);
  const isAdmin = useRef(false);

  const currentUser = useRef({});

  const professionalUrl = useRef('');
  const socialUrl = useRef('');
  const funnyUrl = useRef('');

  //for profileURL

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
              console.log("(app.js) isAdmin set to true");
            }
            setSignIn(true);
            console.log("(app.js) SignIn set to true");
          }
        })
        .catch(() => {
          console.log("(app.js) No user: Render Login/Signup");
          setAppIsReady(true);
        });
    }
    wait();
    prepare();
  }, []);

  async function loadInfo() {
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
            currentUser.current = data;
            db.collection("events")
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  var data1 = doc.data();
                  tempAllEvents.push(data1);
                  var timeCategory = findTimeCategory(data1.time);
                  switch (timeCategory) {
                    case -1:
                      tempextraEvents.push(data1);
                      break;
                    case 0:
                      temptodayEvents.push(data1);
                      break;
                    case 1:
                      temptomorrowEvents.push(data1);
                      break;
                    case 2:
                    case -2: // TODO, -2 is past event but we still want to see it
                      tempfutureEvents.push(data1);
                      break;
                  }
                });
                todayEvents.current = temptodayEvents;
                tomorrowEvents.current = temptomorrowEvents;
                futureEvents.current = tempfutureEvents;
                extraEvents.current = tempextraEvents;
                allEvents.current = tempAllEvents;

                console.log("(app.js) Events and User Read in App.js");
              });
            store
              .ref(`/profile-pictures/${auth.currentUser.uid}_professional`) //name in storage in firebase console
              .getDownloadURL()
              .then((url) => {
                professionalUrl.current = url;
                // Only the professional url is required
                setAppIsReady(true);
                console.log("(app.js) Successfully got professional picture");
              })
              .catch((e) =>
                console.log("(app.js) Errors while getting professional picture ")
              );
            store
              .ref(`/profile-pictures/${auth.currentUser.uid}_social`) //name in storage in firebase console
              .getDownloadURL()
              .then((url) => {
                socialUrl.current = url;
                console.log("(app.js) Successfully got social picture");
              })
              .catch((e) =>
                console.log("(app.js) Errors while getting social picture ")
              );
            store
              .ref(`/profile-pictures/${auth.currentUser.uid}_funny`) //name in storage in firebase console
              .getDownloadURL()
              .then((url) => {
                funnyUrl.current = url;
                console.log("(app.js) Successfully got funny picture");
              })
              .catch((e) =>
                console.log("(app.js) Errors while getting funny picture ")
              );
          });
      } else {
        //TODO Do fetch calls for admin.js
        setAppIsReady(true);
      }
    }

  }

  useEffect(() => {
    console.log(
      "\n(app.js) isSignedIn UseEffect: isAdmin: " +
      isAdmin.current +
      ", isSignedIn: " +
      isSignedIn +
      "\n"
    );
    loadInfo();
  }, [isSignedIn]);

  function LoadPage() {
    // var test = isAdmin ? "Admin" : "Navigation";

    if (isSignedIn) {
      if (isAdmin.current) {
        return (
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
        )
      }
      // Not Admin
      return (
        <Stack.Navigator
          initialRouteName="Navigation"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
          }}
        >
          <Stack.Screen name="Navigation" component={NavigationPage} />
          <Stack.Screen name="Account" children={AccountPage} />
          <Stack.Screen name="AccountImageUpload" component={AccountImageUploadPage} />
          <Stack.Screen name="Submit" children={SubmitPage} />
          <Stack.Screen name="Person" children={PersonPage} />
        </Stack.Navigator>
      )
    }
    // User is not signed in
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,

          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="LoginSignup" children={LoginSignupPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="CreateAccount" component={CreateAccountPage} />

        <Stack.Screen name="Name" component={NamePage} />
        <Stack.Screen name="Education" component={EducationPage} />
        <Stack.Screen name="ProfilePictures" component={ProfilePicturesPage} />
        <Stack.Screen name="About" component={AboutPage} />
        <Stack.Screen name="Contact" component={ContactPage} />
        <Stack.Screen name="EmailVerification" component={EmailVerificationPage} />
      </Stack.Navigator>
    );
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
  if (!appIsReady || !fontsLoaded) {
    return null;
  } else {
    return (
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <UrlProvider
            value={{
              'professionalUrl': professionalUrl.current,
              'socialUrl': socialUrl.current,
              'funnyUrl': funnyUrl.current,
            }}
          >
            <LoginProvider
              value={{
                'isSignedIn': isSignedIn,
                'setSignIn': setSignIn,
                'currentUser': currentUser.current,
                'todayEvents': todayEvents,
                'tomorrowEvents': tomorrowEvents,
                'futureEvents': futureEvents,
                'extraEvents': extraEvents,
                'allEvents': allEvents,
                'isAdmin': isAdmin
              }}
            >
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,

                  gestureEnabled: true,
                }}
              >
                <Stack.Screen name="Router" component={LoadPage} />
              </Stack.Navigator>
            </LoginProvider>
          </UrlProvider>
        </NavigationContainer>
      </View>
    );
  }
}

export default App;
