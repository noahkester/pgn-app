import {
  PixelRatio,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

export default StyleSheet.create({
  colors: {
    backgroundColor: "#D9D9D9",
  },
  professional: {
    backgroundColor: '#FFC107',
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",

  },

  //Sign Up/Login Page
  button_style: {
    width: 147,
    height: 53,
    //rounded edges
    borderRadius: 10,
    //space between boxes
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  //Login Page
  typein_box: {
    alignSelf: 'center',
    marginLeft: 6,
    //space between the other box
    marginBottom: 25,
    width: "44%",
    height: "75%",
    borderRadius: 6,
    //align them horizontally
    paddingLeft: 5,

  },

  //navigation bar with the logos
  navigation_bar: {
    borderColor: "red",
    flexDirection: "row",
    alignItems: "flex-end",
    height: "7.99%",
  },

  homeLogo: {
    left: "40%",
    width: "70%",
    height: "130%",
  },

  profilePosition: {
    left: "60%",
    flexDirection: "column",
    ustifyContent: "flex-start",
  },

  profileCircle: {
    borderRadius: "26%",
    overflow: "hidden",
    //give free space
    marginBottom: "15%",
  },

  box: {
    flexDirection: "row-reverse",
    
    alignItems: "center",
    right: '17%',
    top: '20%',
    justifyContent: "flex-start",
    marginBottom: '5%',
  },

  pointBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  submitBox: {
    marginHorizontal: '20%',
    padding: '2%',
    borderRadius: '50%',
    // width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#0D6EFD',
    top: '30%',
  }
  
});
