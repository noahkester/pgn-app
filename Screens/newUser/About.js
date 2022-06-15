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
import { AboutTextInput } from "../Login";
import { useState } from "react";
import { getCurrentUser } from "../../Firebase";

export var newUser = {
  apartment: "",
  bio: "",
  chapter: "",
  email: "",
  firstname: "",
  lastname: "",
  //can use the auth.uid as the id for the collection instead!!
  //need to check if it gives the right unique id of the current user, should do it supposedly.
  id: getCurrentUser().uid,
  linkedin: "",
  major: "",
  minor: "",
  philanthropyPoints: "0",
  phone: "",
  professionalPoints: "0",
  socialPoints: "0",
  pledgeClass: "",
  profilePicture: "",
  status: "",
};

export function setField(props) {
  switch (props.key) {
    case "bio":
      newUser.bio = props.value;
      break;
    case "chapter":
      newUser.chapter = props.value;
      break;
    case "email":
      newUser.email = props.value;
      break;
    case "firstname":
      newUser.firstname = props.value;
      break;
    case "lastname":
      newUser.lastname = props.value;
      break;
    case "id":
      newUser.id = props.id;
      break;
    case "linkedin":
      newUser.linkedin = props.value;
      break;
    case "major":
      newUser.major = props.value;
      break;
      case "minor":
        newUser.minor = props.value;
    case "philanthropyPoints":
      newUser.philanthropyPoints = props.value;
      break;
    case "phone":
      newUser.phone = props.value;
      break;
    case "professionalPoints":
      newUser.professionalPoints = props.value;
      break;
    case "socialPoints":
      newUser.socialPoints = props.value;
      break;
    case "pledgeClass":
      newUser.pledgeClass = props.value;
      break;
    case "profilePicture":
      newUser.profilePicture = props.value;
      break;

    case props.status:
      newUser.status = props.value;
      break;
    default:
      console.log("(setting acc) error");
      break;
  }
}

export function AboutPage() {
  return (
    <View style={styles.screen}>
      <Text style={globalStyles.largeSemiBoldText}>About</Text>
      <AboutTextInput placeholder="Activities" />
      <Text style={[globalStyles.mediumBoldText, styles.note]}>
        (Separate With Commas)
      </Text>
      <AboutTextInput
        placeholder="Quote"
        onCustomChange={(text) => setField({ key: "bio", value: text })}
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
    alignItems: "center",
  },
  note: {
    paddingTop: 10,
    paddingBottom: 30,
  },
});
