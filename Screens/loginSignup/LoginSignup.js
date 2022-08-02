import React from "react";
import { TouchableOpacity, Image, Text, View, } from "react-native";
import { useNavigation } from '@react-navigation/native';

function LoginButtons() {
  const navigation = useNavigation();
  return (
    <View style={{ position: 'absolute', bottom: 60, width: '100%', flexDirection: 'column', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={async () => {
          navigation.navigate('CreateAccount')
        }}
        style={{ width: '90%', height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#DBDBDB', backgroundColor: '#FAFAFA' }}
      >
        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626' }}>{'Create account'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          navigation.navigate('Login')
        }}
        style={{ marginTop: 10, width: '90%', height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#DBDBDB', backgroundColor: '#FAFAFA' }}
      >
        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626' }}>{'Log in'}</Text>
      </TouchableOpacity>
    </View>
  );
}

export function LoginSignupPage() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={require('../../images/pgn.png')}
        style={{ width: 300, height: 300, marginBottom: 120 }}
        resizeMode='contain'
      />
      <LoginButtons />
    </View>
  );
}