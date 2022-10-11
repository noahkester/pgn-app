import { SafeAreaView, View, Image, ActivityIndicator, Text, Animated } from "react-native";
import { useCallback, useEffect } from "react";
import LoginContext from "../utils/LoginContext";
import { useContext, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

export function SplashScreenPage() {
  const navigation = useNavigation();
  const loginContext = useContext(LoginContext);
  const appIsReady = loginContext.appIsReady;

  const fading = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    

  }, []);

  if (appIsReady) {
    navigation.navigate("Navigation");
  }
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
      <Image
        style={{ width: 300, height: 300, flexDirection: 'row', alignSelf: 'center' }}
        // resizeMode='cover'
        source={require("../assets/icon.png")}></Image>

      <View
        style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>


        <ActivityIndicator color="#777777" />
      </View>

      <View style={{ top: '20%', lexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center' }}>
        <Text >V 1.0.1</Text>
      </View>
    </SafeAreaView>
  );
}
