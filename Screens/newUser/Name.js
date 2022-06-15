import { StyleSheet, Button, TouchableOpacity, Text, Image, View, } from "react-native";
import { SubmitPoints } from "../Home";
import { NewUserTextInput } from "../Login";
import globalStyles from "../../Styles"
import { setField } from "./About";

export function NamePage() {
    function setFirstName (text1){
        
        setField({key: 'firstname', value: text1})
        console.log("first name is set")
    }

    return (
        <View style={styles.screen}>
             <Text style={globalStyles.largeSemiBoldText}>Name</Text>
            <NewUserTextInput
                placeholder="First name" onCustomChange = {text => setFirstName(text)}
            />
            <NewUserTextInput
                placeholder="Last name" onCustomChange = {text => setField({key: 'lastname', value: text})}
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