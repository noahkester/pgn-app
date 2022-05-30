import { StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, Image, View, TextInput } from "react-native";
import { SubmitPoints } from "./Home"
import { AccountTop } from "./Account";
import globalStyles from "../Styles";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState } from "react";
import colors from "../Colors";

const testEvents = [
    "LinkedIn Workshop",
    "Roundup Philanthropy Support",
    "Kappa x BYX Ticket",
    "Trey and Ella Masterclass",
    "Canes Dinner after Chapter"
]
function EventsDropDown() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {
            label: "LinkedIn Workship",
            value: "1"
        },
        {
            label: "Roundup Philanthropy Support",
            value: "2"
        },
        {
            label: "Kappa x BYX Ticket",
            value: "3"
        },
        {
            label: "Cold Cookie",
            value: "4"
        },
        {
            label: "Bowling Social",
            value: "5"
        },
        {
            label: "Trey and Ella Masterclass",
            value: "6"
        },
        {
            label: "Cava Dinner After Chapter",
            value: "7"
        },
        {
            label: "DG Dodgeball Tournament",
            value: "8"
        }
    ])
    return (
        <DropDownPicker
            placeholder="Select Event"
            placeholderStyle={[globalStyles.mediumBoldText, globalStyles.grayText]}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            listMode='SCROLLVIEW'
            itemSeparator={true}
            itemSeparatorStyle={{
                backgroundColor: colors.lightGray
            }}
            searchable={true}
            searchTextInputStyle={{
                borderWidth: 0
            }}
            searchContainerStyle={{
                borderBottomColor: colors.lightGray
            }}
            searchPlaceholderTextColor={colors.gray}
            dropDownContainerStyle={{
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: colors.lightGray,
                shadowColor: '#BBBBBB',
                shadowOpacity: 0.25,
                shadowRadius: 10,
                width: '100%',
                height: 180,
            }}
            textStyle={globalStyles.mediumBoldText}
            style={{
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                shadowColor: '#BBBBBB',
                shadowOpacity: 0.25,
                shadowRadius: 10,
                borderWidth: 0
            }}
        />
    )
}
function SubmitEvents() {
    return (
        <View style={styles.submitEvents}>
            <EventsDropDown />
        </View>
    )
}
function ImageUpload() {
    return (
        <TouchableOpacity style={[styles.imageUpload, { zIndex: -1 }]}>
            <Image
                source={require("../images/cloud.png")}
                style={styles.cloudImage}
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
}
function ProofDescription() {
    return (
        <KeyboardAvoidingView style={styles.descriptionLabel}>
            <Text style={globalStyles.smallSemiBoldText}>Proof Description:</Text>
            <View style={[globalStyles.cardContainer, styles.proofDescription]}>
                <TextInput
                    style={globalStyles.smallSemiBoldText}
                    multiline={true}
                    placeholder="Optional"
                ></TextInput>
            </View>
        </KeyboardAvoidingView>
    );
}
export function SubmitPage(props) {
    return (
        <View style={styles.submitScreen}>
            <View style={styles.submitSubScreen}>
                <View style={styles.submitElement}>
                    <AccountTop name="Submit Points" address="Navigation" />
                </View>
                <View style={styles.submitElement}>
                    <SubmitEvents />
                    <ImageUpload />
                    <ProofDescription />
                </View>
                <View style={styles.submitElement}>
                    <SubmitPoints address="Navigation" title="Submit" />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    submitScreen: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
    },
    submitSubScreen: {
        width: "100%",
        height: "85%",
        alignItems: "center",
        justifyContent: "space-between"
    },
    submitElement: {
        width: "100%",
        alignItems: "center"
    },
    submitEvents: {
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    submitDropDown: {
        width: "80%",
        borderWidth: 1
    },
    hiddenDropDown: {
        visibility: "hidden"
    },
    cloudImage: {
        width: "100%",
        height: "100%",
    },
    imageUpload: {
        width: "50%",
        height: "50%"
    },
    descriptionLabel: {
        width: "80%"
    },
    proofDescription: {
        marginTop: 20,
    }
})