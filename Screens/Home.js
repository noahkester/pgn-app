import { TouchableOpacity, Text, Image, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useContext } from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../styles/Colors";
import LoginContext from "../utils/LoginContext";
import AdminContext from "../utils/AdminContext";

export function SubmitPoints(props) {
  const navigation = useNavigation();
  const loginContext = useContext(LoginContext);
  const color = loginContext.color;
  return (
    <TouchableOpacity
      title={props.title}
      style={[
        { backgroundColor: color, borderRadius: 10, width: "100%", alignItems: "center", justifyContent: "center", height: 50, borderColor: colors.universityFadedColor }
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
      <View style={{ marginRight: 10, justifyContent: 'center' }}>
        <Image
          source={props.image}
          resizeMode="contain"
          style={{ width: 40, height: 40 }}
        />
      </View>
      <View style={{ width: '80%', paddingLeft: 5, justifyContent: 'center' }}>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626' }}>{props.name}</Text>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626' }}>{props.points + '/' + props.totalPoints}</Text>
        </View>
        <View>
          <View style={{ width: '100%', borderRadius: 3, marginTop: 4, height: 4, backgroundColor: '#F2F2F2' }}></View>
          <View style={{ position: 'absolute', width: width, borderRadius: 3, marginTop: 4, height: 4, backgroundColor: props.color }}></View>
        </View>
      </View>
    </View>
  );
}
function SubRequirement(props) {
  const requirementMet = props.completed >= props.required;
  const color = requirementMet ? '#D5D5D5' : '#5F6368';
  var icon;
  var completion;
  switch (props.label) {
    case 'Dues':
      icon =
        <FontAwesome5Icon
          name={'money-bill-wave'}
          size={20}
          color={color}
        />
      break;
    case 'Interviews':
      icon = <IonIcons
        name={'chatbubble-ellipses'}
        size={20}
        color={color}
      />
      break;
    case 'Attendance':
      icon =
        <MaterialCommunityIcons
          name={'clock-check'}
          size={20}
          color={color}
        />
      break;
  }
  switch (props.type) {
    case 'Checkbox':
      completion =
        <View style={{ borderColor: color, width: 16, height: 16, borderWidth: 1, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
          {
            (requirementMet) ?
              <FontAwesome5Icon
                name={'check'}
                size={10}
                color={'#85C67E'}
              /> : null
          }
        </View>
      break;
    case 'Fraction':
      completion =
        <View>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12, color: color }}>{props.completed + '/' + props.required}</Text>
        </View>
      break;
    case 'Percentage':
      completion =
        <View>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12, color: color }}>{Math.round(props.completed / props.required * 100) + '%'}</Text>
        </View>
      break;
  }
  return (
    <View style={{ width: '33%', padding: 6, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
      {icon}
      <View style={{ width: '100%', paddingLeft: 2, paddingRight: 2 }}>
        <Text style={{ textAlign: 'center', color: color, fontFamily: 'Poppins_600SemiBold', fontSize: 12 }}>{props.label}</Text>
      </View>
      {completion}
    </View>
  )
}

function PointDisplay(props) {
  const loginContext = useContext(LoginContext);
  const adminContext = useContext(AdminContext);

  const dues = loginContext.currentUser.dues;
  const activeInterviews = loginContext.currentUser.activeInterviews;
  const attendance = loginContext.currentUser.attendance;

  const totalChapterMeetings = adminContext.points.totalChapterMeetings;
  const adminActiveMeetings = adminContext.points.activeInterviews;

  const philanthropyPoints = loginContext.currentUser.philanthropyPoints;
  const professionalPoints = loginContext.currentUser.professionalPoints;
  const socialPoints = loginContext.currentUser.socialPoints;

  var totalPhilanthropyPoints = 0;
  var totalSocialPoints = 0;
  var totalProfessionalPoints = 0;

  const status = loginContext.currentUser.status;

  switch (status) {
    case 'active':
      totalPhilanthropyPoints = adminContext.points.activePhilanthropyPoints;
      totalProfessionalPoints = adminContext.points.activeProfessionalPoints;
      totalSocialPoints = adminContext.points.activeSocialPoints;
      break;
    case 'pledge':
      totalPhilanthropyPoints = adminContext.points.pledgePhilanthropyPoints;
      totalProfessionalPoints = adminContext.points.pledgeProfessionalPoints;
      totalSocialPoints = adminContext.points.pledgeSocialPoints;
      break;
  }

  return (
    <View style={{ backgroundColor: '#FFFFFF', width: '90%', paddingBottom: 10, height: '70%', borderWidth: 1, borderColor: '#D8D8D8', borderRadius: 10, alignItems: 'center' }}>
      <View style={{ alignItems: 'center', justifyContent: 'space-evenly', width: '100%', height: '100%' }}>
        <PointCard
          name={'Philanthropy'}
          image={require('../images/philanthropy.png')}
          points={philanthropyPoints}
          totalPoints={totalPhilanthropyPoints}
          color={'#75070A'}
        />
        <PointCard
          name={'Professional'}
          image={require('../images/professional.png')}
          points={professionalPoints}
          totalPoints={totalProfessionalPoints}
          color={'#E35B56'}
        />
        <PointCard
          name={'Social'}
          image={require('../images/social.png')}
          points={socialPoints}
          totalPoints={totalSocialPoints}
          color={'#EFA039'}
        />

        <View style={{ width: '100%', flexWrap: 'wrap', flexDirection: 'row' }}>
          <SubRequirement
            label={'Dues'}
            type={'Checkbox'}
            completed={dues ? 1 : 0}
            required={1}
          />
          {/*TODO Create a more dynamic way to render this besides active vs not (pull from firebase)*/}
          {
            (status === 'pledge') ?
              <SubRequirement
                label={'Interviews'}
                type={'Fraction'}
                completed={activeInterviews}
                required={adminActiveMeetings}
              />
              : null
          }
          <SubRequirement
            label={'Attendance'}
            type={'Percentage'}
            completed={attendance}
            required={totalChapterMeetings}
          />
        </View>

      </View>

    </View>
  );
}
function HomePageHeader() {
  const navigation = useNavigation();
  const loginContext = useContext(LoginContext);

  return (
    <View style={{ marginBottom: 10, width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 22, fontFamily: 'Poppins_600SemiBold', color: '#262626' }}>{"Hello, " + loginContext.currentUser.firstname}</Text>
      <TouchableOpacity
        style={{ width: 46, height: 46, alignItems: 'center', justifyContent: 'center', backgroundColor: loginContext.color + '50', borderRadius: 23 }}
        onPress={() => {
          navigation.navigate('Waitlist');
        }}
      >
        <FontAwesome5Icon
          name='clipboard-list'
          color={loginContext.color}
          size={28}
        />
      </TouchableOpacity>
    </View>
  )
}
export function HomePage() {
  const loginContext = useContext(LoginContext);

  return (
    <View style={{ flex: 1, backgroundColor: '#FAFAFA', alignItems: "center", paddingTop: 30 }}>
      <HomePageHeader />
      <PointDisplay />
      <View style={{ position: 'absolute', width: '90%', flexDirection: 'row', alignItems: 'center', bottom: 10 }}>
        <SubmitPoints address="Submit" title="Submit" />
      </View>
    </View>
  );
}
