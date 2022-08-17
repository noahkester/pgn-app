import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AdminEventsPage } from "../Screens/adminUser/AdminEvents";
import { AddEventPage } from '../Screens/adminUser/AddEvent';
import { AddCodePage } from '../Screens/adminUser/AddCode';
import { AdminSettingsPage } from '../Screens/adminUser/AdminSettings';
import { ViewPeoplePage } from "../Screens/adminUser/ViewPeople";
import { AdminTabsPage } from '../Screens/adminUser/AdminTabs';


const Stack = createNativeStackNavigator();

export default function AdminNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Admin"
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}
        >
            <Stack.Screen name="Admin" component={AdminTabsPage} />
            <Stack.Screen name="AdminEvents" component={AdminEventsPage} />
            <Stack.Screen name="AddEvent" component={AddEventPage} />
            <Stack.Screen name="AddCode" component={AddCodePage} />
            <Stack.Screen name="View" component={ViewPeoplePage} />
            <Stack.Screen name="AdminSettings" component={AdminSettingsPage} />
        </Stack.Navigator>
    )
}