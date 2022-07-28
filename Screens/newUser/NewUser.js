import {
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Image,
  View,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../../styles/Styles";
import { getCurrentUser, db, auth } from "../../utils/firebase";

export function NewUserTextInput(props) {
  return (
    <View style={styles.inputContainer}>
      <View style={[styles.newUsertextInputContainer, globalStyles.grayBorder]}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={globalStyles.mediumBoldText}
          placeholder={props.placeholder}
          //need to pass in what field to edit for each component
          onChangeText={(text) => props.onCustomChange(text)}
        >
          {props.value}
        </TextInput>
      </View>
    </View>
  );
}
// Text Input field for additional user information in new user flow
export function AboutTextInput(props) {
  return (
    <View style={styles.inputContainer}>
      <View
        style={[styles.largeNewUsertextInputContainer, globalStyles.grayBorder]}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={globalStyles.mediumBoldText}
          placeholder={props.placeholder}
          onChangeText={(text) => props.onCustomChange(text)}
        >
          {props.value}
        </TextInput>
      </View>
    </View>
  );
}
export function NextButton(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      title={props.title}
      style={[
        globalStyles.lightGrayFill,
        globalStyles.button,
        globalStyles.grayBorder,
        styles.nextButton,
      ]}
      onPress={() => {
        props.onPress()
      }}
    >
      <Text style={[globalStyles.mediumBoldText]}>{props.title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  newUsertextInputContainer: {
    borderWidth: 10,
    padding: 10,
    borderRadius: 30,
    marginTop: 10,
    width: "100%",
  },
  largeNewUsertextInputContainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    width: "100%",
    height: 100,
  },
  inputContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInputContainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
    marginTop: 10,
    width: "70%",
  },
  nextButton: {
    marginBottom: 50,
  },
});
