
import globalStyles from "../styles/Styles";
import { StyleSheet, TouchableOpacity, Text, Image, View } from "react-native";
import colors from "../styles/Colors";
import { useNavigation } from '@react-navigation/native';
import { auth, db } from "../utils/firebase";
import { useEffect, useState } from "react";

const points = [3, 3, 6];
const totalPoints = [4, 6, 6];

export function SubmitPoints(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      title={props.title}
      style={[
        globalStyles.universityColorFill,
        globalStyles.button,
        styles.submitButton,
      ]}
      onPress={() => {
        navigation.navigate(props.address);
      }}
    >
      <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>
        {props.title}
      </Text>
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
  );
}
function PointBar(props) {
  var percent = (props.points / props.total) * 100 + "%";
  var color;
  if (props.title === "Philanthropy") {
    color = colors.maroon;
  } else if (props.title === "Professional") {
    color = colors.red;
  } else if (props.title === "Social") {
    color = colors.gold;
  }
  return (
    <View
      style={[styles.pointBar, { width: percent, borderColor: color }]}
    ></View>
  );
}
function PointCard(props) {
  return (
    <View style={globalStyles.cardContainer}>
      <View style={globalStyles.cardAlign}>
        <PointImage points={props.points} icon={props.icon} />
        <Text style={globalStyles.largeSemiBoldText}>{props.title}</Text>
        <Text style={globalStyles.largeSemiBoldText}>
          {props.points + "/" + props.totalPoints}
        </Text>
      </View>
      <PointBar
        points={props.points}
        total={props.totalPoints}
        title={props.title}
      />
    </View>
  );
}
function PointDisplay(props) {
  return (
    <View style={styles.points}>
      <PointCard
        title="Philanthropy"
        points={props.philanthropyPoints}
        totalPoints={props.totalPhilanthropyPoints}
        icon={require("../images/philanthropy.png")}
      />
      <PointCard
        title="Professional"
        points={props.professionalPoints}
        totalPoints={props.totalProfessionalPoints}
        icon={require("../images/professional.png")}
      />
      <PointCard
        title="Social"
        points={props.socialPoints}
        totalPoints={props.totalSocialPoints}
        icon={require("../images/social.png")}
      />
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
  major: "Computer Science",
};
export function HomePage() {
  const [philanthropyPoints, setPhilanthropyPoints] = useState(0);
  const [socialPoints, setSocialPoints] = useState(0);
  const [professionalPoints, setProfessionalPoints] = useState(0);
  //error
  const [totalPhilanthropyPoints, setTotalPhilanthropyPoints] = useState(3);
  const [totalSocialPoints, setTotalSocialPoints] = useState(3);
  const [totalProfessionalPoints, setTotalProfessionalPoints] = useState(3);
  const navigation = useNavigation();

  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((doc) => {
        const data = doc.data();
        setPhilanthropyPoints(data.philanthropyPoints);
        setProfessionalPoints(data.professionalPoints);
        setSocialPoints(data.socialPoints);
        const status = data.status;
        db.collection("admin-settings")
          .doc("points")
          .get()
          .then((doc1) => {
            const data1 = doc1.data();
            switch (status) {
              case "pledge":
                setTotalPhilanthropyPoints(data1.pledgePhilanthropyPoints);
                setTotalProfessionalPoints(data1.pledgeProfessionalPoints);
                setTotalSocialPoints(data1.pledgeSocialPoints);
                break;
              case "active":
                setTotalPhilanthropyPoints(data1.activePhilanthropyPoints);
                setTotalProfessionalPoints(data1.activeProfessionalPoints);
                setTotalSocialPoints(data1.activeSocialPoints);
                break;
              case "inactive":
                setTotalPhilanthropyPoints(0);
                setTotalProfessionalPoints(0);
                setTotalSocialPoints(0);
                break;
              case "suspended":
                //navigation.navigate("Suspeneded"); Screen for people who are suspended error message
                // and locks them from the app TODO
                break;
            }
          }).catch((error) => {
            console.log("(Home) Error: Could not get admin points document");
          })
      }).catch((error) => {
        console.log("(Home) Error: getting events documents: ", error);
      });
  }, [])
  return (
    <View style={styles.homeScreen}>
      <View style={{
        justifyContent: "center"
      }}
      />
      <PointDisplay
        philanthropyPoints={philanthropyPoints}
        socialPoints={socialPoints}
        professionalPoints={professionalPoints}

        totalPhilanthropyPoints={totalPhilanthropyPoints}
        totalSocialPoints={totalSocialPoints}
        totalProfessionalPoints={totalProfessionalPoints}
      />
      <SubmitPoints address="Submit" title="Submit Points" />
    </View>
  );
}
const styles = StyleSheet.create({
  homeScreen: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  submitButton: {
    marginBottom: 10,
  },
  points: {
    width: "80%",
    height: 260,
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "space-between",
  },
  pointImage: {
    height: 50,
    width: 50,
  },
  pointImageBackground: {
    position: "absolute",
    width: 50,
    height: 50,
  },
  pointImageIcon: {
    width: 50,
    height: 50,
  },
  iconCon: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  pointBar: {
    marginTop: 10,
    borderBottomWidth: 3,
  },
});
