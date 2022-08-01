import { TouchableOpacity, Text, Image, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useContext } from "react";

import colors from "../styles/Colors";
import globalStyles from "../styles/Styles";
import LoginContext from "../utils/LoginContext";

export function SubmitPoints(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      title={props.title}
      style={[
        { backgroundColor: colors.universityColor, borderRadius: 32, width: "100%", alignItems: "center", justifyContent: "center", height: 64, borderWidth: 6, borderColor: colors.universityFadedColor }
      ]}
      onPress={() => {
        navigation.navigate(props.address);
      }}
    >
      <Text style={{ color: '#FFFFFF', fontFamily: 'Poppins_700Bold', fontSize: 16 }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}
function PointImage(props) {
  return (
    <View style={{ height: 50, width: 50 }}>
      <View style={{ height: 50, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={props.icon}
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
        />
      </View>
    </View >
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
      style={{ marginTop: 10, borderBottomWidth: 3, width: percent, borderColor: color }}
    ></View>
  );
}
function PointCard(props) {
  return (
    <View style={{ borderWidth: 1, paddingLeft: 8, paddingRight: 8, paddingTop: 12, paddingBottom: 12, borderColor: '#DBDBDB', borderRadius: 10 }}>
      <View style={globalStyles.cardAlign}>
        <PointImage points={props.points} icon={props.icon} />
        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 18, color: '#262626' }}>{props.title}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', width: 50 }}>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 18, color: '#262626' }}>
            {props.points + "/" + props.totalPoints}
          </Text>
        </View>
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
    <View style={{ width: "85%", height: 300, flexDirection: "column", justifyContent: "space-between", alignContent: "space-between", }}>
      <PointCard
        title="Philanthropy"
        points={props.philanthropyPoints}
        totalPoints={props.totalPhilanthropyPoints}
        icon={require("../images/philanthropy.png")}
      />
      <View style={{ height: 10 }} />
      <PointCard
        title="Professional"
        points={props.professionalPoints}
        totalPoints={props.totalProfessionalPoints}
        icon={require("../images/professional.png")}
      />
      <View style={{ height: 10 }} />
      <PointCard
        title="Social"
        points={props.socialPoints}
        totalPoints={props.totalSocialPoints}
        icon={require("../images/social.png")}
      />
      {(props.isPledge) ?
        <View style={{ marginTop: 16, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12, color: '#262626' }}>{'Active Interviews: '}</Text>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12, color: '#262626' }}>{props.activeInterviews + '/3'}</Text>
        </View>
        : null
      }
    </View>
  );
}

export function HomePage() {
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "space-between" }}>
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
      <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <SubmitPoints address="Submit" title="Submit" />
      </View>
    </View>
  );
}
