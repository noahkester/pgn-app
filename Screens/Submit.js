import { StyleSheet, TouchableOpacity, Text, Image, View, TextInput } from "react-native";
import { SubmitPoints } from "./Home"
import { AccountTop } from "./Account";
import globalStyles from "../Styles";

const testEvents = [
    "LinkedIn Workshop",
    "Roundup Philanthropy Support",
    "Kappa x BYX Ticket",
    "Trey and Ella Masterclass",
    "Canes Dinner after Chapter"
]

function DropDownCard(props) {
    return (
        <Text>{props.text}</Text>
    )
}

function SubmitDropDown() {
    var show = true;
    return (
        <TouchableOpacity style={styles.submitDropDown}>
            <View style={styles.hiddenDropDown}>
                <DropDownCard text="This is the event dropdown" />
            </View>
        </TouchableOpacity>
    );
}
function SubmitEvents() {
    return (
        <View style={styles.submitEvents}>
            <Text style={globalStyles.smallSemiBoldText}>Event:</Text>
            <SubmitDropDown />
        </View>
    )
}
function ImageUpload() {
    return (
        <TouchableOpacity style={styles.imageUpload}>
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
        <View style={styles.descriptionLabel}>
            <Text style={globalStyles.smallSemiBoldText}>Proof Description:</Text>
            <View style={[globalStyles.cardContainer, styles.proofDescription]}>
                <TextInput
                    style={globalStyles.smallSemiBoldText}
                    multiline={true}
                    placeholder="Optional"
                ></TextInput>
            </View>
        </View>
    );
}
export function SubmitPage(props) {
    return (
        <View style={styles.submitScreen}>
            <View style={styles.submitSubScreen}>
                <View style={styles.submitElement}>
                    <AccountTop name="Submit Points" />
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
        height: "100%"
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