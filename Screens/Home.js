import { TouchableOpacity, Text, Image, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useContext } from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import colors from "../styles/Colors";
import LoginContext from "../utils/LoginContext";

export function SubmitPoints(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      title={props.title}
      style={[
        { backgroundColor: colors.universityColor, borderRadius: 10, width: "100%", alignItems: "center", justifyContent: "center", height: 50, borderColor: colors.universityFadedColor }
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
function PointCard(props) {
  const width = (props.points / props.totalPoints * 100 > 100) ? '100%' : props.points / props.totalPoints * 100 + '%'

  return (
    <View style={{ height: 50, width: '90%', flexDirection: 'row', paddingRight: 8 }}>
      <View style={{ width: '20%', justifyContent: 'center' }}>
        <Image
          source={props.image}
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
        />
      </View>
      <View style={{ width: '80%', paddingLeft: 5, justifyContent: 'center' }}>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#262626' }}>{props.name}</Text>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#262626' }}>{props.points + '/' + props.totalPoints}</Text>
        </View>
        <View>
          <View style={{ width: '100%', borderRadius: 3, marginTop: 4, height: 4, backgroundColor: '#F2F2F2' }}></View>
          <View style={{ position: 'absolute', width: width, borderRadius: 3, marginTop: 4, height: 4, backgroundColor: props.color }}></View>
        </View>
      </View>
    </View>
  );
}

function PointDisplay(props) {
  const navigation = useNavigation();
  
  return (
    <View style={{ backgroundColor: '#FFFFFF', width: '90%', height: 360, borderWidth: 1, borderColor: '#D8D8D8', borderRadius: 10 }}>
      <View style={{ height: 60, width: '100%', borderBottomWidth: 1, borderColor: '#DBDBDB', alignItems: 'center', paddingLeft: 20, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20 }}>
        <Text style={{ fontSize: 22, fontFamily: 'Poppins_600SemiBold', color: '#262626' }}>Points</Text>
        <TouchableOpacity
          style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.universityColor + '50', borderRadius: 20 }}
          onPress={() => {
            navigation.navigate('Waitlist');
          }}
        >
          <FontAwesome5Icon
            name='clipboard-list'
            color={colors.universityColor}
            size={26}
          />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'space-evenly', height: 300 }}>
        <PointCard
          name={'Philanthropy'}
          image={require('../images/philanthropy.png')}
          points={props.philanthropyPoints}
          totalPoints={props.totalPhilanthropyPoints}
          color={'#75070A'}
        />
        <PointCard
          name={'Professional'}
          image={require('../images/professional.png')}
          points={props.professionalPoints}
          totalPoints={props.totalProfessionalPoints}
          color={'#E35B56'}
        />
        <PointCard
          name={'Social'}
          image={require('../images/social.png')}
          points={props.socialPoints}
          totalPoints={props.totalSocialPoints}
          color={'#EFA039'}
        />
      </View>
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
    <View style={{ flex: 1, backgroundColor: '#FAFAFA', alignItems: "center", justifyContent: "space-between" }}>
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
