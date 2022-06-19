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
import { useNavigation } from '@react-navigation/native';
import { db, store } from "../Firebase";

function PeopleImage(props) {
  // TODO Add images
  if (props.uri) {
    return (
      <View style={styles.people}>
        <Image
          source={{ uri: props.uri }}
          resizeMode="cover"
          style={styles.peopleImageBackground}
        />
      </View>
    );
  }
  return (
    <View style={styles.people}>
      <Image
        source={require("../images/profile.png")}
        resizeMode="contain"
        style={styles.peopleImageBackground}
      />
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
  const navigation = useNavigation();
  const [profileUrl, setProfileUrl] = useState("");
  useEffect(() => {
    store
      .ref(`/profile-pictures/${props.data.id}_professional`)
      .getDownloadURL()
      .then((url) => {
        setProfileUrl(url);
      })
      .catch((e) => console.log('(Person) Error getting Professional Picture ', e));
  })
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Person", { memberData: props.data })}
    >
      <View
        style={[
          globalStyles.cardContainer,
          styles.peopleCard,
          globalStyles.cardAlign,
        ]}
      >
        <PeopleImage uri={profileUrl} />
        <View style={styles.peopleText}>
          <Text style={globalStyles.smallSemiBoldText}>{props.data.firstname + " " + props.data.lastname}</Text>
          <Text style={globalStyles.tinySemiBoldText}>
            {'"' + props.data.bio + '"'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export function PeoplePage() {
  // TODO pull to get users 'Spring 2022'
  // TODO pull all users and filer on pledge class

  //search bar
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState();
  useEffect(() => {
    //will be a fetch once the backend is complete
    //https://snack.expo.dev/@aboutreact/react-native-search-bar-filter-on-listview
    var allUsers = [];
    db.collection("users")
      .where("pledgeClass", "==", "Spring 2022")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var data = doc.data();
          allUsers.push(data);
          //NOTICED BUGS
          //WHILE pressing the first IMAGEUPLOAD when creating a new user, the second one's coverage area overlaps I think
          //NEED TO CAPITALIZE THE FIRST AND LAST NAME ENTRIES
          //CANNOT CANCEL DURING TEXT INPUTS FOR NEW USER
          //1. IMAGEUPLOAD WHEN CANCELLED PLACEHOLDER DISAPPEARS
          //2. 3RD IMAGE UPLOAD DOESN'T FIT THE PAGE WHEN FIT.
          //3. SEARCH BAR STILL NOT FUNCTIONAL
          //4. SORTING> CAN BE EXPANDED TO SEE ALL PEOPLE, OR FILTER TO SEE ONLY PLEDGECLASS AND SUCH. 
          allUsers = [...allUsers].sort((a,b) =>    a.firstname > b.firstname? 1 : -1,
          );
          var section = allUsers.map((people) => {
            return (
              <People
                data={people}
              />
            );
          });
          setFilteredDataSource(section);
          setMasterDataSource(section);
        })
      })
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
          inputContainerStyle={{
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
    borderRadius: 25
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
