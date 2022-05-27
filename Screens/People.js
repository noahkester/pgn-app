import {
    StyleSheet,
    Button,
    TouchableOpacity,
    Text,
    Image,
    View,
    ScrollView,
  } from "react-native";
  import globalStyles from "../Styles";
  import { TopBar } from "./Tabs";
  
  
  export function PeoplePage() {
    return (
      <View style={styles.eventScreen}>
        <TopBar />
        <ScrollView>
          <Text>People</Text>
        </ScrollView>
      </View>
    );
  }
  const styles = StyleSheet.create({
    eventScreen: {
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "space-between"
    }
  })