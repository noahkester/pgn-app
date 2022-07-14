import {
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Image,
  View,
  ScrollView,
} from "react-native";
import { EventSection } from "./Events";
import globalStyles from "../Styles";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useEffect, useRef, useContext } from "react";
import { db, auth } from "../firebase";
import { LoginContext } from "../App";

const Tab = createMaterialTopTabNavigator();

//TODO: Add SnapShot Listener so it can get updates.
function WaitScreen() {
  const curUser = useContext(LoginContext)[2];
  const allSubmittedEvents = curUser.submittedPoints;

  const waiting = allSubmittedEvents.reduce((events, event) => {
    if (event.status == "waiting") {
      events.push(event);
    }
    return events;
  }, []);
  return (
    <View style={styles.eventScreen}>
      <ScrollView style={globalStyles.scroll}>
        <View style={globalStyles.scrollView}>
          <EventSection events={waiting} />
        </View>
      </ScrollView>
    </View>
  );
}

function AcceptedScreen() {
  const curUser = useContext(LoginContext)[2];
  const allSubmittedEvents = curUser.submittedPoints;

  const completed = allSubmittedEvents.reduce((events, event) => {
    if (event.status == "completed") {
      events.push(event);
    }
    return events;
  }, []);
  return (
    <View style={styles.eventScreen}>
      <ScrollView style={globalStyles.scroll}>
        <View style={globalStyles.scrollView}>
          <EventSection events={completed} />
        </View>
      </ScrollView>
    </View>
  );
}

function DeclinedScreen() {
  const curUser = useContext(LoginContext)[2];
  const allSubmittedEvents = curUser.submittedPoints;

  const declined = allSubmittedEvents.reduce((events, event) => {
    if (event.status == "declined") {
      events.push(event);
    }
    return events;
  }, []);
  return (
    <View style={styles.eventScreen}>
      <ScrollView style={globalStyles.scroll}>
        <View style={globalStyles.scrollView}>
          <EventSection events={declined} />
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
            options={{ tabBarLabel: "Declined" }}
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
    tabBarLabelStyle: globalStyles.smallBoldText,

    tabBarIndicatorStyle: {
      backgroundColor: "#C57035",
      left: 20,
      width: "23.5%",
      height: "60%",
      borderRadius: 30,
      marginBottom: 10,
    },
  },
});
