import { StyleSheet, Button, TouchableOpacity, Text, Image, View, } from "react-native";
import { SubmitPoints } from "../Home";
import globalStyles from "../../Styles"
import { AboutTextInput } from "../Login"

export function AboutPage() {
    return (
        <View style={styles.screen}>
            <Text style={globalStyles.largeSemiBoldText}>About</Text>
            <AboutTextInput
                placeholder="Activities"
            />
            <Text style={[globalStyles.mediumBoldText, styles.note]}>(Separate With Commas)</Text>
            <AboutTextInput
                placeholder="Quote"
            />
            <Text style={[globalStyles.mediumBoldText, styles.note]}>(Be Funny)</Text>
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
    },
    note: {
        paddingTop: 10,
        paddingBottom: 30
    }
});