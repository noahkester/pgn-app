import { StyleSheet, Button, TouchableOpacity, Text, Image, View, } from "react-native";
import { SubmitPoints } from "../Home";
import { NewUserTextInput } from "../Login";
import globalStyles from "../../Styles"

export function EducationPage() {
    return (
        <View style={styles.screen}>
            <Text style={globalStyles.largeSemiBoldText}>Education</Text>
            <NewUserTextInput
                placeholder="Major(s)"
            />
            <NewUserTextInput
                placeholder="Minor(s) (optional)"
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