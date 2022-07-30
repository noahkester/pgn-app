import {
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Image,
  View,
  TextInput
} from "react-native";
import { SubmitPoints } from "../Home";
import { NewUserTextInput } from "./NewUser";
import globalStyles from "../../styles/Styles";
import { setField } from "./About";
import ucolors from "../../styles/UniversityColors";
import DropDownPicker from "react-native-dropdown-picker";
import colors from "../../styles/Colors";
import { useState, useContext } from "react";
import { NextButton } from "./NewUser";
import { auth, db } from "../../utils/firebase";
import NewUserContext from "../../utils/NewUserContext";
import { useNavigation } from "@react-navigation/native";
import Octicons from 'react-native-vector-icons/Octicons';

function UniversityDropdown(props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      label: "University of Texas at Austin",
      value: "1",
      icon: () => (
        <Image
          source={require("../../images/dropdown/uTexas.png")}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      ),
      containerStyle: {
        backgroundColor: ucolors.uTexas,
      },
    },
    {
      label: "University of Illinois",
      value: "2",
      icon: () => (
        <Image
          source={require("../../images/dropdown/illinois.png")}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      ),
      containerStyle: {
        backgroundColor: ucolors.illinois,
      },
    },
    {
      label: "Illinois State University",
      value: "3",
      icon: () => (
        <Image
          source={require("../../images/dropdown/illinoisState.png")}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      ),
      containerStyle: {
        backgroundColor: ucolors.illinoisState,
      },
    },
    {
      label: "IUP Crimson Hawks",
      value: "4",
      icon: () => (
        <Image
          source={require("../../images/dropdown/iupHawks.png")}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      ),
      containerStyle: {
        backgroundColor: ucolors.iupHawks,
      },
    },
    {
      label: "Washington University",
      value: "5",
      icon: () => (
        <Image
          source={require("../../images/dropdown/washU.png")}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      ),
      containerStyle: {
        backgroundColor: ucolors.washU,
      },
    },
    {
      label: "Pennsylvania State University",
      value: "6",
      icon: () => (
        <Image
          source={require("../../images/dropdown/pennState.png")}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      ),
      containerStyle: {
        backgroundColor: ucolors.pennState,
      },
    },
    {
      label: "Babson College",
      value: "7",
      icon: () => (
        <Image
          source={require("../../images/dropdown/babson.png")}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      ),
      containerStyle: {
        backgroundColor: ucolors.babson,
      },
    },
    {
      label: "Cornell University",
      value: "8",
      icon: () => (
        <Image
          source={require("../../images/dropdown/cornell.png")}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      ),
      containerStyle: {
        backgroundColor: ucolors.cornell,
      },
    },
    {
      label: "Indiana University",
      value: "9",
      icon: () => (
        <Image
          source={require("../../images/dropdown/indiana.png")}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      ),
      containerStyle: {
        backgroundColor: ucolors.indiana,
      },
    },
    {
      label: "Michigan State University",
      value: "10",
      icon: () => (
        <Image
          source={require("../../images/dropdown/michiganState.png")}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      ),
      containerStyle: {
        backgroundColor: ucolors.michiganState,
      },
    },
    {
      label: "University of Michigan",
      value: "11",
      icon: () => (
        <Image
          source={require("../../images/dropdown/uMichigan.png")}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      ),
      containerStyle: {
        backgroundColor: ucolors.uMichigan,
      },
    },
    {
      label: "University of Wisconsin",
      value: "12",
      icon: () => (
        <Image
          source={require("../../images/dropdown/wisconsin.png")}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      ),
      containerStyle: {
        backgroundColor: ucolors.wisconsin,
      },
    },
    {
      label: "University of Iowa",
      value: "13",
      icon: () => (
        <Image
          source={require("../../images/dropdown/iowa.png")}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      ),
      containerStyle: {
        backgroundColor: ucolors.iowa,
      },
    },
    {
      label: "James Madison University",
      value: "14",
      icon: () => (
        <Image
          source={require("../../images/dropdown/jmu.png")}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      ),
      containerStyle: {
        backgroundColor: ucolors.jmu,
      },
    },
    {
      label: "University of Pittsburgh",
      value: "15",
      icon: () => (
        <Image
          source={require("../../images/dropdown/pitt.png")}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      ),
      containerStyle: {
        backgroundColor: ucolors.pitt,
      },
    },
    {
      label: "Ohio State University",
      value: "16",
      icon: () => (
        <Image
          source={require("../../images/dropdown/ohio.png")}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      ),
      containerStyle: {
        backgroundColor: ucolors.ohio,
      },
    },
    {
      label: "University of Pennsylvania",
      value: "17",
      icon: () => (
        <Image
          source={require("../../images/dropdown/uPenn.png")}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      ),
      containerStyle: {
        backgroundColor: ucolors.uPenn,
      },
    },
    {
      label: "Miami University",
      value: "18",
      icon: () => (
        <Image
          source={require("../../images/dropdown/miami.png")}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      ),
      containerStyle: {
        backgroundColor: ucolors.miami,
      },
    },
  ]);
  const [displayedColor, setDisplayedColor] = useState(colors.darkGray);
  return (
    <DropDownPicker
      placeholder="Select your Chapter"
      placeholderStyle={[globalStyles.whiteText, globalStyles.mediumBoldText]}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={() => {
        switch (value) {
          case "1":
            setDisplayedColor(ucolors.uTexas);
            props.setChapter("University of Texas");
            break;
          case "2":
            setDisplayedColor(ucolors.illinois);
            props.setChapter("University of Illinois");
            break;
          case "3":
            setDisplayedColor(ucolors.illinoisState);
            props.setChapter("Illinois State University");
            break;
          case "4":
            setDisplayedColor(ucolors.iupHawks);
            props.setChapter("IUP Crimson Hawks");
            break;
          case "5":
            setDisplayedColor(ucolors.washU);
            props.setChapter("Washington University");
            break;
          case "6":
            setDisplayedColor(ucolors.pennState);
            props.setChapter("Pennsylvania State University");
            break;
          case "7":
            setDisplayedColor(ucolors.babson);
            props.setChapter("Babson College");
            break;
          case "8":
            setDisplayedColor(ucolors.cornell);
            props.setChapter("Cornell University");
            break;
          case "9":
            setDisplayedColor(ucolors.indiana);
            props.setChapter("Indiana University");
            break;
          case "10":
            setDisplayedColor(ucolors.michiganState);
            props.setChapter("Michigan State University");
            break;
          case "11":
            setDisplayedColor(ucolors.uMichigan);
            props.setChapter("University of Michigan");
            break;
          case "12":
            setDisplayedColor(ucolors.wisconsin);
            props.setChapter("University of Wisconsin");
            break;
          case "13":
            setDisplayedColor(ucolors.iowa);
            props.setChapter("University of Iowa");
            break;
          case "14":
            setDisplayedColor(ucolors.jmu);
            props.setChapter("James Madison University");
            break;
          case "15":
            setDisplayedColor(ucolors.pitt);
            props.setChapter("University of Pittsburgh");
            break;
          case "16":
            setDisplayedColor(ucolors.ohio);
            props.setChapter("Ohio State University");
            break;
          case "17":
            setDisplayedColor(ucolors.uPenn);
            props.setChapter("University of Pennsylvania");
            break;
          case "18":
            setDisplayedColor(ucolors.miami);
            props.setChapter("Miami University");
            break;
        }
      }}
      listMode="SCROLLVIEW"
      dropDownContainerStyle={{
        backgroundColor: colors.lightGray,
        borderWidth: 0,
        width: "90%",
        marginLeft: "5%",
        height: 200,
      }}
      textStyle={[globalStyles.whiteText, globalStyles.mediumBoldText]}
      style={{
        marginLeft: "5%",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        borderWidth: 0,
        backgroundColor: displayedColor,
      }}
    ></DropDownPicker>
  );
}

