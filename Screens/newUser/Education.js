import { StyleSheet, Button, TouchableOpacity, Text, Image, View, } from "react-native";
import { SubmitPoints } from "../Home";
import { NewUserTextInput } from "../Login";
import globalStyles from "../../Styles"
import { setField } from "./About";

export function EducationPage() {
    return (
        <View style={styles.screen}>
            <Text style={globalStyles.largeSemiBoldText}>Education</Text>
            <NewUserTextInput
                placeholder="Major(s)" onCustomChange = {text => setField({key: 'major', value: text})}
            />
            <NewUserTextInput
                placeholder="Minor(s) (optional)" onCustomChange = {text => setField({key: 'minor', value: text})}
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