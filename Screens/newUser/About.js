import { TouchableOpacity, Text, View, TextInput, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Octicons from "react-native-vector-icons/Octicons";

import NewUserContext from "../../utils/NewUserContext";

export function AboutPage() {
 
  const [hometown, setHometown] = useState("");
  const [activities, setActivities] = useState("");
  const [nextPressed, setNextPressed] = useState(false);
  const [quote, setQuote] = useState("");
  const navigation = useNavigation();
  const newUserContext = useContext(NewUserContext);

  const updateAbout = () => {
    setNextPressed(true);
      if(quote  === "" || hometown  === ""){
        return;
      }
      newUserContext.hometown = hometown;
      newUserContext.activities = activities.split(/\,\s|\,/);
      newUserContext.bio = quote;
      navigation.navigate("Contact");

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
              About
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
                autoCapitalize="sentences"
                autoCorrect={false}
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 16,
                  color: "#262626",
                }}
                placeholder={"Funny quote"}
                onChangeText={(text) => setQuote(text)}
              >
                {quote}
              </TextInput>
            </View>
            {nextPressed && quote === "" ? (
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
                autoCapitalize="words"
                autoCorrect={false}
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 16,
                  color: "#262626",
                }}
                placeholder={"Hometown"}
                onChangeText={(text) => setHometown(text)}
              >
                {hometown}
              </TextInput>
            </View>
            {nextPressed && hometown === "" ? (
              <Text
                style={{
                  width: "90%",
                  paddingTop: 4,
                  paddingLeft: 10,
                  fontFamily: "Poppins_500Medium",
                  color: "#E35B56",
                }}
              >
                Hometown is required
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
                autoCapitalize="words"
                autoCorrect={false}
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 16,
                  color: "#262626",
                }}
                placeholder={"Activities/Clubs"}
                onChangeText={(text) => setActivities(text)}
              >
                {activities}
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
              onPress={updateAbout}
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
