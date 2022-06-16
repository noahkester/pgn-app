import { StyleSheet, Button, TouchableOpacity, Text, Image, View, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import globalStyles from "../../Styles";
import { getCurrentUser, db } from "../../Firebase";
var newUser = {
    id: "",
    firstname: "",
    lastname: "",
    chapter: "",
    pledgeClass: "",

    major: "",
    minor: "",

    profilePicture: "",
    status: "",

    activities: [],
    bio: "",

    email: "",
    linkedin: "",
    phone: "",

    philanthropyPoints: 0,
    professionalPoints: 0,
    socialPoints: 0,
};
function updateNameAndPC(firstname, lastname, chapter, id) {
    newUser.firstname = firstname;
    newUser.lastname = lastname;
    newUser.chapter = chapter;
    newUser.id = id
}
function updateEducation(major, minor) {
    newUser.major = major;
    newUser.minor = minor;
}
function updateAbout(activites, bio) {
    newUser.activities = activites.split(",");
    newUser.bio = bio;
}
function updateContact(linkedin, phone) {
    newUser.linkedin = linkedin;
    newUser.phone = phone;
}
export function uploadToFirebase() {
    console.log(newUser);
    db.collection("users").doc(newUser.id).set(newUser)
        .then(() => {
            console.log("(NewUser) User Information successfully written!");
        })
        .catch((error) => {
            console.error("(NewUser) Error writing document: ", error);
        });
}
export function NewUserTextInput(props) {
    return (
        <View style={styles.inputContainer}>
            <View style={[styles.newUsertextInputContainer, globalStyles.grayBorder]}>
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={globalStyles.mediumBoldText}
                    placeholder={props.placeholder}
                    //need to pass in what field to edit for each component
                    onChangeText={text => props.onCustomChange(text)}
                >
                    {props.value}
                </TextInput>
            </View>
        </View>
    )
}
// Text Input field for additional user information in new user flow
export function AboutTextInput(props) {
    return (
        <View style={styles.inputContainer}>
            <View style={[styles.largeNewUsertextInputContainer, globalStyles.grayBorder]}>
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={globalStyles.mediumBoldText}
                    placeholder={props.placeholder}
                    onChangeText={text => props.onCustomChange(text)}
                >
                    {props.value}
                </TextInput>
            </View>
        </View>
    )
}
export function NextButton(props) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            title={props.title}
            style={[
                globalStyles.lightGrayFill,
                globalStyles.button,
                globalStyles.grayBorder,
                styles.nextButton
            ]}
            onPress={() => {
                if (props.values == null) {
                    console.log("(NewUser) WARNING: No values passed in");
                    navigation.navigate(props.address);
                    return;
                }
                //  instead of returning, set a callback error message
                switch (props.inputPage) {
                    case "name":
                        if (!props.values[0] || !props.values[1] || !props.values[2] || !props.values[3]) return;
                        updateNameAndPC(props.values[0], props.values[1], props.values[2], props.values[3]);
                        break;
                    case "education":
                        if (!props.values[0]) return;
                        updateEducation(props.values[0], props.values[1]);
                        break;
                    case "about":
                        updateAbout(props.values[0], props.values[1]);
                        break;
                    case "contact":
                        updateContact(props.values[0], props.values[1]);
                        uploadToFirebase();
                        break;
                }
                console.log(newUser);
                navigation.navigate(props.address);
            }}
        >
            <Text style={[globalStyles.mediumBoldText]}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    newUsertextInputContainer: {
        borderWidth: 10,
        padding: 10,
        borderRadius: 30,
        marginTop: 10,
        width: "100%"
    },
    largeNewUsertextInputContainer: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        marginTop: 10,
        width: "100%",
        height: 100
    },
    inputContainer: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    textInputContainer: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 30,
        marginTop: 10,
        width: "70%"
    },
    nextButton: {
        marginBottom: 50
    }
})