import { StyleSheet, Button, TouchableOpacity, TouchableHighlight, Text, TouchableWithoutFeedback, TextInput, Image, View, ScrollView, Keyboard, } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import globalStyles from "../styles/Styles";
import { SearchBar } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { db, auth, store } from "../utils/firebase";
import Checkbox from "expo-checkbox";
import { findRoleColor, findRoleBorder } from '../styles/Colors';

var allSettled = require('promise.allsettled');


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
      <View style={[globalStyles.universityColorFill, { width: 50, height: 50, borderRadius: 25 }]}>
        <Image
          source={require("../images/account.png")}
          resizeMode="contain"
          style={{ width: '100%', height: '100%' }}
        />
      </View>
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
        <View style={{ width: "80%" }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <View style={{ alignItems: 'baseline' }}>
              <Text style={[globalStyles.smallSemiBoldText, { marginRight: 10 }]}>
                {props.data.firstname + " " + props.data.lastname}
              </Text>
            </View>
            <View style={{ alignItems: 'baseline', backgroundColor: findRoleColor(props.data.role), borderRadius: 100, borderWidth: 2, borderColor: findRoleBorder(props.data.role), paddingLeft: 12, paddingRight: 12, height: 20, justifyContent: 'center' }}>
              <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 10, color: '#FFFFFF' }}>
                {props.data.role}
              </Text>
            </View>
          </View>
          <Text style={[globalStyles.tinySemiBoldText]}>
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
  const [profileMap, setProfileMap] = useState({});

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
        var promises = [];
        querySnapshot.forEach((doc) => {
          var data = doc.data();
          allUsers.push(data);
          allUsers = [...allUsers].sort((a, b) =>
            a.firstname > b.firstname ? 1 : -1
          );
          //store each url in a hashmap
          if (data.id !== undefined) {
            // Issue
            // Refactor to async and await
            // Step 1: declare empty array, standard for loop push async function without await. to resolve all at once, promise.all([functions, functions, ...])
            const promise = store
              .ref(`/profile-pictures/${data.id}_professional`)
              .getDownloadURL()
              .then((url) => {
                profPicMap[data.id] = url;
                console.log("(People) Success, got professional picture for " + data.id)
              })
              .catch((e) => {
                console.log("(People) Error getting Professional Picture for " + data.id)
              });
            promises.push(promise);
          }
        });
        allSettled(promises).then((results) => {
          results.forEach((result) => {
            console.log("(people.js) Promise allSettled");
          });
          setProfileMap(profPicMap);
        })
        var currentUser = allUsers.find((t) => t.id === auth.currentUser.uid);
        //setProfileMap(profPicMap);
        setCurUser(currentUser);
        allUsers = allUsers.filter(
          (item) => item.id != auth.currentUser.uid
        );
        setFilteredDataSource(allUsers);
        setMasterDataSource(allUsers);
      });
  }, []);
  useEffect(() => {
    setSection(
      filteredDataSource.map((people, index) => {
        return <People key={index} data={people} profMap={profileMap} />;
      })
    );
  }, [profileMap])

  //triggered when checkbox is pressed
  useEffect(() => {
    displayPledgeClass(isChecked);
  }, [isChecked]);

  useEffect(() => {
    setSection(
      filteredDataSource.map((people, index) => {
        return <People key={index} data={people} profMap={profileMap} />;
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
            <View style={styles.peopleSection}>
              <View>{section}</View>
            </View>
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
