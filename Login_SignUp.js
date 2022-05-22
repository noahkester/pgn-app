import {
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  Text,
  View,
} from "react-native";
import React, { Component } from "react";
import styles from "./Styles";
// function SignButton(props) {
//   return (

//   );
// }

//made it a constant so I can use it in both login page and and the first page
//I gave onPress a default value so we can just add the different page for each one
// when we need it
export function LoginButton({title, onPress = null, ... props}){
  return(
  <TouchableOpacity
  {... props}
  title = {title}
  onPress = {onPress}
  style={[styles.button_style, styles.colors]}
  //onPress = //routing
  >
  <Text>{title}</Text>
</TouchableOpacity>
  );
}

export function FirstPage() {
  return (
    //to centralize buttons
    <View style={styles.container}>
      <Image
        source={require("./images/Login/image1.png")}
        resizeMode="contain"
      />
      <LoginButton title="Login"></LoginButton>
      <LoginButton title="Sign Up"></LoginButton>
    </View>
  );
}
