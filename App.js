// From React
import React, { useState, useEffect, useCallback, useRef } from "react";
import { View } from "react-native";
import { useFonts, Poppins_600SemiBold, Poppins_700Bold, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";

// Screens and Page imports
import { LoginSignupPage } from "./Screens/loginSignup/LoginSignup";
import { LoginPage } from "./Screens/loginSignup/Login";
import { CreateAccountPage } from "./Screens/loginSignup/CreateAccount";
import { NavigationPage } from "./Screens/Tabs";
import { AccountPage } from "./Screens/Account";
import { SubmitPage } from "./Screens/Submit";
import { AdminEventsPage } from "./Screens/adminUser/AdminEvents";
import { NamePage } from "./Screens/newUser/Name";
import { EducationPage } from "./Screens/newUser/Education";
import { ProfilePicturesPage } from "./Screens/newUser/ProfilePictures";
import { AboutPage } from "./Screens/newUser/About";
import { ContactPage } from "./Screens/newUser/Contact";
import { EmailVerificationPage } from "./Screens/newUser/EmailVerification";
import { PersonPage } from "./Screens/Person";
import { AccountImageUploadPage } from "./Screens/AccountImageUpload";
import { AddEventPage } from './Screens/adminUser/AddEvent';
import { AddCodePage } from './Screens/adminUser/AddCode';
import { SubmitAttendancePage } from './Screens/SubmitAttendance';
import { AttendancePage } from './Screens/Attendance';
import { AdminSettingsPage } from './Screens/adminUser/AdminSettings';
import { ViewPeoplePage } from "./Screens/adminUser/ViewPeople";
import { AdminTabsPage } from './Screens/adminUser/AdminTabs';
import { WaitlistPage } from "./Screens/Waitlist";
import { ColorThemePage } from './Screens/ColorTheme';
import { SocialPostScreen } from './Screens/SocialPost';


// Util imports
import { auth, getCurrentUser, db, store } from "./utils/firebase";
import { findTimeCategory } from "./utils/time";

// Context import
import { LoginProvider } from './utils/LoginContext';
import { UrlProvider } from './utils/UrlContext';
import { NewUserProvider } from './utils/NewUserContext';
import { UnknownUserPage } from "./Screens/newUser/UnknownUser";

const Stack = createNativeStackNavigator();
var allSettled = require('promise.allsettled');

function App() {
  // Persistant references used throughout the app
  const pastEvents = useRef([]);
  const todayEvents = useRef([]);
  const futureEvents = useRef([]);
  const ongoingEvents = useRef([]);

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
      var tempPastEvents = [];
      var tempTodayEvents = [];
      var tempFutureEvents = [];
      var tempOngoingEvents = [];

      db.collection("users")
        .doc(auth.currentUser.uid)
        .onSnapshot((doc) => {
          var data = doc.data();
          currentUser.current = data;

          db.collection("events")
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                var data1 = doc.data();
                var timeCategory = findTimeCategory(data1.time);
                switch (timeCategory) {
                  case -2:
                    tempPastEvents.push(data1);
                    break;
                  case -1:
                    tempOngoingEvents.push(data1);
                    break;
                  case 0:
                    tempTodayEvents.push(data1);
                    break;
                  case 1:
                    tempFutureEvents.push(data1);
                    break;
                }
              });

              pastEvents.current = tempPastEvents;
              todayEvents.current = tempTodayEvents;
              futureEvents.current = tempFutureEvents;
              ongoingEvents.current = tempOngoingEvents;
            });
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
      db.collection("events")
        .get()
        .then((querySnapshot) => {
          var tempAllEvents = []; //TODO FIX
          querySnapshot.forEach((doc) => {
            var data = doc.data();
            tempAllEvents.push(data);
          });
          allEvents.current = tempAllEvents;
          setAppIsReady(true);
        });
    }
  }

  useEffect(() => {
    loadInfo();
  }, [isSignedIn]);

  function LoadPage() {
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
            <Stack.Screen name="Admin" component={AdminTabsPage} />
            <Stack.Screen name="AdminEvents" component={AdminEventsPage} />
            <Stack.Screen name="AddEvent" component={AddEventPage} />
            <Stack.Screen name="AddCode" component={AddCodePage} />
            <Stack.Screen name="View" component={ViewPeoplePage} />
            <Stack.Screen name="AdminSettings" component={AdminSettingsPage} />
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
          <Stack.Screen name="Waitlist" component={WaitlistPage} />
          <Stack.Screen name="Account" component={AccountPage} />
          <Stack.Screen name="AccountImageUpload" component={AccountImageUploadPage} />
          <Stack.Screen name="Theme" component={ColorThemePage} />
          <Stack.Screen name="Submit" component={SubmitPage} />
          <Stack.Screen name="SubmitAttendance" component={SubmitAttendancePage} />
          <Stack.Screen name="Attendance" component={AttendancePage} />
          <Stack.Screen name="Person" component={PersonPage} />
          <Stack.Screen name="Post" component={SocialPostScreen} />
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
        <Stack.Screen name="LoginSignup" component={LoginSignupPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="CreateAccount" component={CreateAccountPage} />

        <Stack.Screen name="Name" component={NamePage} />
        <Stack.Screen name="UnknownUser" component={UnknownUserPage} />
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
          <UrlProvider
            value={{
              'professionalUrl': professionalUrl,
              'setProf': setProf,
              'socialUrl': socialUrl,
              'setSocial': setSocial,
              'funnyUrl': funnyUrl,
              'setFunny': setFunny,
            }}
          >
            <LoginProvider
              value={{
                'isSignedIn': isSignedIn,
                'setSignIn': setSignIn,
                'appIsReady': appIsReady,
                'setAppIsReady': setAppIsReady,
                'currentUser': currentUser.current,
                'pastEvents': pastEvents.current,
                'todayEvents': todayEvents.current,
                'futureEvents': futureEvents.current,
                'ongoingEvents': ongoingEvents.current,
                'isAdmin': isAdmin
              }}
            >
              <NewUserProvider
                value={{
                  id: "",
                  firstname: "",
                  lastname: "",
                  chapter: "University of Texas",
                  pledgeClass: "",

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
        </NavigationContainer>
      </View>
    );
  }
}

export default App;
