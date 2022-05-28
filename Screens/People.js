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
var allPeople = [
  {
    name: "Noah Kester",
    bio: "this is a test",
    linkedin: "https://thisisalink",
    email: "noah@gmail.com",
    number: "123-456-7890",
    image: ""
  },
  {
    name: "Akin Bilen",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: ""
  },
  {
    name: "Aidan Weinrot",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: ""
  },
  {
    name: "Andrew Brooks",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: ""
  },
  {
    name: "Anne Daily",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: ""
  },
  {
    name: "Audrey Lundy",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: ""
  },
  {
    name: "Blake Brawner",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: ""
  },
  {
    name: "Brady Lamme",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: ""
  },
  {
    name: "Carolyn Watts",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: ""
  },
  {
    name: "Chole Barker",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    image: "123-456-7890"
  },
  {
    name: "David Wilson",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: ""
  },
  {
    name: "Ella Cole",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: ""
  },
  {
    name: "Ethan Hughes",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: ""
  },
  {
    name: "Ines Guevara",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: ""
  },
  {
    name: "Jackson Osteen",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: ""
  }
];

function PeopleImage(props) {
  // TODO Add images
  var profile;
  if (!(props.image === "")) {
    profile = <View style={styles.profileImage}></View>;
  }
  return (
    <View style={styles.people}>
      <Image
        source={require("../images/profile.png")}
        resizeMode="contain"
        style={styles.peopleImageBackground}
      />
      {profile}
    </View>
  );
}
function People(props) {
  // In the future, add animation to show contact info after a click
  return (
    <View style={[globalStyles.cardContainer, styles.peopleCard, globalStyles.cardAlign]}>
      <PeopleImage image={props.image} />
      <View style={styles.peopleText}>
        <Text style={globalStyles.smallSemiBoldText}>{props.name}</Text>
        <Text style={globalStyles.tinySemiBoldText}>{"\"" + props.bio + "\""}</Text>
      </View>
    </View>
  )
}
function PeopleSection(props) {
  var section = allPeople.map((people) => {
    return <People key = {people.name} name={people.name} bio={people.bio} image={people.image} />;
  })

  return (
    <View style={styles.peopleSection}>
      <Text style={[globalStyles.smallBoldText, styles.peopleClass]}>{props.class}</Text>
      <View>
        {section}
      </View>
    </View>
  );
}

export function PeoplePage() {
  return (
    <View style={styles.eventScreen}>
      <TopBar />
      <ScrollView style={globalStyles.scroll}>
        <View style={globalStyles.scrollView}>
          <PeopleSection class={"PC Spring 2022"} />
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
  peopleSection: {
    width: "80%"
  },
  peopleCard: {
    marginBottom: 10
  },
  peopleClass: {
    marginBottom: 10
  },
  peopleText: {
    width: "80%"
  },
  peopleImageBackground: {
    position: "absolute",
    width: 50,
    height: 50,
  },
  people: {
    width: 50,
    height: 50,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "red"
  }
})