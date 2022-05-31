import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Image, Text, View, ScrollView } from "react-native";
import globalStyles from "../Styles";
import colors from "../Colors";
import { AccountTop } from "./Account";
import { SubmitPoints } from "./Home"

import { useNavigation } from '@react-navigation/native';

export function AdminSettingsPage() {
    return (
        <View>
            <View style={styles.topBar}>
                <AccountTop name="Admin Settings" address="Admin" />
            </View>
            <ScrollView style={globalStyles.scroll}>
                <Text>Settings Screen</Text>
                <SubmitPoints address="Admin" title="Save and Exit" />
                <SubmitPoints address="LoginSignup" title="Sign out" />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    topBar: {
        height: 160,
        paddingTop: 70,
        borderWidth: 1
    }
});