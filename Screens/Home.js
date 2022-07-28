
import globalStyles from "../styles/Styles";
import { StyleSheet, TouchableOpacity, Text, Image, View } from "react-native";
import colors from "../styles/Colors";
import { useNavigation } from '@react-navigation/native';
import { auth, db } from "../utils/firebase";
import { useEffect, useState, useContext } from "react";
import LoginContext from "../utils/LoginContext";
import IonIcons from 'react-native-vector-icons/Ionicons';

export function SubmitPoints(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      title={props.title}
      style={[
        globalStyles.universityColorFill,
        {
          borderRadius: 30,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 15,
          paddingBottom: 15,
        }
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
  var dec = (props.total == 0 || props.points / props.total > 1) ? 1 : props.points / props.total;
  var percent = dec * 100 + "%";
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
  [test, setTest] = useState(0);
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
      {(props.isPledge) ?
        <View style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <Image
            source={require("../images/interview.png")}
            resizeMode="contain"
            style={{
              width: 36,
              height: 36,
            }}
          />
          <Text style={globalStyles.smallSemiBoldText}>{'Active Interviews: '}</Text>
          <Text style={globalStyles.smallSemiBoldText}>{props.activeInterviews + '/3'}</Text>
        </View>
        : null
      }
    </View>
  );
}

export function HomePage() {
  const navigation = useNavigation();
  const loginContext = useContext(LoginContext);

  var totalPhilanthropyPoints = 0;
  var totalSocialPoints = 0;
  var totalProfessionalPoints = 0;
  //TODO make dynamic from firebase pull
  switch (loginContext.currentUser.status) {
    case 'active':
      totalPhilanthropyPoints = 3;
      totalSocialPoints = 3;
      totalProfessionalPoints = 3;
      break;
    case 'pledge':
      totalPhilanthropyPoints = 6;
      totalSocialPoints = 6;
      totalProfessionalPoints = 6;
      break;
    case 'inactive':
      console.log("(Home) Error, inactive user, log out or send alert");
  }

  return (
    <View style={styles.homeScreen}>
      <View style={{
        justifyContent: "center"
      }}
      />
      <PointDisplay
        philanthropyPoints={loginContext.currentUser.philanthropyPoints}
        socialPoints={loginContext.currentUser.socialPoints}
        professionalPoints={loginContext.currentUser.professionalPoints}

        totalPhilanthropyPoints={totalPhilanthropyPoints}
        totalSocialPoints={totalSocialPoints}
        totalProfessionalPoints={totalProfessionalPoints}
        activeInterviews={loginContext.currentUser.activeInterviews}
        isPledge={loginContext.currentUser.status === "pledge"}
      />
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>

        <View style={{ marginLeft: 10, width: '76%', marginRight: 10 }}>
          <SubmitPoints address="Submit" title="Submit Points" />
        </View>
        <View style={[{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 30 }, globalStyles.universityColorFill]}>
          <IonIcons
            name="md-barcode"
            color={'#FFFFFF'}
            size={42}
            style={{ marginLeft: 3 }}
          />
        </View>
      </View>

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
