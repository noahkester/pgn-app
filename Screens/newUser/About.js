import { StyleSheet, Button, TouchableOpacity, Text, Image, View, } from "react-native";
import { SubmitPoints } from "../Home";
export function AboutPage() {
    return (
        <View style={styles.screen}>
            <Text>About Page</Text>
            <View style={{ height: 10 }}></View>
            <SubmitPoints address="Contact" title="Next" />
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