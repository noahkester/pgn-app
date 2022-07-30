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
function TodayEvent(props) {
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
      style={{ borderWidth: 1, marginTop: 5, marginBottom: 5, width: '85%', borderColor: '#DBDBDB', borderRadius: 10 }}
    >
      <View style={{ backgroundColor: '#FAFAFA', borderBottomWidth: 1, borderColor: '#DBDBDB', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626', paddingLeft: 10, paddingTop: 6, paddingBottom: 6 }}>Today</Text>
      </View>
      <View style={{ width: '100%', flexDirection: 'row', paddingLeft: 10, paddingRight: 10, paddingTop: 16, paddingBottom: 16 }}>
        <EventImage icon={icon} />
        <View style={styles.eventText}>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626', width: 180 }}>{props.name}</Text>
          <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 12, color: '#262626' }}>{props.location + ' ' + props.weight + points}</Text>
        </View>
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
      style={{ borderWidth: 1, marginTop: 5, marginBottom: 5, width: '85%', borderColor: '#DBDBDB', borderRadius: 10 }}
    >
      <View style={{ width: '100%', flexDirection: 'row', paddingLeft: 10, paddingRight: 10, paddingTop: 16, paddingBottom: 16 }}>
        <EventImage icon={icon} />
        <View style={styles.eventText}>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626', width: 180 }}>{props.name}</Text>
          <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 12, color: '#262626' }}>{props.location + ' ' + props.weight + points}</Text>
        </View>
        {
          (props.time === 0) ?
            <Text style={globalStyles.smallBoldText}>{props.weight + points}</Text> :
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[globalStyles.smallSemiBoldText, styles.date]}>
                {unixEpochTimeToMonthDay(props.time)}
              </Text>
              <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626' }}>{unixEpochTimeToClock(props.time)}</Text>
            </View>
        }
      </View>
    </View>
  );
}
export function EventSection(props) {
  const events = props.events;
  var noEvents = false;
  const eventsList = events.map((event) => (
    props.today ?
      <TodayEvent
        key={event.label}
        name={event.label}
        type={event.type}
        weight={event.weight}
        location={event.location}
        time={('time' in event) ? event.time : 0}
      />
      :
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
    <View style={{ width: '100%', alignItems: 'center' }}>
      <View>
        {eventsList}
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
          <EventSection today={true} time="Today" events={todayEvents.current} />
          <View style={{ width: '90%', height: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#DBDBDB' }} />
          <EventSection today={false} time="Tomorrow" events={tomorrowEvents.current} />
          <View style={{ width: '90%', height: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#DBDBDB' }} />
          <EventSection today={false} time="Future" events={futureEvents.current} />
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
    width: "100%",
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
