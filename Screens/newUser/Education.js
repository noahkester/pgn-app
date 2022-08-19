import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import NewUserContext from "../../utils/NewUserContext";
import Octicons from "react-native-vector-icons/Octicons";

export function EducationPage() {
  const [major, setMajor] = useState("");
  //const [isMajorBlank, setisMajorBlank] = useState(false);
  const [minor, setMinor] = useState("");
  const newUserContext = useContext(NewUserContext);
  const [nextPressed, setNextPressed] = useState(false);
  const navigation = useNavigation();
  const updateEducation = () => {
    setNextPressed(true);
    if(major === ""){
      return;
    }
      newUserContext.major = major;
      newUserContext.minor = minor;
      navigation.navigate("About");
  }
  return (
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
          <View
            style={{
              marginTop: 32,
              height: 100,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Octicons name="chevron-left" color={"#262626"} size={42} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center", marginTop: 180 }}>
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 20,
                  color: "#262626",
                  marginBottom: 20,
                }}
              >
                Education
              </Text>
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "#DBDBDB",
                  width: "90%",
                  height: 50,
                  paddingLeft: 20,
                  justifyContent: "center",
                }}
              >
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 16,
                    color: "#262626",
                  }}
                  placeholder={"Major"}
                  onChangeText={(text) => setMajor(text)}
                  // onEndEditing={() => {
                  //   if (major == "") {
                  //     setisMajorBlank(true);
                  //   } else {
                  //     setisMajorBlank(false);
                  //   }
                  // }}
                >
                  {major}
                </TextInput>
              </View>
              {nextPressed && major === "" ? (
                <Text
                  style={{
                    width: "90%",
                    paddingTop: 4,
                    paddingLeft: 10,
                    fontFamily: "Poppins_500Medium",
                    color: "#E35B56",
                  }}
                >
                  Major is required
                </Text>
              ) : null}
              <View
                style={{
                  width: "90%",
                  height: 1,
                  marginTop: 10,
                  marginBottom: 10,
                  backgroundColor: "#DBDBDB",
                }}
              />
              <View
                style={{
                  borderWidth: 1,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 10,
                  borderColor: "#DBDBDB",
                  width: "90%",
                  height: 50,
                  paddingLeft: 20,
                  justifyContent: "center",
                }}
              >
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 16,
                    color: "#262626",
                  }}
                  placeholder={"Minor"}
                  onChangeText={(text) => setMinor(text)}
                >
                  {minor}
                </TextInput>
              </View>
              <Text
                style={{
                  marginTop: 6,
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 12,
                  color: "#8E8E8E",
                }}
              >
                For multiple, separate with commas
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                position: "absolute",
                bottom: 60,
              }}
            >
              <TouchableOpacity
                style={{
                  width: "90%",
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#DBDBDB",
                  backgroundColor: "#FFFFFF",
                }}
                onPress={() => {updateEducation();}}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 16,
                    color: "#262626",
                  }}
                >
                  {"Next"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
  );
                }
