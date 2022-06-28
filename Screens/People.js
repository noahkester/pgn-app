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
import { useNavigation } from "@react-navigation/native";
import { db, auth, store } from "../firebase";
import Checkbox from "expo-checkbox";

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
      {/* <Text style={[globalStyles.smallBoldText, styles.peopleClass]}>
        {props.class}
      </Text> */}
      <View>{props.section}</View>
    </View>
  );
}
function People(props) {
  const navigation = useNavigation();

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
        <PeopleImage uri={props.profMap[props.data.id]} />
        <View style={styles.peopleText}>
          <Text style={globalStyles.smallSemiBoldText}>
            {props.data.firstname + " " + props.data.lastname}
          </Text>
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
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [section, setSection] = useState();

  //profile pictures
  const [profileMap, setProfileMap] = useState([]);

  //checkbox
  const [isChecked, setChecked] = useState(false);
  const [curUser, setCurUser] = useState(null);
 
  useEffect(() => {
    //will be a fetch once the backend is complete
    //https://snack.expo.dev/@aboutreact/react-native-search-bar-filter-on-listview
    var allUsers = [];
    var profPicMap = {};
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var data = doc.data();
          allUsers.push(data);
          allUsers = [...allUsers].sort((a, b) =>
            a.firstname > b.firstname ? 1 : -1
          );
          

          //store each url in a hashmap
          store
            .ref(`/profile-pictures/${data.id}_professional`)
            .getDownloadURL()
            .then((url) => {
              profPicMap[data.id] = url;
            })
            .catch((e) =>
              console.log("(Person) Error getting Professional Picture ", e)
            );
        });
        var currentUser = allUsers.find((t) => t.id === auth.currentUser.uid);

        setCurUser(currentUser);
        allUsers = allUsers.filter(
          (item) => item.id != auth.currentUser.uid
        );
        setFilteredDataSource(allUsers);
        setMasterDataSource(allUsers);

        setProfileMap(profPicMap);
      });
  }, []);


  //triggered when checkbox is pressed
  useEffect(() => {
    displayPledgeClass(isChecked);
  }, [isChecked]);

  useEffect(() => {
    setSection(
      filteredDataSource.map((people) => {
        return <People data={people} profMap={profileMap} />;
      })
    );
  }, [filteredDataSource]);

  //function for pledge class checkbox, filters allPeople
  function displayPledgeClass() {
    if (isChecked) {
      var pledgePeople = masterDataSource.filter((item) => {
        return item.pledgeClass == curUser.pledgeClass;
      });
      setFilteredDataSource(pledgePeople);
    } else {
      setFilteredDataSource(masterDataSource);
    }
  }

  function searchFilter(text) {
    if (text) {
      const filteredPeople = masterDataSource.filter((item) => {
        //WHEN SET TO UPPERCASE ->> SUCCESSFULLY FINDS ALL THE NAMES WITH THE
        //TYPED LETTER, HOWEVER DOESN'T FIND THE NAME WHEN SUCCESSFULLY TYPED OUT

        //WHEN SET TO LOWERCASE ->> doesn't find the name when starts typing
        //with a uppercase, finds everything successfully if typed in lowercase!!

        //RN FINDS NAMES CASE SENSITIVE "A" SHOWS Akin "a" shows Noah and Raaga, and such.!!!!
        const itemData = item.firstname;
        const textData = text.charAt(0).toUpperCase();
        const result = itemData.includes(text);

        return result;
      });

      setSearch(text);
      setFilteredDataSource(filteredPeople);
    } else {
      setSearch(text);
      setFilteredDataSource(masterDataSource);
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.eventScreen}>
        {/* //https://reactnativeelements.com/docs/components/searchbar#calling */}

        <SearchBar
          cancelButtonProps={{
            buttonTextStyle: {
              fontSize: 13,
            },
          }}
          inputContainerStyle={
            {
              //background Color neeeds to be put manually here
            }
          }
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
        <View style={styles.myPledgeClass}>
          <Text style={globalStyles.mediumBoldText}>My Pledge Class</Text>
          <Checkbox
            style={{ marginLeft: "2%", alignSelf: "center" }}
            value={isChecked}
            onValueChange={setChecked}
          />
        </View>
        <ScrollView style={globalStyles.scroll}>
          <View style={globalStyles.scrollView}>
            <PeopleSection section={section} class={"PC Spring 2022"} />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  myPledgeClass: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: "8%",
    marginTop: "2.5%",
    paddingBottom: "1%",
  },
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
    borderRadius: 25,
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
