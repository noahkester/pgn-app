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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import { unixEpochTimeToClock, unixEpochTimeToMonthDay } from '../utils/time';
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
    <View style={{ marginRight: 10 }}>
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
  } else if (props.type === "Interview") {
    icon = require("../images/interview.png");
  } else {
    console.log('strange error');
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
        <Text style={[globalStyles.smallSemiBoldText, { width: 180 }]}>{props.name}</Text>
        <Text style={globalStyles.smallBoldText}>{props.location}</Text>
      </View>
      {
        (props.time === 0) ?
          <Text style={globalStyles.smallBoldText}>{props.weight + points}</Text> :
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={[globalStyles.smallSemiBoldText, styles.date]}>
              {unixEpochTimeToMonthDay(props.time)}
            </Text>
            <Text style={globalStyles.smallBoldText}>{unixEpochTimeToClock(props.time)}</Text>
            <Text style={globalStyles.smallBoldText}>{props.weight + points}</Text>
          </View>
      }
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
      time={('time' in event) ? event.time : 0}
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
        {noEvents ? (
          <Text style={[globalStyles.smallBoldText, styles.noEventsText]}>
            No Events
          </Text>
        ) : null}
      </View>
    </View>
  );
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
  const navigation = useNavigation();
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
        <TouchableOpacity
          style={[{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 30, position: 'absolute', bottom: 12, right: 12 }, globalStyles.universityColorFill]}
          onPress={() => {
            navigation.navigate("Attendance");
          }}
        >
          <MaterialCommunityIcons
            name="clipboard-text-clock"
            color={'#FFFFFF'}
            size={42}
            style={{}}
          />
        </TouchableOpacity>
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
