import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons } from "@expo/vector-icons";
import globalStyles from "../styles/Styles";
import { HomePage } from "./Home";
import { EventsPage } from "./Events";
import { PeoplePage } from "./People";
import { WaitlistPage } from "./Waitlist";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { auth, db, store, getProfilePicture } from "../utils/firebase";
import LoginContext from "../utils/LoginContext";
import colors from "../styles/Colors";
import { useEffect, useState } from "react";
// import { exists } from "react-native-fs";

export function TopBar(props) {
  const loginContext = useContext(LoginContext);

  const currentUser = loginContext.currentUser;
  const profileUrl = loginContext.profileUrl;

  return (
    <View style={styles.topBar}>
      <Profile
        name={currentUser.firstname}
        class={currentUser.pledgeClass}
        profileUrl={profileUrl}
      />
      <PGNImage />
    </View>
  );
}
//put these two funcs here bc we'll be exporting it to each tab since they're stable
export function Profile(props) {
  const navigation = useNavigation();
  const image = props.profileUrl ? (
    <Image
      source={{ uri: props.profileUrl }}
      resizeMode="cover"
      style={styles.profile}
    />
  ) : (
    <Image
      source={require("../images/profile.png")}
      resizeMode="cover"
      style={styles.profile}
    />
  );

  return (
    <View style={styles.topBarCon}>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        {image}
      </TouchableOpacity>

      <Text style={globalStyles.smallBoldText}>Hello {props.name}!</Text>
      <Text style={globalStyles.smallBoldText}>PC {props.class}</Text>
    </View>
  );
}
export function PGNImage() {
  return (
    <Image
      source={require("../images/pgn.png")}
      resizeMode="cover"
      style={styles.topBarPGN}
    />
  );
}
export function NavigationPage() {
  const Tab = createBottomTabNavigator();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <TopBar />
      <Tab.Navigator
        // Background of each screen
        sceneContainerStyle={{
          backgroundColor: colors.white,
        }}
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: globalStyles.colors,
            height: 100,
          },

          //color when the tab is pressed
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
              if (color == colors.universityColor) {
                return (
                  <Image
                    source={require("../images/tabBar/home1.png")}
                    style={styles.icons1}
                    resizeMode="contain"
                  />
                );
              } else {
                return (
                  <Image
                    source={require("../images/tabBar/home2.png")}
                    style={styles.icons1}
                    resizeMode="contain"
                  />
                );
              }
            },
          }}
        />
        <Tab.Screen
          name="Events"
          component={EventsPage}
          options={{
            tabBarLabel: "Events",
            tabBarIcon: ({ color }) => {
              if (color == colors.universityColor) {
                return (
                  <Image
                    source={require("../images/tabBar/calendar2.png")}
                    style={styles.icons2}
                    resizeMode="contain"
                  />
                );
              } else {
                return (
                  <Image
                    source={require("../images/tabBar/calendar1.png")}
                    style={styles.icons2}
                    resizeMode="contain"
                  />
                );
              }
            },
          }}
        />
        <Tab.Screen
          name="People"
          component={PeoplePage}
          options={{
            tabBarLabel: "People",
            tabBarIcon: ({ color }) => {
              if (color == colors.universityColor) {
                return (
                  <Image
                    source={require("../images/tabBar/group2.png")}
                    style={styles.icons3}
                    resizeMode="contain"
                  />
                );
              } else {
                return (
                  <Image
                    source={require("../images/tabBar/group1.png")}
                    style={styles.icons3}
                    resizeMode="contain"
                  />
                );
              }
            },
          }}
        />
        <Tab.Screen
          name="Points"
          component={WaitlistPage}
          options={{
            tabBarLabel: "Points",
            tabBarIcon: ({ color }) => {
              if (color == colors.universityColor) {
                return (
                  <Image
                    source={require("../images/tabBar/list2.png")}
                    style={styles.icons4}
                    resizeMode="contain"
                  />
                );
              } else {
                return (
                  <Image
                    source={require("../images/tabBar/list1.png")}
                    style={styles.icons4}
                    resizeMode="contain"
                  />
                );
              }
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
const styles = StyleSheet.create({
  icons1: {
    height: 50,
    width: 30,
  },
  icons2: {
    height: 50,
    width: 30,
  },
  icons3: {
    height: 50,
    width: 45,
  },
  icons4: {
    height: 50,
    width: 28,
  },
  topBar: {
    width: "100%",
    height: 200,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 60,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  topBarCon: {
    width: 100,
    height: 120,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlignVertical: 'top'
  },
  topBarPGN: {
    width: 120,
    height: 100,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});
