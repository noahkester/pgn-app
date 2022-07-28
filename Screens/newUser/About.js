import {
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Image,
  View,
} from "react-native";
import { SubmitPoints } from "../Home";
import globalStyles from "../../styles/Styles";
import { AboutTextInput, NewUserTextInput } from "./NewUser";
import { useState, useContext } from "react";
import { getCurrentUser } from "../../utils/firebase";
import { NextButton } from "./NewUser";
import NewUserContext from "../../utils/NewUserContext";
import { useNavigation } from "@react-navigation/native";

export function AboutPage() {
  const [hometown, setHometown] = useState("");
  const [activities, setActivities] = useState("");
  const [quote, setQuote] = useState("");
  const navigation = useNavigation();
  const newUserContext = useContext(NewUserContext);

  const updateAbout = () => {
    newUserContext.hometown = hometown;
    newUserContext.activities = activities;
    newUserContext.quote = quote;
    navigation.navigate("Contact");
  }
  return (
    <View style={styles.screen}>
      <View></View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text style={globalStyles.largeSemiBoldText}>About</Text>
        <NewUserTextInput
          placeholder="Hometown" onCustomChange={text => setHometown(text)}
        />
        <AboutTextInput
          placeholder="Activities/Orgs: Bowling, Piano, ..."
          onCustomChange={text => setActivities(text)}
        />
        <AboutTextInput
          placeholder="Funny Quote/Bio"
          onCustomChange={text => setQuote(text)}
        />
      </View>
      <NextButton onPress={updateAbout} title="Next" />
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
  },
  note: {
    paddingTop: 10,
    paddingBottom: 30,
  },
});
