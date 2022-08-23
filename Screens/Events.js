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
    //console.log('strange error');
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
      style={{ backgroundColor: '#FFFFFF', borderWidth: 1, width: '90%', borderColor: '#DBDBDB', borderTopWidth: 0 }}
    >
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
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2, marginBottom: 10 }}>
            {(props.time == 0) ? null :
              <MaterialCommunityIcons
                name="clock-outline"
                color={'#8E8E8E'}
                size={20}
                style={{ marginRight: 4 }}
              />
            }
            {(props.time == 0) ? null :
              <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12, color: '#8E8E8E' }}>{unixEpochTimeToMonthDay(props.time) + ', ' + unixEpochTimeToClock(props.time)}</Text>
            }
            {(props.location === '') ? null :
              <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12, color: '#8E8E8E' }}>{'• ' + props.location}</Text>
            }
          </View>
        </View>
      </View>
      <Text style={{ position: 'absolute', bottom: 3, right: 10, fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#85C67E' }}>{props.weight + points}</Text>
    </View >
  );
}
export function EventSection(props) {
  const events = props.events;
  events.sort((a, b) => a.time - b.time);
  const eventsList = events.map((event, index) => (
    <Event
      key={index}
      name={event.label}
      type={event.type}
      weight={event.weight}
      location={('location' in event) ? event.location : ''}
      time={('time' in event) ? event.time : 0} //TODO Jank code
    />
  ));
  return (
    (events.length > 0) ?
      <View style={{ width: '100%', alignItems: 'center', backgroundColor: '#FAFAFA' }}>
        <View style={{ width: '90%', borderWidth: 1, padding: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderColor: '#DBDBDB', backgroundColor: '#FFFFFF' }}>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 18, color: '#262626' }}>{props.label}</Text>
        </View>
        <View>
          {eventsList}
        </View>
      </View>
      : null
  );
}

export function EventsPage() {
  const loginContext = useContext(LoginContext);
  function UpcomingEvents() {

    // TODO conditionally render line
    return (
      <ScrollView style={{ width: "100%" }}>
        <View style={{ alignItems: "center" }}>
          <EventSection label={'Today'} events={loginContext.events.todayEvents} />
          <View style={{ width: '90%', height: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#DBDBDB' }} />
          <EventSection label={'Upcoming'} events={loginContext.events.upcomingEvents} />
        </View>
      </ScrollView>
    );
  }

  function OngoingEvents() {

    return (
      <ScrollView style={globalStyles.scroll}>
        <View style={globalStyles.scrollView}>
          <EventSection label={'Ongoing'} today={false} events={loginContext.events.ongoingEvents} />
        </View>
      </ScrollView>
    );
  }

  function AllEvents() {
    return (
      <ScrollView style={globalStyles.scroll}>
        <View style={globalStyles.scrollView}>
          <EventSection label={'All Events'} today={false} events={loginContext.events.allEvents} />
        </View>
      </ScrollView>
    );
  }

  const Tab = createMaterialTopTabNavigator();

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
              backgroundColor: loginContext.color,
              left: 20,
              width: "23.5%",
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
            name="Ongoing"
            children={OngoingEvents}
            options={{ tabBarLabel: "Ongoing" }}
          />
          <Tab.Screen
            name="View All"
            children={AllEvents}
            options={{ tabBarLabel: "View All" }}
          />
        </Tab.Navigator>

      </View>
    </View>
  );
}