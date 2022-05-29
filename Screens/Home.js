import { TopBar } from "./Tabs";
import globalStyles from "../Styles";
import { StyleSheet, TouchableOpacity, Text, Image, View, } from "react-native";
import colors from "../Colors";
import { useNavigation } from '@react-navigation/native';
import { auth } from "../firebase";

const points = [3, 3, 6]
const totalPoints = [4, 6, 6]

export function SubmitPoints(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      title={props.title}
      style={[globalStyles.universityColorFill, globalStyles.button, styles.submitButton]}
      onPress={() => navigation.navigate(props.address)}
    >
      <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>{props.title}</Text>
    </TouchableOpacity>
  );
}
function PointImage(props) {
  return (
    <View style={styles.pointImage}>
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
function PointBar(props) {
  var percent = ((props.points / props.total) * 100) + "%";
  var color;
  if (props.title === "Philanthropy") {
    color = colors.maroon;
  }
  else if (props.title === "Professional") {
    color = colors.red;
  }
  else if (props.title === "Social") {
    color = colors.gold;
  }
  return (
    <View style={[styles.pointBar, { width: percent, borderColor: color }]}>
    </View>
  )
}
function PointCard(props) {
  return (
    <View style={globalStyles.cardContainer}>
      <View style={globalStyles.cardAlign}>
        <PointImage points={props.points} icon={props.icon} />
        <Text style={globalStyles.largeSemiBoldText}>{props.title}</Text>
        <Text style={globalStyles.largeSemiBoldText}>{props.points + "/" + props.totalPoints}</Text>
      </View>
      <PointBar points={props.points} total={props.totalPoints} title={props.title} />
    </View>
  )
}
function PointDisplay() {
  return (
    <View style={styles.points}>
      <PointCard title="Philanthropy" points={points[0]} totalPoints={totalPoints[0]} icon={require("../images/philanthropy.png")} />
      <PointCard title="Professional" points={points[1]} totalPoints={totalPoints[1]} icon={require("../images/professional.png")} />
      <PointCard title="Social" points={points[2]} totalPoints={totalPoints[2]} icon={require("../images/social.png")} />
    </View>
  );
}
const accountInfo = {
  name: "Noah Kester",
  bio: "This is my bio",
  linkedin: "https://thisisalink",
  email: "noah@gmail.com",
  number: "123-456-7890",
  image: "",
  pledgeClass: "Spring 2022",
  status: "Active",
  major: "Computer Science"
}
export function HomePage() {
  return (
    <View style={styles.homeScreen}>
      <TopBar />
      <PointDisplay />
      <SubmitPoints address="Submit" title = "Submit Points"/>
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
    width: 50,
    height: 50
  },
  iconCon: {
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  pointBar: {
    marginTop: 10,
    borderBottomWidth: 3,
  }
})
