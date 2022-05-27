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
function EventImage(props) {
  return (
    <View style={styles.eventImage}>
      <Image
        source={require("../images/event.png")}
        resizeMode="contain"
        style={styles.eventImageBackground}
      />
      <View style={styles.iconCon}>
        <Image
          source={props.icon}
          resizeMode="contain"
          style={styles.eventImageIcon}
        />
      </View>
    </View>
  );
  /*
  <View style={styles.iconCon}>
        <Image
          source={props.icon}
          resizeMode="contain"
          style={styles.pointImageIcon}
        />
      </View>*/
}
function Event(props) {
  return (
    <View style={[globalStyles.cardContainer, styles.eventCard]}>
      <EventImage icon={require("../images/philanthropy.png")} />
      <Text style={globalStyles.largeSemiBoldText}>Cold Cookie</Text>
      <Text style={globalStyles.smallBoldText}>8/7 @ 5:00</Text>
    </View>
  );
}
function EventSection(props) {
  return (
    <View style={styles.eventSection}>
      <Text style={[globalStyles.smallBoldText, styles.eventTime]}>{props.time}</Text>
      <Event />
      <Event />
    </View>
  )
}
export function EventsPage() {
  return (
    <View style={styles.eventScreen}>
      <TopBar />
      <ScrollView style={styles.scroll}>
        <View style={styles.scrollView}>
          <EventSection time="Today" />
          <EventSection time="Tomorrow" />
          <EventSection time="Future" />
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
  },
  eventSection: {
    width: "80%"
  },
  scroll: {
    marginTop: 30,
    width: "100%",
  },
  scrollView: {
    justifyContent: "center",
    alignItems: "center"
  },
  eventCard: {
    marginBottom: 10
  },
  eventTime: {
    marginBottom: 10
  },
  eventImageBackground: {
    position: "absolute",
    width: 50,
    height: 50
  },
  eventImageIcon: {
    width: 22,
    height: 22
  },
  iconCon: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  }
})
