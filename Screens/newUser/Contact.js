import { StyleSheet, Button, TouchableOpacity, Text, Image, View, } from "react-native";
import { SubmitPoints } from "../Home";
import { CustomTextInput } from "../Login";
export function ContactPage() {
    return (
        <View style={styles.screen}>
            <CustomTextInput
                label="LinkedIn"
                placeholder="Paste URL"
            />
            <CustomTextInput
                label="Phone"
                placeholder="123-456-7890"
            />
            <CustomTextInput
                label="Dorm/Apt"
                placeholder="Standard, Jester, etc."
            />
            <View style={{ height: 10 }}></View>
            <SubmitPoints address="Navigation" title="Next" />
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