import { StyleSheet, TouchableOpacity, Image, Text, View, } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import React, { Component } from "react";
import globalStyles from "../Styles";
import colors from "../Colors";
/*
TODO: Figure out how to pass in style 'classes' through components
Add functionality to the dropdown (only stylistic right now)
*/
export function LoginButton(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={async () => {
        if (props.customOnPress) {
          var success = await props.customOnPress()
          console.log("done: ", success);
          if (success) {
            navigation.navigate(props.address)
          }
        }
        else {
          navigation.navigate(props.address)
        }
      }}
      style={[globalStyles.lightGrayFill, globalStyles.button, globalStyles.grayBorder]}
    >
      <Text style={globalStyles.mediumBoldText}>{props.title}</Text>
    </TouchableOpacity>
  );
}
function UniversityDropdown(props) {
  return (
    <View style={styles.universityDropdown}>
      <Image
        source={require("../images/utlogo.png")}
        style={styles.universityLogo}
        resizeMode="contain"
      />
      <Text style={[globalStyles.mediumBoldText, globalStyles.whiteText]}>University of Texas at Austin</Text>
    </View>
  )
  /*
      <Image
        source={require("../images/ddarrow.png")}
        style={styles.dropArrow}
        resizeMode="contain"
      />
  */
}
function LoginButtons() {
  return (
    <View style={styles.loginSignupButtons}>
      <LoginButton title="Create Account" address="CreateAccount" />
      <View style={styles.space}></View>
      <LoginButton title="Log in" address="Login" />
      <LoginButton title="Guest Account" address="Navigation" />
    </View>
  );
}

export function LoginSignupPage() {
  return (
    //to centralize buttons
    <View style={styles.loginSignup}>
      <View style={styles.loginSignupScreen}>
        <View style={styles.topSubElement}>
          <Image
            source={require("../images/pgn.png")}
            style={styles.loginImage}
            resizeMode="contain"
          />
          <UniversityDropdown />
        </View>
        <LoginButtons />
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  topSubElement: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: "75%"
  },
  loginSignup: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "white"
  },
  loginSignupScreen: {
    flexDirection: "column",
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "space-between",
    height: "90%"
  },
  universityDropdown: {
    width: "90%",
    height: 60,
    backgroundColor: colors.universityColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
  },
  loginImage: {
    width: 300,
    height: 300,
  },
  universityLogo: {
    width: 75
  },
  dropArrow: {
    width: 24
  },
  loginSignupButtons: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "25%",
  },
  space: {
    height: 10
  }
});