import { StyleSheet, Button, TouchableOpacity, Text, Image, View, } from "react-native";
import { SubmitPoints } from "../Home";
import { CustomTextInput } from "../Login";

export function ProfilePicturesPage() {
    return (
        <View style={styles.screen}>
            <Text>Profile Pictures Page</Text>
            <View style={{ height: 10 }}></View>
            <SubmitPoints address="About" title="Next" />
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