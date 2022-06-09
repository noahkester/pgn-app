import { StyleSheet, Button, TouchableOpacity, Text, Image, View, } from "react-native";
import { SubmitPoints } from "../Home";
import { NewUserTextInput } from "../Login";
import globalStyles from "../../Styles"

export function NamePage() {
    return (
        <View style={styles.screen}>
             <Text style={globalStyles.largeSemiBoldText}>Name</Text>
            <NewUserTextInput
                placeholder="First name"
            />
            <NewUserTextInput
                placeholder="Last name"
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