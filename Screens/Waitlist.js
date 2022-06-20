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
import { TopBar } from "./Tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
//import TabBarTop from "@react-navigation/material-top-tabs/lib/typescript/src/views/MaterialTopTabBar";

const Tab = createMaterialTopTabNavigator();
/*const completed = allEvents.reduce((events, event) => {
  if (event.completed == "T") {
    events.push(event);
  }
  return events;
}, []);

const declined = allEvents.reduce((events, event) => {
  if (event.completed == "F") {
    events.push(event);
  }
  return events;
}, []);

const waiting = allEvents.reduce((events, event) => {
  if (event.completed == "W") {
    events.push(event);
  }
  return events;
}, []);
*/

const completed = [];
const declined = [];
const waiting = [];
function WaitScreen() {
  return (
    <View style={styles.eventScreen}>
      {/* <TopBar /> */}
      <ScrollView style={globalStyles.scroll}>
        <View style={globalStyles.scrollView}>
          <EventSection events={waiting} />
          {/* <EventSection time="Tomorrow" events={allEvents} />
          <EventSection time="Future" events={allEvents} /> */}
        </View>
      </ScrollView>
    </View>
  );
}

function AcceptedScreen() {
  return (
    <View style={styles.eventScreen}>
      {/* <TopBar /> */}
      <ScrollView style={globalStyles.scroll}>
        <View style={globalStyles.scrollView}>
          <EventSection events={completed} />
          {/* <EventSection time="Tomorrow" events={allEvents} />
            <EventSection time="Future" events={allEvents} /> */}
        </View>
      </ScrollView>
    </View>
  );
}

function DeclinedScreen() {
  return (
    <View style={styles.eventScreen}>
      {/* <TopBar /> */}
      <ScrollView style={globalStyles.scroll}>
        <View style={globalStyles.scrollView}>
          <EventSection events={declined} />
          {/* <EventSection time="Tomorrow" events={allEvents} />
            <EventSection time="Future" events={allEvents} /> */}
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
  screenOps : {
    tabBarStyle: {
      shadowOffset: { width: 0, height: 0 },
    },
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: "black",
    tabBarLabelStyle: globalStyles.smallBoldText,

    tabBarIndicatorStyle: {
      backgroundColor: "#C57035",
      left: 20,
      width: '23.5%',
      height: "60%",
      borderRadius: 30,
      marginBottom: 10,
      
    },
  },
});
