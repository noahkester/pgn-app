import { StyleSheet, Button, TouchableOpacity, Text, Image, View, } from "react-native";
import { SubmitPoints } from "../Home";
import { CustomTextInput } from "../Login";

export function NamePage() {
    return (
        <View style={styles.screen}>
            <CustomTextInput
                label="First name"
                placeholder="Enter First name"
            />
            <CustomTextInput
                label="Last name"
                placeholder="Enter Last name"
            />
            <View style={{ height: 10 }}></View>
            <SubmitPoints address="Education" title="Next" />
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }

});