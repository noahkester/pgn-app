import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginSignupPage } from "../Screens/loginSignup/LoginSignup";
import { LoginPage } from "../Screens/loginSignup/Login";
import { CreateAccountPage } from "../Screens/loginSignup/CreateAccount";
import { NamePage } from "../Screens/newUser/Name";
import { EducationPage } from "../Screens/newUser/Education";
import { ProfilePicturesPage } from "../Screens/newUser/ProfilePictures";
import { AboutPage } from "../Screens/newUser/About";
import { ContactPage } from "../Screens/newUser/Contact";
import { EmailVerificationPage } from "../Screens/newUser/EmailVerification";
import { UnknownUserPage } from "../Screens/newUser/UnknownUser";


const Stack = createNativeStackNavigator();

export default function NewUserNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}
        >
            <Stack.Screen name="LoginSignup" component={LoginSignupPage} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="CreateAccount" component={CreateAccountPage} />

            <Stack.Screen name="Name" component={NamePage} />
            <Stack.Screen name="UnknownUser" component={UnknownUserPage} />
            <Stack.Screen name="Education" component={EducationPage} />
            <Stack.Screen name="ProfilePictures" component={ProfilePicturesPage} />
            <Stack.Screen name="About" component={AboutPage} />
            <Stack.Screen name="Contact" component={ContactPage} />
            <Stack.Screen name="EmailVerification" component={EmailVerificationPage} />
        </Stack.Navigator>
    )
}