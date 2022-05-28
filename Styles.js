import reactDom from "react-dom";
import { StyleSheet } from "react-native";
import colors from "./Colors";

export default StyleSheet.create({
  whiteFill: {
    backgroundColor: colors.white
  },
  lightGrayFill: {
    backgroundColor: colors.lightGray
  },
  grayFill: {
    backgroundColor: colors.gray
  },
  darkGrayFill: {
    backgroundColor: colors.darkGray
  },
  universityColorFill: {
    backgroundColor: colors.universityColor
  },
  errorRedText: {
    color: colors.errorRed
  },
  grayBorder: {
    borderWidth: 1,
    borderColor: colors.gray,
  },
  button: {
    borderRadius: 30,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
    paddingBottom: 15,
  },
  largeSemiBoldText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20
  },
  tinySemiBoldText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10
  },
  smallSemiBoldText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16
  },
  mediumBoldText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16
  },
  largeBoldText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20
  },
  smallBoldText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 12
  },
  whiteText: {
    color: colors.white
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    shadowColor: '#BBBBBB',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    padding: 15,
    borderRadius: 10,
  },
  cardAlign: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  scroll: {
    marginTop: 30,
    width: "100%",
  },
  scrollView: {
    justifyContent: "center",
    alignItems: "center"
  },

  //AKIN
  professional: {
    backgroundColor: '#FFC107',
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
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

  scrollList: {
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
