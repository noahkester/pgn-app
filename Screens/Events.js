import { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  ScrollView,
} from "react-native";
import globalStyles from "../styles/Styles";
import { useContext } from "react";
import LoginContext from "../utils/LoginContext";
import { db } from "../utils/firebase";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
/*
Events Structure
{
  location: Insomnia cookies. Near Castilian
  name: Cold Cookie Profit Share
  time: 167394290
  type: Philanthropy
  weight: 1
}
*/

function EventImage(props) {
  return (
    <View style={{marginRight: 10}}>
      <View style={styles.iconCon}>
        <Image
          source={props.icon}
          resizeMode="contain"
          style={styles.eventImageIcon}
        />
      </View>
    </View>
  );
}
function Event(props) {
  var icon;
  if (props.type === "Philanthropy") {
    icon = require("../images/philanthropy.png");
  } else if (props.type === "Professional") {
    icon = require("../images/professional.png");
  } else if (props.type === "Social") {
    icon = require("../images/social.png");
  } else {
    //Uncaught error
  }
  var points = "";
  if (props.weight == 1) {
    points = " pt";
  } else {
    points = " pts";
  }

  return (
    <View
      style={[
        globalStyles.cardContainer,
        styles.eventCard,
        globalStyles.cardAlign,
      ]}
    >
      <EventImage icon={icon} />
      <View style={styles.eventText}>
        <Text style={[globalStyles.smallSemiBoldText, {width: 180}]}>{props.name}</Text>
        <Text style={globalStyles.smallBoldText}>{props.location}</Text>
      </View>
      <View>
        <Text style={[globalStyles.smallSemiBoldText, styles.date]}>
          {"3/7"}
        </Text>
        <Text style={globalStyles.smallBoldText}>{"3:30"}</Text>
        <Text style={globalStyles.smallBoldText}>{props.weight + points}</Text>
      </View>
    </View>
  );
}
export function EventSection(props) {
  const events = props.events;
  var noEvents = false;
  const eventsList = events.map((event) => (
    <Event
      key={event.label}
      name={event.label}
      type={event.type}
      weight={event.weight}
      location={event.location}
    />
  ));
  if (eventsList.length == 0) {
    noEvents = true;
  }
  return (
    <View style={styles.eventSection}>
      <Text style={[globalStyles.smallBoldText, styles.eventTime]}>
        {props.time}
      </Text>
      <View>
        {eventsList}
        {noEvents && (
          <Text style={[globalStyles.smallBoldText, styles.noEventsText]}>
            No Events
          </Text>
        )}
      </View>
    </View>
  );
}
function unixEpochTimeToMonthDay(timestamp) {
  var a = new Date(timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = month + " " + date;
  return time;
}

// Will return -1 for past date, 0 for current, 1 for tomorrow, 2 for future
// based on the current date
export function findTimeCategory(timestamp) {
  // convert from seconds to miliseconds (js Date library uses ms)
  timestamp *= 1000;
  var currentTime = Date.now();

  if (timestamp === 0) {
    return -1;
  } else if (timestamp < currentTime) {
    return -2;
  }
  var a = new Date(timestamp);
  var b = new Date(currentTime);
  // It is the current day
  if (
    a.getDate() == b.getDate() &&
    a.getMonth() == b.getMonth() &&
    a.getFullYear == b.getFullYear
  ) {
    return 0;
  }
  // It is tomorrow
  b = new Date((currentTime + 86400) * 1000);
  if (
    a.getDate() == b.getDate() &&
    a.getMonth() == b.getMonth() &&
    a.getFullYear == b.getFullYear
  ) {
    return 1;
  }
  // Day off in the future
  return 2;
}

export function EventsPage() {


  function UpcomingEvents() {
    const loginContext = useContext(LoginContext);
    const todayEvents = loginContext.todayEvents;
    const tomorrowEvents = loginContext.tomorrowEvents;
    const futureEvents = loginContext.futureEvents;

    return (
      <ScrollView style={globalStyles.scroll}>
        <View style={globalStyles.scrollView}>
          <EventSection time="Today" events={todayEvents.current} />
          <EventSection time="Tomorrow" events={tomorrowEvents.current} />
          <EventSection time="Future" events={futureEvents.current} />
        </View>
      </ScrollView>
    );
  }

  function ExtraEvents() {
    const loginContext = useContext(LoginContext);
    const extraEvents = loginContext.extraEvents;
    return (
      <ScrollView style={globalStyles.scroll}>
        <View style={globalStyles.scrollView}>
          <EventSection time="Extra" events={extraEvents.current} />
        </View>
      </ScrollView>
    );
  }
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={styles.eventScreen}>
      <View style={{ width: "100%", height: "100%" }}>
        <Tab.Navigator
          initialRouteName="Upcoming"
          sceneContainerStyle={{
            backgroundColor: colors.white,
          }}
          screenOptions={styles.screenOps}
        >
          <Tab.Screen
            name="Upcoming"
            children={UpcomingEvents}
            options={{ tabBarLabel: "Upcoming" }}
          />
          <Tab.Screen
            name="Extra"
            children={ExtraEvents}
            options={{ tabBarLabel: "Extra" }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  eventScreen: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  eventSection: {
    width: "80%",
  },
  eventCard: {
    marginBottom: 10,
  },
  eventTime: {
    marginBottom: 10,
  },
  eventImageBackground: {
    position: "absolute",
    width: 50,
    height: 50,
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
      left: 40,
      width: "30.5%",
      height: "60%",
      borderRadius: 30,
      marginBottom: 10,
    },
  },
  eventImageIcon: {
    width: 50,
    height: 50,
  },
  iconCon: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  date: {
    textAlign: "right",
  },
  eventText: {
    flexDirection: 'column',
    flex: 1,
    width: "60%",
    justifyContent: "center",
    alignSelf: "center",
  },
  noEventsText: {
    textAlign: "center",
    marginBottom: 10,
  },
});
