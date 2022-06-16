import {
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Image,
  View,
} from "react-native";
import { SubmitPoints } from "../Home";
import globalStyles from "../../Styles";
import { AboutTextInput } from "./NewUser";
import { useState } from "react";
import { getCurrentUser } from "../../Firebase";
import { NextButton } from "./NewUser";

export function AboutPage() {
  const [activities, setActivities] = useState("");
  const [quote, setQuote] = useState("");

  return (
    <View style={styles.screen}>
      <View></View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text style={globalStyles.largeSemiBoldText}>About</Text>
        <AboutTextInput
          placeholder="Activities"
          onCustomChange={text => setActivities(text)}
        />
        <Text style={[globalStyles.miniSemiBoldText, styles.note]}>
          (Separate With Commas)
        </Text>
        <AboutTextInput
          placeholder="Quote"
          onCustomChange={text => setQuote(text)}
        />
        <Text style={[globalStyles.miniSemiBoldText, styles.note]}>(Be Funny)</Text>
      </View>
      <NextButton address="Contact" title="Next" values={[activities, quote]} inputPage="about" />
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
