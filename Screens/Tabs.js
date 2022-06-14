import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons } from "@expo/vector-icons";
import globalStyles from "../Styles";
import { HomePage } from "./Home";
import { EventsPage } from "./Events";
import { PeoplePage } from "./People";
import { WaitlistPage } from "./Waitlist";
import { useNavigation } from "@react-navigation/native";
import { auth, db, store, getProfilePicture } from "../Firebase";

import colors from "../Colors";
import { useEffect, useState } from "react";
// import { exists } from "react-native-fs";

export function TopBar(props) {
  const [profileUrl, setProfileUrl] = useState(undefined);
  const [firstname, setFirstname] = useState("Spring 1999");
  const [pledgeClass, setPledgeClass] = useState("Spring 1999");
  useEffect(() => {
    db.collection("users")
      .where("id", "==", auth.currentUser.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var data = doc.data();
          console.log("(Tabs) Read event " + doc.id);
          setFirstname(data.firstname);
          var splitPledgeClass = data.pledgeClass.split(" ");
          setPledgeClass(splitPledgeClass[0][0] + splitPledgeClass[1][2] + splitPledgeClass[1][3]);
          store
            .ref(`/profile-pictures/${data.id}.png`) //name in storage in firebase console
            .getDownloadURL()
            .then((url) => {
              setProfileUrl(url);
            })
            .catch((e) => console.log('(Tabs) Errors while downloading => ', e));
        });
      })
      .catch((error) => {
        console.log("(Tabs) Error getting events documents: ", error);
      });
    console.log("User ID: " + auth.currentUser.uid);
  }, [])
  return (
    <View style={styles.topBar}>
      <Profile
        name={firstname}
        class={pledgeClass}
        profileUrl={profileUrl}
      />
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
          source={{ uri: props.profileUrl }}
          resizeMode="cover"
          style={styles.profile}
        />
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
    <View style={{
      flex: 1,
    }}>
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
    height: 180,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 60,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  topBarCon: {
    width: 100,
    height: 120,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
