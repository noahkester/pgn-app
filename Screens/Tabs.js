import { Text, Image, View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FoundationIcon from 'react-native-vector-icons/Foundation';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";

import { HomePage } from "./Home";
import { EventsPage } from "./Events";
import { PeoplePage } from "./People";
import { ChatPage } from './Chat';
import { AttendancePage } from './Attendance';

import LoginContext from "../utils/LoginContext";
import UrlContext from "../utils/UrlContext";
import AdminContext from "../utils/AdminContext";

import globalStyles from "../styles/Styles";
import colors from "../styles/Colors";
import { unixEpochTimeToMonthDay } from '../utils/time'

export function TopBar(props) {
  const loginContext = useContext(LoginContext);
  const urlContext = useContext(UrlContext);
  const currentUser = loginContext.currentUser;
  const profileUrl = urlContext.professionalUrl;
  return (
    <View>
      <View style={{ marginTop: 32, width: "100%", height: 160, flexDirection: "row", justifyContent: "space-between", alignItems: 'center', backgroundColor: "#FFFFFF", paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#DBDBDB' }}>
        <Profile
          name={currentUser.firstname}
          class={currentUser.pledgeClass}
          profileUrl={profileUrl}
        />
        <Image
          source={require("../images/pgn.png")}
          resizeMode="cover"
          style={{ width: 100, height: 100 }}
        />

      </View>
    </View>
  );
}

export function Profile(props) {
  const navigation = useNavigation();

  return (
    <View style={{ width: 100, height: 120, flexDirection: "column", alignItems: "center", justifyContent: "center", textAlignVertical: 'top' }}>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <Image
          source={props.profileUrl ? { uri: props.profileUrl } : require("../images/profile.png")}
          resizeMode="cover"
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
      </TouchableOpacity>
    </View>
  );
}

export function NavigationPage() {
  const Tab = createBottomTabNavigator();
  const adminContext = useContext(AdminContext);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF'
      }}
    >
      <TopBar />
      {(adminContext.points.activateDuesBanner) ?
        <View style={{ position: 'absolute', top: 192, zIndex: 999, width: '100%', height: 30, backgroundColor: '#E35B56', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#FFFFFF' }}>{`Membership dues deadline: ${unixEpochTimeToMonthDay(adminContext.points.duesDeadline)}`}</Text>
        </View> : null
      }
      <Tab.Navigator
        sceneContainerStyle={{
          backgroundColor: '#FFFFFF',
        }}
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: globalStyles.colors,
            height: 100,
          },

          tabBarActiveTintColor: colors.universityColor,
          headerShown: false,
          tabBarInactiveTintColor: colors.darkGray,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            tabBarIcon: ({ color }) => {
              return (
                <FoundationIcon
                  name="home"
                  color={color}
                  size={40}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Events"
          component={EventsPage}
          options={{
            tabBarLabel: "Events",
            tabBarIcon: ({ color }) => {
              return (
                <FontAwesome5Icon
                  name="calendar-day"
                  color={color}
                  size={32}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="People"
          component={PeoplePage}
          options={{
            tabBarLabel: "People",
            tabBarIcon: ({ color }) => {
              return (
                <MaterialIcons
                  name="people-alt"
                  color={color}
                  size={40}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Chat"
          component={AttendancePage}
          options={{
            tabBarLabel: "Chat",
            tabBarIcon: ({ color }) => {
              return (
                /*<MaterialIcons
                  name='leaderboard'
                  color={color}
                  size={36}
                />*/
                <MaterialCommunityIcons
                  name="clock-check"
                  color={color}
                  size={36}
                  style={{}}
                />
              );
            }
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
