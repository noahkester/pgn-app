import {
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Image,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { EventSection } from "./Events";
import globalStyles from "../styles/Styles";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useEffect, useRef, useContext, useState, useCallback } from "react";
import { db, auth, store } from "../utils/firebase";
import LoginContext from "../utils/LoginContext";
import colors from '../styles/Colors'
const Tab = createMaterialTopTabNavigator();
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

//TODO: Add SnapShot Listener so it can get updates.
function WaitScreen() {
  const loginContext = useContext(LoginContext);
  const curUser = loginContext.currentUser;
  const [waiting, setWaiting] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((doc) => {
        loginContext.currentUser = doc.data();
        db.collection("points")
          .where('__name__', 'in', curUser.submittedPoints)
          .get()
          .then((querySnapshot) => {
            var tempWaiting = []
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              if (data.status == "waiting")
                tempWaiting.push(data)
            });
            setWaiting(tempWaiting);
          })
      })
  }, [refreshing])

  return (
    <View style={styles.eventScreen}>
      <ScrollView
        style={globalStyles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={globalStyles.scrollView}>
          <EventSection events={waiting} />
        </View>
      </ScrollView>
    </View>
  );
}

function AcceptedScreen() {
  const loginContext = useContext(LoginContext);
  const curUser = loginContext.currentUser;
  const [accepted, setAccepted] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((doc) => {
        loginContext.currentUser = doc.data();
        db.collection("points")
          .where('__name__', 'in', curUser.submittedPoints)
          .get()
          .then((querySnapshot) => {
            var tempAccepted = []
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              if (data.status == "accepted")
                tempAccepted.push(data)
            });
            setAccepted(tempAccepted);
          })
      })
  }, [refreshing])
  return (
    <View style={styles.eventScreen}>
      <ScrollView
        style={globalStyles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={globalStyles.scrollView}>
          <EventSection events={accepted} />
        </View>
      </ScrollView>
    </View>
  );
}

function DeclinedScreen() {
  const loginContext = useContext(LoginContext);
  const curUser = loginContext.currentUser;
  const [rejected, setRejected] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((doc) => {
        loginContext.currentUser = doc.data();
        db.collection("points")
          .where('__name__', 'in', curUser.submittedPoints)
          .get()
          .then((querySnapshot) => {
            var tempRejected = []
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              if (data.status == "rejected")
                tempRejected.push(data)
            });
            setRejected(tempRejected);
          })
      })
  }, [refreshing])
  return (
    <View style={styles.eventScreen}>
      <ScrollView
        style={globalStyles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={globalStyles.scrollView}>
          <EventSection events={rejected} />
        </View>
      </ScrollView>
    </View>
  );
}

function TopTab() {


  return (
    <View style={styles.eventScreen}>
      <View style={{ width: "100%", height: "100%" }}>
        <Tab.Navigator
          sceneContainerStyle={{
            backgroundColor: colors.white,
          }}
          screenOptions={styles.screenOps}
        >
          <Tab.Screen
            name="Waitlist"
            component={WaitScreen}
            options={{ tabBarLabel: "Waiting" }}
          ></Tab.Screen>
          <Tab.Screen
            name="Accepted"
            component={AcceptedScreen}
            options={{ tabBarLabel: "Accepted" }}
          ></Tab.Screen>
          <Tab.Screen
            name="Denied"
            component={DeclinedScreen}
            options={{ tabBarLabel: "Rejected" }}
          ></Tab.Screen>
        </Tab.Navigator>
      </View>
    </View>
  );
}
export function WaitlistPage() {
  return <TopTab />;
}
const styles = StyleSheet.create({
  eventScreen: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  screenOps: {
    tabBarStyle: {
      shadowOffset: { width: 0, height: 0 },
    },
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: "black",
    tabBarLabelStyle: { fontFamily: 'Poppins_600SemiBold', fontSize: 12 },

    tabBarIndicatorStyle: {
      backgroundColor: colors.universityColor,
      left: 20,
      width: "23.5%",
      height: "60%",
      borderRadius: 30,
      marginBottom: 10,
    },
  },
});