import React, { useState, useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ScrollView,
} from "react-native";
import globalStyles from "../../styles/Styles";
import colors from "../../styles/Colors";
import { SignOutButton } from "../Account";
import { SubmitPoints } from "../Home";
import LoginContext from "../../utils/LoginContext";
import { useNavigation } from "@react-navigation/native";
import { EventSection } from "../Events";

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
      >
        <EventSection time="All Events" events={loginContext.allEvents.current} />
        <SignOutButton />
      </ScrollView>
    </View>
  );
}

