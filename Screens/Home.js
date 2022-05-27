import { TopBar } from "./Tabs";
import globalStyles from "../Styles";
import { StyleSheet, TouchableOpacity, Text, Image, View, } from "react-native";

function SubmitPoints() {
  return (
    <TouchableOpacity
      title={"Submit Points"}
      style={[globalStyles.universityColorFill, globalStyles.button, styles.submitButton]}
    >
      <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>{"Submit Points"}</Text>
    </TouchableOpacity>
  );
}
function PointImage(props) {
  var imageSrc;
  if (props.points === 6) {
    imageSrc = require("../images/good.png");
  }
  else if (props.points >= 3) {
    imageSrc = require("../images/fair.png");
  }
  else if (props.points >= 0) {
    imageSrc = require("../images/bad.png");
  }
  else {
    // Uncaught error
  }
  return (
    <View style={styles.pointImage}>
      <Image
        source={imageSrc}
        resizeMode="contain"
        style={styles.pointImageBackground}
      />
      <View style={styles.iconCon}>
        <Image
          source={props.icon}
          resizeMode="contain"
          style={styles.pointImageIcon}
        />
      </View>
    </View>
  )
}
function PointCard(props) {
  return (
    <View style={globalStyles.cardContainer}>
      <PointImage points={props.points} icon = {props.icon}/>
      <Text style={globalStyles.largeSemiBoldText}>{props.title}</Text>
      <Text style={globalStyles.largeSemiBoldText}>{props.points + "/6"}</Text>
    </View>
  )
}
function PointDisplay() {
  return (
    <View style={styles.points}>
      <PointCard title="Philanthropy" points={6} icon = {require("../images/philanthropy.png")}/>
      <PointCard title="Professional" points={4} icon = {require("../images/professional.png")}/>
      <PointCard title="Social" points={6} icon = {require("../images/social.png")}/>
    </View>
  );
}
export function HomePage() {
  return (
    <View style={styles.homeScreen}>
      <TopBar />
      <PointDisplay />
      <SubmitPoints />
    </View>
  );
}
const styles = StyleSheet.create({
  homeScreen: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  },
  submitButton: {
    marginBottom: 10
  },
  points: {
    width: "80%",
    height: 260,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  pointImage: {
    height: 50,
    width: 50
  },
  pointImageBackground: {
    position: "absolute",
    width: 50,
    height: 50
  },
  pointImageIcon: {
    width: 22,
    height: 22
  },
  iconCon: {
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  }
})
