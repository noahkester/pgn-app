import React, { useState, useContext, useCallback } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import globalStyles from "../../styles/Styles";
import colors from "../../styles/Colors";
import { SubmitPoints } from "../Home";
import LoginContext from "../../utils/LoginContext";
import { useNavigation } from "@react-navigation/native";
import { EventSection } from "../Events";
import { db } from '../../utils/firebase'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
function AccountTop(props) {
  const navigation = useNavigation();
  return (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      paddingLeft: 10,
      paddingRight: 10
    }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require("../../images/back.png")}
          style={{
            width: 60,
            height: 60,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={globalStyles.largeBoldText}>{props.name}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("AddEvent")}>
        <Image
          source={require("../../images/add.png")}
          style={{
            width: 60,
            height: 60,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

export function AdminEventsPage() {
  const loginContext = useContext(LoginContext);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    db.collection("events")
      .get()
      .then((querySnapshot) => {
        tempAllEvents = [];
        querySnapshot.forEach((doc) => {
          var data1 = doc.data();
          tempAllEvents.push(data1);
        })
        loginContext.allEvents.current = tempAllEvents;
      })
    wait(1000).then(() => {
      setRefreshing(false)
    });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{
        height: 160,
        paddingTop: 70,
        backgroundColor: '#FFFFFF'
      }}>
        <AccountTop name="Schedule Events" address="Admin" />
      </View>
      <ScrollView
        style={[globalStyles.scroll, {}]}
        contentContainerStyle={{ alignItems: 'center' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <EventSection time="All Events" events={loginContext.allEvents.current} />
      </ScrollView>
    </View>
  );
}

