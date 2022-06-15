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

// export const [bio, setBio] = useState("");
// export const [chapter, setChapter] = useState("");
// export const [email, setEmail] = useState("");
// export const [firstname, setFirstName] = useState("");
// export const [lastname, setLastName] = useState("");
// export const [id, setId] = useState("");
// export const [major, setMajor] = useState("");
// export const [philanthropyPoints, setPhilanthropyPoints] = useState("");
// export const [socialPoints, setSocialPoints] = useState("");
// export const [professionalPoints, setProfessionalPoints] = useState("");
// export const [phone, setPhone] = useState("");
// export const [pledgeClass, setPledgeClass] = useState("");
// export const [status, setStatus] = useState("");

export var newUser = {
  bio: "",
  chapter: "",
  email: "",
  firstname: "",
  lastname: "",
  //can use the auth.uid as the id for the collection instead!!
  id: "",
  linkedin: "",
  major: "",
  philanthropyPoints: "",
  phone: "",
  professionalPoints: "",
  socialPoints: "",
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
      newUser.linkedin = props.value0;
      break;
    case "major":
      newUser.major = props.major;
      break;
    case "philanthropyPoints":
      newUser.philanthropyPoints = props.philanthropyPoints;
      break;
    case "phone":
      newUser.phone = props.phone;
      break;
    case "professionalPoints":
      newUser.professionalPoints = props.professionalPoints;
      break;
    case "socialPoints":
      newUser.socialPoints = props.socialPoints;
      break;
    case "pledgeClass":
      newUser.pledgeClass = props.pledgeClass;
      break;
    case "profilePicture":
      newUser.profilePicture = props.profilePicture;
      break;

    case props.status:
      newUser.status = props.status;
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
      <AboutTextInput placeholder="Activities"  />
      <Text style={[globalStyles.mediumBoldText, styles.note]}>
        (Separate With Commas)
      </Text>
      <AboutTextInput placeholder="Quote"  />
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
