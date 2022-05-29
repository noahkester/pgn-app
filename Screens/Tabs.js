import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons } from "@expo/vector-icons";
import globalStyles from "../Styles";
import { HomePage } from "./Home";
import { EventsPage } from "./Events";
import { PeoplePage } from "./People";
import { WaitlistPage } from "./Waitlist";
import { useNavigation } from '@react-navigation/native';

import colors from "../Colors"


export function TopBar(props) {
  var n = "Noah Kester";
  var c = "Fall 2022"

  var firstName = n.split(" ")[0];
  var temp = c.split(" ");
  var pclass = temp[0][0] + temp[1][2] + temp[1][3];
  return (
    <View style={styles.topBar}>
      <Profile name={firstName} class={pclass} profileSrc={require("../images/profile.png")} />
      <PGNImage />
    </View>
  );
}
//put these two funcs here bc we'll be exporting it to each tab since they're stable
export function Profile(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.topBarCon}>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <Image
          source={props.profileSrc}
          resizeMode="contain"
          style={styles.profile}
        />
      </TouchableOpacity>
      <Text style={globalStyles.smallBoldText}>Hello, {props.name}!</Text>
      <Text style={globalStyles.smallBoldText}>PC {props.class}</Text>
    </View>
  );
}
export function PGNImage() {
  return (
    <Image
      source={require("../images/pgn.png")}
      resizeMode="contain"
      style={styles.topBarPGN}
    />
  );
}
export function NavigationPage() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      // Background of each screen
      sceneContainerStyle={{
        backgroundColor: colors.white,
      }}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: globalStyles.colors,
          height: 100
        },
        //color when the tab is pressed
        tabBarActiveTintColor: colors.universityColor,
        headerShown: false,
        tabBarInactiveTintColor: colors.darkGray,
      }}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ color }) => {
            if (color == colors.universityColor) {
              return (<Image
                source={require("../images/tabBar/home1.png")}
                style={styles.icons1}
                resizeMode="contain"
              />);
            }
            else {
              return (<Image
                source={require("../images/tabBar/home2.png")}
                style={styles.icons1}
                resizeMode="contain"
              />);
            }
          }
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsPage}
        options={{
          tabBarLabel: "Events",
          tabBarIcon: ({ color }) => {
            if (color == colors.universityColor) {
              return (<Image
                source={require("../images/tabBar/calendar2.png")}
                style={styles.icons2}
                resizeMode="contain"
              />);
            }
            else {
              return (<Image
                source={require("../images/tabBar/calendar1.png")}
                style={styles.icons2}
                resizeMode="contain"
              />);
            }
          }
        }}
      />
      <Tab.Screen
        name="People"
        component={PeoplePage}
        options={{
          tabBarLabel: "People",
          tabBarIcon: ({ color }) => {
            if (color == colors.universityColor) {
              return (<Image
                source={require("../images/tabBar/group2.png")}
                style={styles.icons3}
                resizeMode="contain"
              />);
            }
            else {
              return (<Image
                source={require("../images/tabBar/group1.png")}
                style={styles.icons3}
                resizeMode="contain"
              />);
            }
          }
        }}
      />
      <Tab.Screen
        name="Points"
        component={WaitlistPage}
        options={{
          tabBarLabel: "Points",
          tabBarIcon: ({ color }) => {
            if (color == colors.universityColor) {
              return (<Image
                source={require("../images/tabBar/list2.png")}
                style={styles.icons4}
                resizeMode="contain"
              />);
            }
            else {
              return (<Image
                source={require("../images/tabBar/list1.png")}
                style={styles.icons4}
                resizeMode="contain"
              />);
            }
          }
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  icons1: {
    width: 30
  },
  icons2: {
    width: 30
  },
  icons3: {
    width: 45
  },
  icons4: {
    width: 28
  },
  topBar: {
    marginTop: 50,
    width: "90%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topBarCon: {
    width: 100,
    height: 130,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  topBarPGN: {
    width: 100,
    height: 100,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    width: 60,
    height: 60,
  }
})
