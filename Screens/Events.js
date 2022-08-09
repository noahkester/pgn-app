import { TouchableOpacity, Text, Image, View, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";

import globalStyles from "../styles/Styles";
import LoginContext from "../utils/LoginContext";
import { unixEpochTimeToClock, findTimeCategory, unixEpochTimeToMonthDay } from '../utils/time';
import colors from "../styles/Colors";

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
  const isToday = findTimeCategory(props.time) == 0;

  return (
    <View
      style={{ backgroundColor: '#FFFFFF', borderWidth: 1, marginTop: 10, marginBottom: 10, width: '90%', borderColor: '#DBDBDB', borderRadius: 10 }}
    >
      {(isToday) ?
        <View style={{ borderBottomWidth: 1, borderColor: '#DBDBDB', height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 16, paddingRight: 16 }}>

          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 18 }}>{/*unixEpochTimeToMonthDay(props.time)*/'Today'}</Text>
          <Text style={{ marginLeft: 10, fontFamily: 'Poppins_600SemiBold', fontSize: 18 }}>{unixEpochTimeToClock(props.time)}</Text>

        </View> : null}
      <View style={{ width: '100%', flexDirection: 'row', paddingLeft: 16, paddingTop: 16, paddingBottom: 16 }}>
        <View style={{ marginRight: 10 }}>
          <View style={{ height: 50, width: 50, alignItems: "center", justifyContent: "center" }}>
            <Image
              source={icon}
              resizeMode="contain"
              style={{ width: 50, height: 50 }}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'column', flex: 1, width: "60%", justifyContent: "center", alignSelf: 'center' }}>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 18, color: '#262626', width: 180 }}>{props.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
            <MaterialCommunityIcons
              name="clock-outline"
              color={'#8E8E8E'}
              size={20}
              style={{ marginRight: 4 }}
            />
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12, color: '#8E8E8E' }}>{unixEpochTimeToMonthDay(props.time) + ', ' + unixEpochTimeToClock(props.time)}</Text>
            {(props.location === '') ? null :
              <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12, color: '#8E8E8E' }}>{'• ' + props.location}</Text>
            }
          </View>
        </View>
      </View>
      <Text style={{ position: 'absolute', bottom: 6, right: 10, fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#85C67E' }}>{props.weight + points}</Text>
    </View >
  );
}
export function EventSection(props) {
  const events = props.events;
  events.sort((a, b) => a.time > b.time ? -1 : 1);
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
  return (
    <View style={{ width: '100%', alignItems: 'center', backgroundColor: '#FAFAFA' }}>
      <View>
        {eventsList}
      </View>
    </View>
  );
}

export function EventsPage() {

  function UpcomingEvents() {
    const loginContext = useContext(LoginContext);

    return (
      <ScrollView style={{ width: "100%" }}>
        <View style={{ alignItems: "center" }}>
          <EventSection events={loginContext.todayEvents.current} />
          <EventSection events={loginContext.tomorrowEvents.current} />
          <EventSection events={loginContext.futureEvents.current} />
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
          <EventSection today={false} time="Extra" events={extraEvents.current} />
        </View>
      </ScrollView>
    );
  }

  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "space-between", backgroundColor: '#FAFAFA' }}>
      <View style={{ width: "100%", height: "100%" }}>
        <Tab.Navigator
          initialRouteName="Upcoming"

          sceneContainerStyle={{
            backgroundColor: '#FAFAFA',
          }}
          screenOptions={{
            tabBarStyle: {
              shadowOffset: { width: 0, height: 0 },
              backgroundColor: '#FAFAFA'
            },
            tabBarActiveTintColor: "#FFFFFF",
            tabBarInactiveTintColor: "#262626",
            tabBarLabelStyle: { fontFamily: 'Poppins_600SemiBold', fontSize: 12 },

            tabBarIndicatorStyle: {
              backgroundColor: colors.universityColor,
              left: 40,
              width: "30.5%",
              height: "60%",
              borderRadius: 30,
              marginBottom: 10,
            },

          }}
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