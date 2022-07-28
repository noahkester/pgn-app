import { StyleSheet, Button, TouchableOpacity, Text, Image, View, } from "react-native";
import { SubmitPoints } from "../Home";
import { NewUserTextInput } from "./NewUser";
import globalStyles from "../../styles/Styles"
import { setField } from "./About";
import { NextButton } from "./NewUser";
import { useState, useContext } from "react";
import NewUserContext from "../../utils/NewUserContext";
import { useNavigation } from "@react-navigation/native";

export function EducationPage() {
    const [major, setMajor] = useState("");
    const [minor, setMinor] = useState("");
    const newUserContext = useContext(NewUserContext);
    const navigation = useNavigation();
    const updateEducation = () => {
        newUserContext.major = major;
        newUserContext.minor = minor;
        navigation.navigate("ProfilePictures");
    }
    return (
        <View style={styles.screen}>
            <View></View>
            <View style={{ width: "100%", alignItems: "center" }}>
                <Text style={globalStyles.largeSemiBoldText}>Education</Text>
                <NewUserTextInput
                    placeholder="Major(s):" onCustomChange={text => setMajor(text)}
                />
                <NewUserTextInput
                    placeholder="Minor(s): (optional)" onCustomChange={text => setMinor(text)}
                />
                <View style={{ height: 10 }}></View>
            </View>
            <NextButton
                onPress={updateEducation}
                title="Next" />
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white"
    }
});