export function NamePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [chapter, setChapter] = useState("");
  const newUserContext = useContext(NewUserContext);
  const navigation = useNavigation();

  const checkAdminMembers = () => {
    const name = (firstName + lastName).toLowerCase();
    db.collection("admin-members")
      .doc(name)
      .get()
      .then((doc) => {
        const data = doc.data();
        newUserContext.status = data.status;
        newUserContext.pledgeClass = data.pledgeClass;
        newUserContext.role = data.role;
        newUserContext.firstname = firstName;
        newUserContext.lastname = lastName;
        newUserContext.id = auth.currentUser.uid;
        newUserContext.email = auth.currentUser.email;

        console.log("(NewUser) Found user and updated pledgeClass and status");
        navigation.navigate('Education');
      })
      .catch((error) => {
        console.log("(New User) Could not find user in system: FATAL ERROR");
        navigation.navigate('UnknownUser');
      });
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
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#262626', marginBottom: 20 }}>Name</Text>
          <View style={{ borderWidth: 1, borderRadius: 25, borderColor: '#DBDBDB', width: '90%', height: 50, paddingLeft: 20, justifyContent: 'center' }}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626' }}
              placeholder={'First Name'}
              onChangeText={(text) => setFirstName(text)}
            >
              {firstName}
            </TextInput>
          </View>
          <View style={{ width: '80%', height: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#DBDBDB' }} />
          <View style={{ borderWidth: 1, borderRadius: 25, borderColor: '#DBDBDB', width: '90%', height: 50, paddingLeft: 20, justifyContent: 'center' }}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626' }}
              placeholder={'Last Name'}
              onChangeText={(text) => setLastName(text)}
            >
              {lastName}
            </TextInput>
          </View>
        </View>
        <View style={{ width: '100%', alignItems: 'center', position: 'absolute', bottom: 60 }}>
          <TouchableOpacity
            style={{ width: '90%', height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 30, borderWidth: 1, borderColor: '#DBDBDB', backgroundColor: '#FAFAFA' }}
            onPress={checkAdminMembers}
          >
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#262626' }}>{'Next'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",

    backgroundColor: "white",
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
});
