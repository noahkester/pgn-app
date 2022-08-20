// From React
import React, { useState, useEffect, useCallback, useRef } from "react";
import { View } from "react-native";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import colors from './styles/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Util imports
import {
  auth,
  getAdminSettingsPoints,
  db,
  getAllProfilePictures,
  getEvents,
} from "./utils/firebase";

// Context import
import { LoginProvider } from "./utils/LoginContext";
import { UrlProvider } from "./utils/UrlContext";
import { NewUserProvider } from "./utils/NewUserContext";
import { AdminProvider } from "./utils/AdminContext";

// Nav imports
import AdminNavigator from "./Navigation/AdminNavigation";
import NewUserNavigator from "./Navigation/NewUserNavigation";
import UserNavigator from "./Navigation/UserNavigation";

const Stack = createNativeStackNavigator();

function App() {
  const [user, setUser] = useState();

  const [color, setColor] = useState("#C57035");
  const [events, setEvents] = useState({
    todayEvents: [],
    upcomingEvents: [],
    ongoingEvents: [],
    allEvents: [],
  });

  // States used for rendering app and checking for user sign-in status
  const [appIsReady, setAppIsReady] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const adminPoints = useRef({});
  const adminRoles = useRef({});

  const [professionalUrl, setProfessionalUrl] = useState("");
  const [socialUrl, setSocialUrl] = useState("");
  const [funnyUrl, setFunnyUrl] = useState("");

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
    auth.onAuthStateChanged((user) => {
      if (!user || !user.emailVerified) {
        setUser(user);
        setAppIsReady(true);
        return;
      }
      setUser(user);
    });
  }, []);

  async function loadUserInfo() {
    // colors here
    const color1 = await AsyncStorage.getItem('@colorTheme');
    if (color1 != null) {
      setColor(color1);
    }

    getEvents().then((returnedEvents) => {
      setEvents(returnedEvents);
    });
    getAdminSettingsPoints().then((points) => {
      adminPoints.current = points;
    });
    db.collection("users")
      .doc(auth.currentUser.uid)
      .onSnapshot((doc) => {
        if (!doc.exists) {
          console.log("New user account not created");
          return;
        }
        var data = doc.data();
        setCurrentUser(data);
        getAllProfilePictures(data.id).then((urls) => {
          setProfessionalUrl(urls.professionalUrl);
          setSocialUrl(urls.socialUrl);
          setFunnyUrl(urls.funnyUrl);
          setAppIsReady(true);
        });
      });
  }

  async function loadAdminInfo() {
    getAdminSettingsPoints().then((points) => {
      getEvents().then((returnedEvents) => {
        setEvents(returnedEvents);
      });
      console.log(points);
      adminPoints.current = points;
      setAppIsReady(true);
    });
  }

  useEffect(() => {
    if (user) {
      if (user.email === "pgn.utexas.sudo@gmail.com") {
        loadAdminInfo();
        return;
      }
      loadUserInfo();
    }
  }, [user]);

  function RootRouter() {
    if (!user || !user.emailVerified) {
      /*add code to check if user exists in users/ */
      return <NewUserNavigator />;
    }
    if (user.email === "pgn.utexas.sudo@gmail.com") {
      return <AdminNavigator />;
    }
    return <UserNavigator />;
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
    Poppins_400Regular,
  });

  if (!appIsReady || !fontsLoaded) {
    return null;
  } else {
    return (
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <AdminProvider
            value={{
              points: adminPoints.current,
              roles: adminRoles.current,
            }}
          >
            <UrlProvider
              value={{
                professionalUrl: professionalUrl,
                setProf: setProfessionalUrl,
                socialUrl: socialUrl,
                setSocial: setSocialUrl,
                funnyUrl: funnyUrl,
                setFunny: setFunnyUrl,
              }}
            >
              <LoginProvider
                value={{
                  appIsReady: appIsReady,
                  setAppIsReady: setAppIsReady,
                  currentUser: currentUser,
                  setCurrentUser: setCurrentUser,
                  events: events,
                  color: color,
                  setColor: setColor,
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
                    <Stack.Screen name="Router" component={RootRouter} />
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
