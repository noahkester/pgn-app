import { SafeAreaView, View, Image, ActivityIndicator, Text } from "react-native";
import { useCallback } from "react";
import LoginContext from "../utils/LoginContext";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";


export function SplashScreenPage() {
  const navigation = useNavigation();
    const loginContext = useContext(LoginContext);
    const appIsReady = loginContext.appIsReady;


    if(appIsReady){
      navigation.navigate("Navigation");
    }
  return (
    <SafeAreaView
    style = {{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
        <Image
        style = {{ width: 300, height: 300, flexDirection: 'row', alignSelf: 'center' }}
        resizeMode = 'cover'
        source= {require("../assets/icon.png")}></Image>

        {/* <Text style = {{fontFamily: 'Poppins_600SemiBold', alignSelf: 'center', color: 'black', fontSize: 50, paddingRight: '5%'}} 
        >NEXUS</Text> */}
      <View
      style = {{flexDirection: 'row' ,justifyContent: 'center', alignItems: 'center', marginTop: '10%'}}>


        <ActivityIndicator color = "#777777"/>
        </View>

        <View style = {{top: '20%',lexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center'}}>
          <Text >V 1.0.0</Text>
        </View>
    </SafeAreaView>
    );
}
