import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FoundationIcon from 'react-native-vector-icons/Foundation';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";

import { HomePage } from "./Home";
import { EventsPage } from "./Events";
import { PeoplePage } from "./People";
import { WaitlistPage } from "./Waitlist";

import LoginContext from "../utils/LoginContext";
import UrlContext from "../utils/UrlContext";
import globalStyles from "../styles/Styles";
import colors from "../styles/Colors";

export function TopBar(props) {
  const loginContext = useContext(LoginContext);
  const urlContext = useContext(UrlContext);
  const currentUser = loginContext.currentUser;
  const profileUrl = urlContext.professionalUrl;
  return (
    <View style={{ marginTop: 32, width: "100%", height: 160, flexDirection: "row", justifyContent: "space-between", alignItems: 'center', backgroundColor: "#FFFFFF", paddingHorizontal: 20 }}>
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
      <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14, marginTop: 6, color: '#262626' }}>Hello {props.name}!</Text>
      <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 10, color: '#262626' }}>PC {props.class}</Text>
    </View>
  );
}

export function NavigationPage() {
  const Tab = createBottomTabNavigator();

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
                  size={44}
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
                  size={36}
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
                <MaterialCommunityIcons
                  name="people-alt"
                  color={color}
                  size={44}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Points"
          component={WaitlistPage}
          options={{
            tabBarLabel: "Points",
            tabBarIcon: ({ color }) => {
              return (
                <FontAwesome5Icon
                  name='clipboard-list'
                  color={color}
                  size={38}
                />
              );
            }
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
