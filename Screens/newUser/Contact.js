import React from "react";
import { useState, useContext } from "react";
import { TouchableOpacity, Text, TextInput, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Octicons from "react-native-vector-icons/Octicons";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import NewUserContext from "../../utils/NewUserContext";

export function ContactPage() {
  const [linkedin, setLinkedin] = useState("");
  const [isPhoneBlank, setPhoneBlank] = useState(false);
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();
  const newUserContext = useContext(NewUserContext);

  const updateContact = () => {
    newUserContext.linkedin = linkedin;
    newUserContext.phone = phone;
    navigation.navigate("ProfilePictures");
  };
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
                Contact
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
                  placeholder={"Linkedin URL"}
                  onChangeText={(text) => setLinkedin(text)}
                >
                  {linkedin}
                </TextInput>
              </View>
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
                  placeholder={"Phone"}
                  onChangeText={(text) => setPhone(text)}
                  onEndEditing={() => {
                    if (phone == "") {
                      setPhoneBlank(true);
                    } else {
                      setPhoneBlank(false);
                    }
                  }}
                >
                  {phone}
                </TextInput>
              </View>

              {isPhoneBlank ? (
                <Text
                  style={{
                    width: "90%",
                    paddingTop: 4,
                    paddingLeft: 10,
                    fontFamily: "Poppins_500Medium",
                    color: "#E35B56",
                  }}
                >
                  Funny Quote is required
                </Text>
              ) : null}
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
                  backgroundColor: "#FFFFFF",
                  width: "90%",
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#DBDBDB",
                }}
                onPress={updateContact}
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
