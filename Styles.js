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
  burntOrange:{
    backgroundColor: '#C57035',
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
    left: "30%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: 'center',
  },

  profileCircle: {
 
    borderRadius: "26%",
    overflow: "hidden",
    //give free space
    marginBottom: "15%",
  },

  box: {
    flexDirection: "row",
    justifyContent: 'center',
    paddingVertical: '5%',
    marginHorizontal: '7%',
    borderRadius: '10%',
    marginBottom: '5%',
    shadowColor: '#C57035',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center'
 
  },

  pointBox: {
    flexDirection: 'row',
     flex: 1,
     justifyContent: 'space-between',
     marginHorizontal: '4%',  
  },

  submitBox: {
    padding: '2%',
    borderRadius: '10%',
    marginHorizontal: '10%',
    // width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#0D6EFD',
    top: '30%',
  },
  
  scrollList:{
    marginHorizontal: '6%',
   
  },

  scrollBox: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    paddingVertical: '5%',

    marginHorizontal: '1%',
    borderRadius: '10%',
    marginVertical: '3%',

    shadowColor: '#C57035',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center'
  }
  
});
