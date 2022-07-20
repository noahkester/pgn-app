import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ScrollView,
} from "react-native";
import globalStyles from "../styles/Styles";
import colors from "../styles/Colors";
import { AccountTop, SignOutButton } from "./Account";
import { SubmitPoints } from "./Home";
import LoginContext from "../utils/LoginContext";
import { useNavigation } from "@react-navigation/native";

export function AdminSettingsPage() {

  return (
    <View>
      <View style={styles.topBar}>
        <AccountTop name="Admin Settings" address="Admin" />
      </View>
      <ScrollView style={globalStyles.scroll}>
        <Text>Settings Screen</Text>
        <SubmitPoints address="Admin" title="Save and Exit" />
        <SignOutButton />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: 160,
    paddingTop: 70,
    borderWidth: 1,
  },
});
