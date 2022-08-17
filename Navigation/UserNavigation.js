import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationPage } from "../Screens/Tabs";
import { AccountPage } from "../Screens/Account";
import { SubmitPage } from "../Screens/Submit";


import { PersonPage } from "../Screens/Person";
import { AccountImageUploadPage } from "../Screens/AccountImageUpload";

import { SubmitAttendancePage } from '../Screens/SubmitAttendance';
import { AttendancePage } from '../Screens/Attendance';

import { WaitlistPage } from "../Screens/Waitlist";
import { ColorThemePage } from '../Screens/ColorTheme';
import { SocialPostScreen } from '../Screens/SocialPost';


const Stack = createNativeStackNavigator();

export default function UserNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Navigation"
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}
        >
            <Stack.Screen name="Navigation" component={NavigationPage} />
            <Stack.Screen name="Waitlist" component={WaitlistPage} />
            <Stack.Screen name="Account" component={AccountPage} />
            <Stack.Screen name="AccountImageUpload" component={AccountImageUploadPage} />
            <Stack.Screen name="Theme" component={ColorThemePage} />
            <Stack.Screen name="Submit" component={SubmitPage} />
            <Stack.Screen name="SubmitAttendance" component={SubmitAttendancePage} />
            <Stack.Screen name="Attendance" component={AttendancePage} />
            <Stack.Screen name="Person" component={PersonPage} />
            <Stack.Screen name="Post" component={SocialPostScreen} />
        </Stack.Navigator>
    )
}