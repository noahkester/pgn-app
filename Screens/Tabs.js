import {
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Image,
  View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import styles from "../Styles";
import { HomePage } from "./Home";
import { EventsPage } from "./Events";

function Texting() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text> Hello</Text>
    </View>
  );
}

//put these two funcs here bc we'll be exporting it to each tab since they're stable
export function ProfCircle(props) {
  return (
    <View style={styles.profilePosition}>
      <View>
        <Ionicons
          name="md-person-outline"
          size="60"
          style={[styles.burntOrange, styles.profileCircle]}
        />
      </View>
      <Text
        style={{
          maxWidth: 80,
        }}
      >
        Hello, {props.name}!
      </Text>

      <Text
        style={{
          fontSize: 12,
          alignSelf: "center",
          fontWeight: "bold",
          color: "#C57035",
        }}
      >
       
        {props.pos}
      </Text>
    </View>
  );
}

export function PgnImage() {
  return (
    <Image
      source={require("../images/Login/image1.png")}
      resizeMode="contain"
      style={styles.homeLogo}
    />
  );
}

export function NavigationPage() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      //background color of the each screen !!! PS: Screen above the tab bar

      sceneContainerStyle={{ backgroundColor: "#fff" }}
      screenOptions={{
        tabBarItemStyle: {
          marginTop: 10,
        },
        tabBarStyle: styles.colors,

        //color when the tab is pressed
        tabBarActiveTintColor: "#C57035",
        headerShown: false,
        tabBarInactiveTintColor: "#5F5F5F",
      }}
    >
      <Tab.Screen
        name="Submit Points"
        component={HomePage}
        options={{
          tabBarLabel: "Home",

          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsPage}
        options={{
          tabBarLabel: "Events",

          tabBarIcon: ({ color, size }) => (
            <Octicons name="calendar" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="People"
        component={Texting}
        options={{
          tabBarLabel: "People",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="people" color={color} size={size} />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Points"
        component={Texting}
        options={{
          tabBarLabel: "Points",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="checklist" color={color} size={size} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}
