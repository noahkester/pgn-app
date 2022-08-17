// From React
import React, { useState, useEffect, useCallback, useRef } from "react";
import { View } from "react-native";
import { useFonts, Poppins_600SemiBold, Poppins_700Bold, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";

// Screens and Page imports




// Util imports
import { auth, getCurrentUser, db, store, getEvents } from "./utils/firebase";

// Context import
import { LoginProvider } from './utils/LoginContext';
import { UrlProvider } from './utils/UrlContext';
import { NewUserProvider } from './utils/NewUserContext';
import { AdminProvider } from './utils/AdminContext';

// Nav imports
import AdminNavigator from "./Navigation/AdminNavigation";
import NewUserNavigator from "./Navigation/NewUserNavigation";
import UserNavigator from "./Navigation/UserNavigation";



const Stack = createNativeStackNavigator();
var allSettled = require('promise.allsettled');

function App() {
  // Persistant references used throughout the app
  const [events, setEvents] = useState({
    todayEvents: [],
    upcomingEvents: [],
    ongoingEvents: [],
    allEvents: []
  });

  // States used for rendering app and checking for user sign-in status
  const [appIsReady, setAppIsReady] = useState(false);
  const [isSignedIn, setSignIn] = useState(false);
  const isAdmin = useRef(false);

  const currentUser = useRef({});

  const [professionalUrl, setProf] = useState('');
  const [socialUrl, setSocial] = useState('');
  const [funnyUrl, setFunny] = useState('');

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    async function wait() {
      await getCurrentUser(auth)
        .then((user) => {
          if (user.emailVerified) {
            if (user.email == "pgn.utexas.sudo@gmail.com") {
              isAdmin.current = true;
            }
            setSignIn(true);
          } else {
            setAppIsReady(true);
          }
        })
        .catch(() => {
          setAppIsReady(true);
        });
    }
    wait();
    prepare();
  }, []);

  async function loadInfo() {
    if (!isSignedIn) {
      return;
    }
    if (!isAdmin.current) {
      getEvents()
        .then(returnedEvents => {
          setEvents(returnedEvents);
        })
      db.collection("users")
        .doc(auth.currentUser.uid)
        .onSnapshot((doc) => {
          var data = doc.data();
          currentUser.current = data;

          var promises = [];
          const p1 = store
            .ref(`/profile-pictures/${auth.currentUser.uid}_professional`)
            .getDownloadURL()
            .then((url) => {
              setProf(url);
              // Only the professional url is required
            })
            .catch((e) => {
              console.log("(app.js) Errors while getting professional picture ")
            });
          const p2 = store
            .ref(`/profile-pictures/${auth.currentUser.uid}_social`)
            .getDownloadURL()
            .then((url) => {
              setSocial(url);
            })
            .catch((e) =>
              console.log("(app.js) Errors while getting social picture ")
            );
          const p3 = store
            .ref(`/profile-pictures/${auth.currentUser.uid}_funny`)
            .getDownloadURL()
            .then((url) => {
              setFunny(url);
            })
            .catch((e) =>
              console.log("(app.js) Errors while getting funny picture ")
            );
          promises.push(p1);
          promises.push(p2);
          promises.push(p3);
          allSettled(promises).then(() => {
            setAppIsReady(true);
          })
        });

    } else {
      // For Admin users
      // TODO set events here
      setAppIsReady(true);
    }
  }

  useEffect(() => {
    loadInfo();
  }, [isSignedIn]);

  function LoadPage() {
    if (isSignedIn) {
      if (isAdmin.current) {
        return (
          <AdminNavigator />
        )
      }
      // Not Admin
      return (
        <UserNavigator />
      )
    }
    // User is not signed in
    return (
      <NewUserNavigator />
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
    Poppins_500Medium,
    Poppins_400Regular
  });

  if (!appIsReady || !fontsLoaded) {
    return null;
  }
  else {
    return (
      <View
        style={{ flex: 1 }}
        onLayout={onLayoutRootView}
      >
        <NavigationContainer>
          <AdminProvider
            value={{

            }}
          >
            <UrlProvider
              value={{
                professionalUrl: professionalUrl,
                setProf: setProf,
                socialUrl: socialUrl,
                setSocial: setSocial,
                funnyUrl: funnyUrl,
                setFunny: setFunny,
              }}
            >
              <LoginProvider
                value={{
                  isSignedIn: isSignedIn,
                  setSignIn: setSignIn,
                  appIsReady: appIsReady,
                  setAppIsReady: setAppIsReady,
                  currentUser: currentUser.current,

                  events: events,

                  isAdmin: isAdmin
                }}
              >
                <NewUserProvider
                  value={{
                    id: "",
                    firstname: "",
                    lastname: "",
                    chapter: "University of Texas",
                    pledgeClass: "",
                    dues: false,
                    attendance: 0,

                    major: "",
                    minor: "",

                    status: "",
                    role: "",

                    hometown: "",
                    activities: [],
                    bio: "",

                    email: "",
                    linkedin: "",
                    phone: "",

                    philanthropyPoints: 0,
                    professionalPoints: 0,
                    socialPoints: 0,
                    activeInterviews: 0,
                    submittedPoints: [],
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
                </NewUserProvider>
              </LoginProvider>
            </UrlProvider>
          </AdminProvider>
        </NavigationContainer>
      </View>
    );
  }
}

export default App;
