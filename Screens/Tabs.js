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
  const adminContext = useContext(AdminContext);
  return (
    <View style={{}}>
      <View style={{ marginTop: 32, marginBottom: (adminContext.points.activateDuesBanner && !loginContext.currentUser.dues)  ? 32: 0,width: "100%", height: 120, flexDirection: "row", justifyContent: "space-between", alignItems: 'center', backgroundColor: "#FFFFFF", paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#DBDBDB' }}>
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
      {(adminContext.points.activateDuesBanner && !loginContext.currentUser.dues) ?
        <View style={{ position: 'absolute', bottom: 0, zIndex: 999, width: '100%', height: 30, backgroundColor: '#E35B56', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#FFFFFF' }}>{`Membership dues deadline: ${unixEpochTimeToMonthDay(adminContext.points.duesDeadline)}`}</Text>
        </View> : null
      }
    </View>
  );
}

export function Profile(props) {
  const navigation = useNavigation();
  const loginContext = useContext(LoginContext);
  const color = loginContext.color;
  return (
    <View style={{ width: 100, height: 120, flexDirection: "column", alignItems: "center", justifyContent: "center", textAlignVertical: 'top' }}>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <View style={{ width: 80, height: 80, backgroundColor: color, borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={props.profileUrl ? { uri: props.profileUrl } : require("../images/account.png")}
            resizeMode="cover"
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export function NavigationPage() {
  const Tab = createBottomTabNavigator();
  const adminContext = useContext(AdminContext);
  const loginContext = useContext(LoginContext);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF'
      }}
    >
      <TopBar />
      <Tab.Navigator
        sceneContainerStyle={{
          backgroundColor: '#FFFFFF',
        }}
        screenOptions={{
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: globalStyles.colors,
            height: '15%',
          },

          tabBarActiveTintColor: loginContext.color,
          headerShown: false,
          tabBarInactiveTintColor: colors.darkGray,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            tabBarLabelStyle : {
              bottom: "6%",
        
            },
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
            tabBarLabelStyle : {
              bottom: "6%",
        
            },
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
            tabBarLabelStyle : {
              bottom: "6%",
        
            },
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
            tabBarLabelStyle : {
              bottom: "6%",
        
            },
            tabBarLabel: "Attendance",
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
