import { StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Text, View } from "react-native";
import React, { useState } from "react";
import globalStyles from "../Styles"
import { useNavigation } from '@react-navigation/native';
import colors from "webpack-dev-server/lib/utils/colors";
import { auth } from "../Firebase";


function setId(props) {
    const [accessId, getId] = useState('');
    getId(props.id);
}
/*
Backend Stuff TODO:

Popualate Fields with database pull
Get inputs on "Save and Exit" and save to database

*/
export function AccountTop(props) {
    const navigation = useNavigation();
    return (
        <View style={styles.accountTop}>
            <TouchableOpacity
                onPress={() => navigation.navigate(props.address)}>
                <Image
                    source={require("../images/back.png")}
                    style={styles.accountLogo}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <Text style={globalStyles.largeBoldText}>{props.name}</Text>
            <View style={styles.invisiableElement}></View>
        </View>
    );
}
function Profile() {
    return (
        <Image
            source={require("../images/profile.png")}
            style={styles.largeProfile}
            resizeMode="contain"
        >
        </Image>
    );
}
function Description(props) {
    return (
        <View style={[globalStyles.cardContainer, styles.accountDescription]}>
            <TextInput
                style={globalStyles.smallSemiBoldText}
                multiline={true}
                placeholder="Quote"
            >{props.description}</TextInput>
        </View>
    )
}
function AccountInput(props) {
    return (
        <View style={styles.accountInput}>
            <Text style={globalStyles.smallSemiBoldText}>{props.label}</Text>
            <TextInput style={[styles.accountTextInput, globalStyles.cardContainer, globalStyles.smallSemiBoldText]}>{props.input}</TextInput>
        </View>
    )
}
function AcademicInfo(props) {
    return (
        <View style={styles.academicSection}>
            <AccountInput label="Major:" input={props.major} />
        </View>
    )
}
function ContactInfo(props) {
    return (
        <View style={styles.academicSection}>
            <AccountInput label="Email:" input={props.email} />
            <AccountInput label="Phone:" input={props.number} />
            <AccountInput label="LinkedIn:" input={props.linkedin} />
        </View>
    )
}
function SaveButton(props) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("Navigation")}
            title={"Save and Exit"}
            style={[globalStyles.universityColorFill, globalStyles.button, styles.saveButton]}

        >
            <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>{"Save and Exit"}</Text>
        </TouchableOpacity>
    )
}
function SignOutButton(props) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => {
                auth
                    .signOut()
                    .then(() => {
                        navigation.navigate("Start", {screen: "LoginSignup"});
                        console.log("(Account) Signed out. Navigating to Start");
                    })
                    .catch(error => console.log(error.message))
            }}
            title={"Signout"}
            style={[globalStyles.universityColorFill, globalStyles.button, styles.signoutButton]}

        >
            <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>{"Sign out"}</Text>
        </TouchableOpacity>
    )
}
function PledgeClass(props) {
    return (
        <View style={styles.pledgeClass}>
            <Text style={globalStyles.smallSemiBoldText}>{"PC " + props.pledgeClass}</Text>
            <Text style={globalStyles.smallSemiBoldText}>{"Status: " + props.status}</Text>
        </View>
    )
}
const accountInfo = {
    name: "Noah Kester",
    bio: "This is my bio",
    linkedin: "https://thisisalink",
    email: "noah@gmail.com",
    number: "123-456-7890",
    image: "",
    pledgeClass: "Spring 2022",
    status: "Active",
    major: "Computer Science"
}
export function AccountPage() {
    return (
        <View style={styles.createAccountScreen}>
            <View style={styles.navBar}>
                <View></View>
                <AccountTop name={accountInfo.name} address="Navigation" />
            </View>
            <ScrollView style={styles.accountInfo}>
                <View style={styles.innerScroll}>
                    <Profile />
                    <Description description={accountInfo.bio} />
                    <PledgeClass pledgeClass={accountInfo.pledgeClass} status={accountInfo.status} />
                    <AcademicInfo major={accountInfo.major} />
                    <ContactInfo email={accountInfo.email} number={accountInfo.number} linkedin={accountInfo.linkedin} />
                    <SaveButton />
                    <SignOutButton />
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    navBar: {
        height: "15%",
        justifyContent: "space-between",
        paddingBottom: 10,
        width: "100%"
    },
    createAccountScreen: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    accountInfo: {
        width: "100%"
    },
    innerScroll: {
        alignItems: "center"
    },
    createAccountSubScreen: {
        height: "85%",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between"
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
    accountLogo: {
        width: 60,
        height: 60
    },
    accountTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingLeft: 10
    },
    largeProfile: {
        marginTop: 15,
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    accountDescription: {
        marginTop: 20,
        width: "80%"
    },
    saveButton: {
        marginTop: 40
    },
    academicSection: {
        marginTop: 20,
        width: "80%"
    },
    accountInput: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    accountTextInput: {
        width: "70%"
    },
    invisiableElement: {
        width: 60
    },
    pledgeClass: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        paddingTop: 40
    },
    signoutButton: {
        marginTop: 10,
        marginBottom: 50
    }
})
