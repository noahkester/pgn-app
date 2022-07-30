import { TouchableOpacity, Text, View, TextInput } from "react-native";
import { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import NewUserContext from "../../utils/NewUserContext";
import Octicons from 'react-native-vector-icons/Octicons';

export function EducationPage() {
    const [major, setMajor] = useState("");
    const [minor, setMinor] = useState("");
    const newUserContext = useContext(NewUserContext);
    const navigation = useNavigation();
    const updateEducation = () => {
        newUserContext.major = major;
        newUserContext.minor = minor;
        navigation.navigate("About");
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <View style={{ marginTop: 32, height: 100, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{ marginLeft: 16 }}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Octicons
                        name="chevron-left"
                        color={'#262626'}
                        size={42}
                    />
                </TouchableOpacity>
            </View>
            <View
                style={{ flex: 1, alignItems: "center", marginTop: 180 }}
            >
                <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#262626', marginBottom: 20 }}>Education</Text>
                    <View style={{ borderWidth: 1, borderRadius: 25, borderColor: '#DBDBDB', width: '90%', height: 50, paddingLeft: 20, justifyContent: 'center' }}>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626' }}
                            placeholder={'Major'}
                            onChangeText={(text) => setMajor(text)}
                        >
                            {major}
                        </TextInput>
                    </View>
                    <View style={{ width: '80%', height: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#DBDBDB' }} />
                    <View style={{ borderWidth: 1, borderRadius: 25, borderColor: '#DBDBDB', width: '90%', height: 50, paddingLeft: 20, justifyContent: 'center' }}>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626' }}
                            placeholder={'Minor'}
                            onChangeText={(text) => setMinor(text)}
                        >
                            {minor}
                        </TextInput>
                    </View>
                    <Text style={{ marginTop: 6, fontFamily: 'Poppins_600SemiBold', fontSize: 12, color: '#8E8E8E' }}>For multiple, separate with commas</Text>
                </View>
                <View style={{ width: '100%', alignItems: 'center', position: 'absolute', bottom: 60 }}>
                    <TouchableOpacity
                        style={{ width: '90%', height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 30, borderWidth: 1, borderColor: '#DBDBDB', backgroundColor: '#FAFAFA' }}
                        onPress={updateEducation}
                    >
                        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626' }}>{'Next'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}