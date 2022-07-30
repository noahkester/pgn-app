import { TouchableOpacity, Text, Image, View, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";

import globalStyles from "../styles/Styles";
import LoginContext from "../utils/LoginContext";
import { unixEpochTimeToClock, unixEpochTimeToMonthDay } from '../utils/time';

function EventImage(props) {
  return (
    <View style={{ marginRight: 10 }}>
      <View style={{ height: 50, width: 50, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={props.icon}
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
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
      <View style={{ backgroundColor: '#FAFAFA', borderBottomWidth: 1, borderColor: '#DBDBDB', borderTopLeftRadius: 10, borderTopRightRadius: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626', paddingLeft: 10, paddingTop: 6, paddingBottom: 6 }}>Today</Text>
        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626', paddingRight: 10, paddingTop: 6, paddingBottom: 6 }}>{unixEpochTimeToClock(props.time)}</Text>
      </View>
      <View style={{ width: '100%', flexDirection: 'row', paddingLeft: 10, paddingRight: 10, paddingTop: 16, paddingBottom: 16 }}>
        <EventImage icon={icon} />
        <View style={{ flexDirection: 'column', flex: 1, width: "60%", justifyContent: "center", alignSelf: "center" }}>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626', width: 180 }}>{props.name}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 12, color: '#262626' }}>{props.location + ' '}</Text>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12, color: '#85C67E' }}>{props.weight + points}</Text>
          </View>
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
        <View style={{ flexDirection: 'column', flex: 1, width: "60%", justifyContent: "center", alignSelf: 'center' }}>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626', width: 180 }}>{props.name}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 12, color: '#262626' }}>{props.location + ' '}</Text>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12, color: '#85C67E' }}>{props.weight + points}</Text>
          </View>
        </View>
        {
          (props.time === 0) ? null :
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[globalStyles.smallSemiBoldText, { textAlign: "right" }]}>
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
          {(todayEvents.current.length === 0) ? null :
            <View style={{ width: '90%', height: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#DBDBDB' }} />
          }
          <EventSection today={false} time="Tomorrow" events={tomorrowEvents.current} />
          {(tomorrowEvents.current.length === 0) ? null :
            <View style={{ width: '90%', height: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#DBDBDB' }} />
          }
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
          <EventSection today={false} time="Extra" events={extraEvents.current} />
        </View>
      </ScrollView>
    );
  }

  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "space-between" }}>
      <View style={{ width: "100%", height: "100%" }}>
        <Tab.Navigator
          initialRouteName="Upcoming"
          sceneContainerStyle={{
            backgroundColor: '#FFFFFF',
          }}
          screenOptions={{
            tabBarStyle: {
              shadowOffset: { width: 0, height: 0 },
            },
            tabBarActiveTintColor: "#FFFFFF",
            tabBarInactiveTintColor: "#262626",
            tabBarLabelStyle: { fontFamily: 'Poppins_600SemiBold', fontSize: 12 },

            tabBarIndicatorStyle: {
              backgroundColor: "#C57035",
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
        <TouchableOpacity
          style={[{ width: 68, height: 68, borderWidth: 8, borderColor: '#F2DDCE', alignItems: 'center', justifyContent: 'center', borderRadius: 34, position: 'absolute', bottom: 12, right: 12 }, globalStyles.universityColorFill]}
          onPress={() => {
            navigation.navigate("Attendance");
          }}
        >
          <MaterialCommunityIcons
            name="clock-check"
            color={'#FFFFFF'}
            size={36}
            style={{}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}