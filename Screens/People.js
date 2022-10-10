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
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";
import globalStyles from "../styles/Styles";
import { SearchBar } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { db, auth, store } from "../utils/firebase";
import Checkbox from "expo-checkbox";
import { findRoleColor } from "../styles/Colors";
import LoginContext from "../utils/LoginContext";
import { createRef } from "react";
import { Suspense } from "react";
// import { enableFreeze } from "react-native-screens";

// enableFreeze(true);
var allSettled = require("promise.allsettled");

function PeopleImage(props) {
  const loginContext = useContext(LoginContext);

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
      <View
        style={[
          {
            backgroundColor: loginContext.color,
            width: 50,
            height: 50,
            borderRadius: 25,
          },
        ]}
      >
        <Image
          source={require("../images/account.png")}
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </View>
  );
}

function PeopleLoading() {
  return (
    <View
      style={{
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#DBDBDB",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <View
        style={[
          {
            opacity: {fading},
            backgroundColor: loginContext.color,
            width: 50,
            height: 50,
            borderRadius: 25,
          },
        ]}
      />

      
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
        style={{
          padding: 15,
          marginBottom: 10,
          borderWidth: 1,
          borderColor: "#DBDBDB",
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <PeopleImage uri={props.profMap[props.data.id]} />
        <View style={{ width: "80%" }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <View style={{ alignItems: "baseline" }}>
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  color: "#262626",
                  fontSize: 16,
                  marginRight: 10,
                }}
              >
                {props.data.firstname + " " + props.data.lastname}
              </Text>
            </View>
            <View
              style={{
                alignItems: "baseline",
                backgroundColor: findRoleColor(props.data.role),
                borderRadius: 100,
                paddingLeft: 12,
                paddingRight: 12,
                height: 20,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 10,
                  color: "#FFFFFF",
                }}
              >
                {props.data.role}
              </Text>
            </View>
          </View>
          {props.data.bio === "" ? null : (
            <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 10 }}>
              {'"' +
                (props.data.bio.length > 100
                  ? props.data.bio.substring(0, 100) + "..."
                  : props.data.bio) +
                '"'}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
export function PeoplePage() {
  // TODO pull to get users 'Spring 2022'
  // TODO pull all users and filer on pledge class
  const loginContext = useContext(LoginContext);
  const container = useRef(null);
  //search bar
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [section, setSection] = useState();
  //profile pictures
  const [profileMap, setProfileMap] = useState({});
  const fading = useRef(new Animated.Value(0)).current;
  //checkbox
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.spring(fading, { toValue: 1, useNativeDriver: true }),
        Animated.spring(fading, { toValue: 0, useNativeDriver: true }),
      ])
    );
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
                //console.log("(People) Success, got professional picture for " + data.id)
              })
              .catch((e) => {
                //console.log("(People) Error getting Professional Picture for " + data.id)
              });
            promises.push(promise);
          }
        });
        allSettled(promises).then((results) => {
          setProfileMap(profPicMap);
        });

        allUsers = allUsers.filter((item) => item.id != auth.currentUser.uid);
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
  }, [profileMap]);

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
        return item.pledgeClass == loginContext.currentUser.pledgeClass;
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
        <View
          style={{
            width: "85%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 16,
          }}
        >
          <SearchBar
            autoComplete={false}
            cancelButtonTitle={""}
            inputContainerStyle={{ backgroundColor: "#FFFFFF" }}
            containerStyle={{
              width: "85%",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#DBDBDB",
              height: 40,
            }}
            style={{
              fontFamily: "Poppins_600SemiBold",
              fontSize: 16,
              color: "#8E8E8E",
            }}
            platform="ios"
            placeholder="Type Here..."
            onChangeText={(text) => searchFilter(text)}
            value={search}
          />
          <Checkbox
            style={{
              alignSelf: "center",
              borderWidth: 1,
              width: 40,
              height: 40,
              borderRadius: 10,
              borderColor: "#DBDBDB",
              backgroundColor: "#FFFFFF",
            }}
            value={isChecked}
            onValueChange={setChecked}
          />
          <Text
            style={{
              position: "absolute",
              right: 0,
              top: -16,
              fontFamily: "Poppins_600SemiBold",
              fontSize: 12,
              color: "#8E8E8E",
            }}
          >
            My PC
          </Text>
        </View>
        <View
          style={{
            width: "90%",
            height: 1,
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: "#DBDBDB",
          }}
        />

        <Suspense
          fallback={
            <Text
              style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}
            >
              Loading profile...
            </Text>
          }
        >
          <ScrollView style={{ width: "100%" }} scrollEventThrottle={30}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View style={{ width: "85%" }}>{section}</View>
            </View>
          </ScrollView>
        </Suspense>
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
    backgroundColor: "#FAFAFA",
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
