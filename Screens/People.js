import {
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Image,
  View,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import globalStyles from "../Styles";
import { SearchBar } from "@rneui/themed";
import { TopBar } from "./Tabs";
var allPeople = [
  {
    name: "Noah Kester",
    bio: "this is a test",
    linkedin: "https://thisisalink",
    email: "noah@gmail.com",
    number: "123-456-7890",
    image: "",
  },
  {
    name: "Akin Bilen",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: "",
  },
  {
    name: "Aidan Weinrot",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: "",
  },
  {
    name: "Andrew Brooks",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: "",
  },
  {
    name: "Anne Daily",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: "",
  },
  {
    name: "Audrey Lundy",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: "",
  },
  {
    name: "Blake Brawner",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: "",
  },
  {
    name: "Brady Lamme",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: "",
  },
  {
    name: "Carolyn Watts",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: "",
  },
  {
    name: "Chole Barker",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    image: "123-456-7890",
  },
  {
    name: "David Wilson",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: "",
  },
  {
    name: "Ella Cole",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: "",
  },
  {
    name: "Ethan Hughes",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: "",
  },
  {
    name: "Ines Guevara",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: "",
  },
  {
    name: "Jackson Osteen",
    bio: "this is another bio",
    linkedin: "https://thisisalink",
    email: "akin@gmail.com",
    number: "123-456-7890",
    image: "",
  },
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

function PeopleSection(props) {
  return (
    <View style={styles.peopleSection}>
      <Text style={[globalStyles.smallBoldText, styles.peopleClass]}>
        {props.class}
      </Text>
      <View>{props.section}</View>
    </View>
  );
}
function People(props) {
  return (
    <TouchableOpacity>
      <View
        style={[
          globalStyles.cardContainer,
          styles.peopleCard,
          globalStyles.cardAlign,
        ]}
      >
        <PeopleImage image={props.image} />
        <View style={styles.peopleText}>
          <Text style={globalStyles.smallSemiBoldText}>{props.name}</Text>
          <Text style={globalStyles.tinySemiBoldText}>
            {'"' + props.bio + '"'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function PeoplePage() {
  var section = allPeople.map((people) => {
    return (
      <People
        key={people.name}
        name={people.name}
        bio={people.bio}
        image={people.image}
      />
    );
  });

  //search bar
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState();
  useEffect(() => {
    //will be a fetch once the backend is complete
    //https://snack.expo.dev/@aboutreact/react-native-search-bar-filter-on-listview

    setFilteredDataSource(section);
    setMasterDataSource(section);
  }, []);

  function searchFilter(text) {
    if (text) {
      const filteredPeople = masterDataSource.filter(function (item) {
        //TODO item.name returns false and therefore just gets "", so nothing shows up
        //structure works since list restores when you delete after typing
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(filteredPeople);
      setSearch(text);
    } else {
      setFilteredDataSource(section);
      setSearch(text);
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.eventScreen}>

        {/* <TextInput
        style={[
          styles.search,
          globalStyles.universityColorFill,
          globalStyles.smallBoldText,
          {shadowColor:'#BBBBBB',
          shadowOpacity: 0.25,
          shadowRadius: 10,}
        ]}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search Member"

        onChangeText={(text) => searchFilter(text)}
        value={search}
      ></TextInput> */}
        {/* //https://reactnativeelements.com/docs/components/searchbar#calling */}
        <SearchBar
          cancelButtonProps={{
            buttonTextStyle: {
              fontSize: 13,
            },
          }}
          inputContainerStyle = {{
            //background Color neeeds to be put manually here
          }}
          containerStyle={{
            backgroundColor: globalStyles.universityColorFill,
            width: "50%",
            right: "4%",
            height: "5%",
            alignSelf: "flex-end",
            borderRadius: 10,
            marginBottom: "2%",
          }}
          style={globalStyles.smallBoldText}
          platform="ios"
          placeholder="Type Here..."
          onChangeText={(text) => searchFilter(text)}
          value={search}
        />

        <ScrollView style={globalStyles.scroll}>
          <View style={globalStyles.scrollView}>
            <PeopleSection
              section={filteredDataSource}
              class={"PC Spring 2022"}
            />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  eventScreen: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  search: {},
  peopleSection: {
    width: "80%",
  },
  peopleCard: {
    marginBottom: 10,
  },
  peopleClass: {
    marginBottom: 10,
  },
  peopleText: {
    width: "80%",
  },
  peopleImageBackground: {
    position: "absolute",
    width: 50,
    height: 50,
  },
  enlargedCard: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "flex-start",
    shadowColor: "#BBBBBB",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    padding: 15,

    borderRadius: 10,
  },
  people: {
    width: 50,
    height: 50,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "red",
  },
});
