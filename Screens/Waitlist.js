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


export function WaitlistPage() {
  return (
    <View style={styles.eventScreen}>
      <TopBar />
      <ScrollView style={globalStyles.scroll}>
        <View style={globalStyles.scrollView}>
          <Text>Waitlist</Text>
        </View>
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