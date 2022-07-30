import React, { useState, useContext, useCallback } from "react";
import { TouchableOpacity, Image, Text, View, ScrollView, RefreshControl } from "react-native";
import globalStyles from "../../styles/Styles";

import LoginContext from "../../utils/LoginContext";
import Octicons from 'react-native-vector-icons/Octicons';
import { useNavigation } from "@react-navigation/native";
import { EventSection } from "../Events";
import { db } from '../../utils/firebase'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
function AccountTop() {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 32, height: 100, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <TouchableOpacity
        style={{ width: 68, alignItems:'center' }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Octicons
          name="chevron-left"
          color={'#262626'}
          size={42}
        />
      </TouchableOpacity>
      <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#262626' }}>All Events</Text>
      <TouchableOpacity
        style={{ width: 68, height: 68, alignItems: 'center', justifyContent: 'center', borderRadius: 34, marginRight: 16 }}
        onPress={() => {
          navigation.navigate('AddEvent');
        }}
      >
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
      <AccountTop />
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

