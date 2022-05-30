import { StyleSheet, KeyboardAvoidingView, Text, View, Image } from "react-native";
import React, { useState } from "react";
import globalStyles from "../Styles"
import { LoginButton } from "./LoginSignup"
import { PasswordInput, CustomTextInput, ErrorMessage } from "./Login"
import { auth } from "../firebase"
import { AccountTop } from "./Account";
import ucolors from "../UniversityColors";
import DropDownPicker from "react-native-dropdown-picker";
import colors from "../Colors";
/*
Backend Stuff TODO:

Get inputs from boxes and create object to send to SQL.
Add verified = false for email verification.
Do not allow login until email is verified.
Send email after "Create account" button pressed
Update "create new account page" to say "resend email" or "create new account"
Add expiration for email after 5 minutes. IF expired, delete object and do not add to database

For text input:
Check that email is not alredy registered
Check that username is not taken
Check username has only numbers and letters
Check that passwords match
Check that password length is enough

*/
function UniversityDropdown(props) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {
            label: 'University of Texas at Austin',
            value: '1',
            icon: () =>
                <Image
                    source={require('../images/dropdown/uTexas.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.uTexas
            },
        },
        {
            label: 'University of Illinois',
            value: '2',
            icon: () =>
                <Image
                    source={require('../images/dropdown/illinois.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.illinois
            },
        },
        {
            label: 'Illinois State University',
            value: '3',
            icon: () =>
                <Image
                    source={require('../images/dropdown/illinoisState.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.illinoisState
            },
        },
        {
            label: 'IUP Crimson Hawks',
            value: '4',
            icon: () =>
                <Image
                    source={require('../images/dropdown/iupHawks.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.iupHawks
            },
        },
        {
            label: 'Washington University',
            value: '5',
            icon: () =>
                <Image
                    source={require('../images/dropdown/washU.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.washU
            },
        },
        {
            label: 'Pennsylvania State University',
            value: '6',
            icon: () =>
                <Image
                    source={require('../images/dropdown/pennState.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.pennState
            },
        },
        {
            label: 'Babson College',
            value: '7',
            icon: () =>
                <Image
                    source={require('../images/dropdown/babson.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.babson
            },
        },
        {
            label: 'Cornell University',
            value: '8',
            icon: () =>
                <Image
                    source={require('../images/dropdown/cornell.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.cornell
            },
        },
        {
            label: 'Indiana University',
            value: '9',
            icon: () =>
                <Image
                    source={require('../images/dropdown/indiana.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.indiana
            },
        },
        {
            label: 'Michigan State University',
            value: '10',
            icon: () =>
                <Image
                    source={require('../images/dropdown/michiganState.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.michiganState
            },
        },
        {
            label: 'University of Michigan',
            value: '11',
            icon: () =>
                <Image
                    source={require('../images/dropdown/uMichigan.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.uMichigan
            },
        },
        {
            label: 'University of Wisconsin',
            value: '12',
            icon: () =>
                <Image
                    source={require('../images/dropdown/wisconsin.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.wisconsin
            },
        },
        {
            label: 'University of Iowa',
            value: '13',
            icon: () =>
                <Image
                    source={require('../images/dropdown/iowa.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.iowa
            },
        },
        {
            label: 'James Madison University',
            value: '14',
            icon: () =>
                <Image
                    source={require('../images/dropdown/jmu.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.jmu
            },
        },
        {
            label: 'University of Pittsburgh',
            value: '15',
            icon: () =>
                <Image
                    source={require('../images/dropdown/pitt.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.pitt
            },
        },
        {
            label: 'Ohio State University',
            value: '16',
            icon: () =>
                <Image
                    source={require('../images/dropdown/ohio.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.ohio
            },
        },
        {
            label: 'University of Pennsylvania',
            value: '17',
            icon: () =>
                <Image
                    source={require('../images/dropdown/uPenn.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.uPenn
            },
        },
        {
            label: 'Miami University',
            value: '18',
            icon: () =>
                <Image
                    source={require('../images/dropdown/miami.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.miami
            },
        },
    ]);
    const [displayedColor, setDisplayedColor] = useState(colors.darkGray);
    return (
        <DropDownPicker
            placeholder="Select your Chapter"
            placeholderStyle={[globalStyles.whiteText, globalStyles.mediumBoldText]}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={() => {
                switch (value) {
                    case "1": setDisplayedColor(ucolors.uTexas); break;
                    case "2": setDisplayedColor(ucolors.illinois); break;
                    case "3": setDisplayedColor(ucolors.illinoisState); break;
                    case "4": setDisplayedColor(ucolors.iupHawks); break;
                    case "5": setDisplayedColor(ucolors.washU); break;
                    case "6": setDisplayedColor(ucolors.pennState); break;
                    case "7": setDisplayedColor(ucolors.babson); break;
                    case "8": setDisplayedColor(ucolors.cornell); break;
                    case "9": setDisplayedColor(ucolors.indiana); break;
                    case "10": setDisplayedColor(ucolors.michiganState); break;
                    case "11": setDisplayedColor(ucolors.uMichigan); break;
                    case "12": setDisplayedColor(ucolors.wisconsin); break;
                    case "13": setDisplayedColor(ucolors.iowa); break;
                    case "14": setDisplayedColor(ucolors.jmu); break;
                    case "15": setDisplayedColor(ucolors.pitt); break;
                    case "16": setDisplayedColor(ucolors.ohio); break;
                    case "17": setDisplayedColor(ucolors.uPenn); break;
                    case "18": setDisplayedColor(ucolors.miami); break;
                }
            }}
            listMode='SCROLLVIEW'
            dropDownContainerStyle={{
                backgroundColor: colors.lightGray,
                borderWidth: 0,
                width: '90%',
                marginLeft: '5%',
                height: 120,
            }}
            textStyle={[globalStyles.whiteText, globalStyles.mediumBoldText]}
            style={{
                marginLeft: '5%',
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                width: '90%',
                borderWidth: 0,
                backgroundColor: displayedColor,
            }}
        >
        </DropDownPicker>
    );
}
export function CreateAccountPage() {
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const handleCreateAccount = async () => {
        setEmailMessage("");
        setPasswordMessage("");
        var success = false;
        if (password1 !== password2) {
            setPasswordMessage("Passwords do not match");
            return;
        }
        await auth
            .createUserWithEmailAndPassword(email, password1)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("Created user as: ", user.email);
                success = true;
            })
            .catch(error => {
                switch (error.code) {
                    case "auth/invalid-email":
                        setEmailMessage("Invalid email format");
                        break;
                    case "auth/email-already-exists":
                        setEmailMessage("Email already registered");
                        break;
                    case "auth/weak-password":
                    case "auth/invalid-password":
                        setPasswordMessage("Password must be > 6 characters");
                        break;
                }
            })
        return success;
    }
    return (
        <View style={styles.screen}>
            <View style={styles.backNav}>
                <View></View>
                <AccountTop name={""} address="LoginSignup" />
            </View>
            <KeyboardAvoidingView behaviors="padding" style={styles.createAccountScreen}>
                <Text style={globalStyles.mediumBoldText}>Create New Account</Text>
                <View style={styles.section} />
                <UniversityDropdown />
                <CustomTextInput
                    label="Email:"
                    value={email}
                    onCustomChange={setEmail}
                    placeholder="Enter Email" />
                <ErrorMessage message={emailMessage} />
                <PasswordInput
                    label="Password:"
                    value={password1}
                    onCustomChange={setPassword1}
                    placeholder="Create Password" />
                <PasswordInput
                    label=""
                    value={password2}
                    onCustomChange={setPassword2}
                    placeholder="Re-type Password" />
                <ErrorMessage message={passwordMessage} />
                <LoginButton title="Create Account" address="LoginSignup" customOnPress={handleCreateAccount} />
            </KeyboardAvoidingView>
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        backgroundColor: "white"
    },
    backNav: {
        height: "15%",
        justifyContent: "space-between",
        paddingBottom: 10
    },
    createAccountScreen: {
        height: "80%",
        width: "100%",
        marginTop: "25%",
        alignItems: "center",
    },
    inputContainer: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    textInputContainer: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 30,
        width: "70%"
    },
    section: {
        height: 20
    },
    iconStyle: {
        width: 30,
        height: 30
    }
})
