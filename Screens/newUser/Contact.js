import { StyleSheet, Button, TouchableOpacity, Text, Image, View, } from "react-native";
import { SubmitPoints } from "../Home";
import { NewUserTextInput } from "../Login";
import globalStyles from "../../Styles"

export function ContactPage() {
    return (
        <View style={styles.screen}>
            <Text style={globalStyles.largeSemiBoldText}>Contact</Text>
            <NewUserTextInput
                placeholder="LinkedIn URL"
            />
            <NewUserTextInput
                placeholder="Phone: 123-456-7890"
            />
            <NewUserTextInput
                placeholder="Apt/Dorm"
            />
            <View style={{ height: 10 }}></View>
            <SubmitPoints address="EmailVerification" title="Complete!" />
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