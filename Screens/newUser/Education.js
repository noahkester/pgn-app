import { StyleSheet, Button, TouchableOpacity, Text, Image, View, } from "react-native";
import { SubmitPoints } from "../Home";
import { CustomTextInput } from "../Login";

export function EducationPage() {
    return (
        <View style={styles.screen}>
            <CustomTextInput
                label="Major(s)"
                placeholder="Enter Majors"
            />
            <CustomTextInput
                label="Minor(s)"
                placeholder="Optional"
            />
            <View style={{ height: 10 }}></View>
            <SubmitPoints address="ProfilePictures" title="Next" />
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