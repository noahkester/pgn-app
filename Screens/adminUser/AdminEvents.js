import React, { useState, useContext, useCallback } from "react";
import { TouchableOpacity, Image, Text, View, ScrollView, RefreshControl } from "react-native";
import globalStyles from "../../styles/Styles";

import LoginContext from "../../utils/LoginContext";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { EventSection } from "../Events";
import { db } from '../../utils/firebase'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
function AccountTop() {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 32, height: 100, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: '#D8D8D8' }}>
      <View style={{ width: 68 }}></View>
      <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#262626' }}>All Events</Text>
      <TouchableOpacity
        style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 30, marginRight: 16, backgroundColor: '#DEF1DF' }}
        onPress={() => {
          navigation.navigate('AddEvent');
        }}
      >
        <MaterialIcons
          name="add"
          color={'#7BC06F'}
          size={40}
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
    <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
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

