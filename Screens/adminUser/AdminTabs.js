import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FoundationIcon from 'react-native-vector-icons/Foundation';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";

import { AdminPage } from "./Admin";
import { AdminEventsPage } from "./AdminEvents";
import { ViewPeoplePage } from "./ViewPeople";
import { AdminSettingsPage } from './AdminSettings';

import globalStyles from "../../styles/Styles";
import colors from "../../styles/Colors";

export function AdminTabsPage() {
    const Tab = createBottomTabNavigator();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#FFFFFF'
            }}
        >
            <Tab.Navigator
                sceneContainerStyle={{
                    backgroundColor: '#FFFFFF',
                }}
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: globalStyles.colors,
                        height: 100,
                    },

                    tabBarActiveTintColor: colors.universityColor,
                    headerShown: false,
                    tabBarInactiveTintColor: colors.darkGray,
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={AdminPage}
                    options={{
                        tabBarIcon: ({ color }) => {
                            return (
                                <FoundationIcon
                                    name="home"
                                    color={color}
                                    size={40}
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="Events"
                    component={AdminEventsPage}
                    options={{
                        tabBarIcon: ({ color }) => {
                            return (
                                <FontAwesome5Icon
                                    name="calendar-day"
                                    color={color}
                                    size={30}
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="People"
                    component={ViewPeoplePage}
                    options={{
                        tabBarIcon: ({ color }) => {
                            return (
                                <MaterialIcons
                                    name="people-alt"
                                    color={color}
                                    size={36}
                                    style={{ marginLeft: 3 }}
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={AdminSettingsPage}
                    options={{
                        tabBarIcon: ({ color }) => {
                            return (
                                <IonIcons
                                    name="settings-sharp"
                                    color={color}
                                    size={36}
                                    style={{}}
                                />
                            );
                        },
                    }}
                />
            </Tab.Navigator>
        </View>
    );
}