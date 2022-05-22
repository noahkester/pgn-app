import { StyleSheet, Button, TouchableOpacity, Image, TextInput, Text, View } from "react-native";
import React from "react";
import styles from "./Styles"
import {LoginButton} from "./Login_SignUp"
function LoginPage(){
    return(
    <View style={styles.container}>
      <Image
        source={require("./images/Login/image1.png")}
        resizeMode="contain"
      />
      
        <View style = {{flexDirection: 'row'}}>

            <Text> Username: </Text>
            <TextInput
            autoCapitalize= 'none'
            autoCorrect = {false}
            style = {[styles.typein_box, styles.colors]}
            placeholder = "Enter Username"
            />
        </View>
            {/*each row  */}
        <View style = {{flexDirection: 'row'}}>
            <Text> Password: </Text>
            <TextInput
                style = {[styles.typein_box, styles.colors]}
                autoCapitalize= 'none'
                autoCorrect = {false}
                placeholder = "Enter Password"
                secureTextEntry = {true}
                />
        </View>

        <LoginButton title="Login"/>
    </View>
    );
}
export default LoginPage;