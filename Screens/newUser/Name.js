import { StyleSheet, Button, TouchableOpacity, Text, Image, View, } from "react-native";
import { SubmitPoints } from "../Home";
import { NewUserTextInput } from "../Login";
import globalStyles from "../../Styles"
import { setField } from "./About";
import ucolors from "../../UniversityColors";
import DropDownPicker from "react-native-dropdown-picker";
import colors from "../../Colors";
import { useState } from "react";

function UniversityDropdown(props) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {
            label: 'University of Texas at Austin',
            value: '1',
            icon: () =>
                <Image
                    source={require('../../images/dropdown/uTexas.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.uTexas
            },
        },
        {
            label: 'University of Illinois',
            value: '2',
            icon: () =>
                <Image
                    source={require('../../images/dropdown/illinois.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.illinois
            },
        },
        {
            label: 'Illinois State University',
            value: '3',
            icon: () =>
                <Image
                    source={require('../../images/dropdown/illinoisState.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.illinoisState
            },
        },
        {
            label: 'IUP Crimson Hawks',
            value: '4',
            icon: () =>
                <Image
                    source={require('../../images/dropdown/iupHawks.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.iupHawks
            },
        },
        {
            label: 'Washington University',
            value: '5',
            icon: () =>
                <Image
                    source={require('../../images/dropdown/washU.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.washU
            },
        },
        {
            label: 'Pennsylvania State University',
            value: '6',
            icon: () =>
                <Image
                    source={require('../../images/dropdown/pennState.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.pennState
            },
        },
        {
            label: 'Babson College',
            value: '7',
            icon: () =>
                <Image
                    source={require('../../images/dropdown/babson.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.babson
            },
        },
        {
            label: 'Cornell University',
            value: '8',
            icon: () =>
                <Image
                    source={require('../../images/dropdown/cornell.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.cornell
            },
        },
        {
            label: 'Indiana University',
            value: '9',
            icon: () =>
                <Image
                    source={require('../../images/dropdown/indiana.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.indiana
            },
        },
        {
            label: 'Michigan State University',
            value: '10',
            icon: () =>
                <Image
                    source={require('../../images/dropdown/michiganState.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.michiganState
            },
        },
        {
            label: 'University of Michigan',
            value: '11',
            icon: () =>
                <Image
                    source={require('../../images/dropdown/uMichigan.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.uMichigan
            },
        },
        {
            label: 'University of Wisconsin',
            value: '12',
            icon: () =>
                <Image
                    source={require('../../images/dropdown/wisconsin.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.wisconsin
            },
        },
        {
            label: 'University of Iowa',
            value: '13',
            icon: () =>
                <Image
                    source={require('../../images/dropdown/iowa.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.iowa
            },
        },
        {
            label: 'James Madison University',
            value: '14',
            icon: () =>
                <Image
                    source={require('../../images/dropdown/jmu.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.jmu
            },
        },
        {
            label: 'University of Pittsburgh',
            value: '15',
            icon: () =>
                <Image
                    source={require('../../images/dropdown/pitt.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.pitt
            },
        },
        {
            label: 'Ohio State University',
            value: '16',
            icon: () =>
                <Image
                    source={require('../../images/dropdown/ohio.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.ohio
            },
        },
        {
            label: 'University of Pennsylvania',
            value: '17',
            icon: () =>
                <Image
                    source={require('../../images/dropdown/uPenn.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.uPenn
            },
        },
        {
            label: 'Miami University',
            value: '18',
            icon: () =>
                <Image
                    source={require('../../images/dropdown/miami.png')}
                    style={styles.iconStyle}
                    resizeMode="contain"
                />,
            containerStyle: {
                backgroundColor: ucolors.miami
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
                    case "1": setDisplayedColor(ucolors.uTexas); break;
                    case "2": setDisplayedColor(ucolors.illinois); break;
                    case "3": setDisplayedColor(ucolors.illinoisState); break;
                    case "4": setDisplayedColor(ucolors.iupHawks); break;
                    case "5": setDisplayedColor(ucolors.washU); break;
                    case "6": setDisplayedColor(ucolors.pennState); break;
                    case "7": setDisplayedColor(ucolors.babson); break;
                    case "8": setDisplayedColor(ucolors.cornell); break;
                    case "9": setDisplayedColor(ucolors.indiana); break;
                    case "10": setDisplayedColor(ucolors.michiganState); break;
                    case "11": setDisplayedColor(ucolors.uMichigan); break;
                    case "12": setDisplayedColor(ucolors.wisconsin); break;
                    case "13": setDisplayedColor(ucolors.iowa); break;
                    case "14": setDisplayedColor(ucolors.jmu); break;
                    case "15": setDisplayedColor(ucolors.pitt); break;
                    case "16": setDisplayedColor(ucolors.ohio); break;
                    case "17": setDisplayedColor(ucolors.uPenn); break;
                    case "18": setDisplayedColor(ucolors.miami); break;
                }
            }}
            listMode='SCROLLVIEW'
            dropDownContainerStyle={{
                backgroundColor: colors.lightGray,
                borderWidth: 0,
                width: '90%',
                marginLeft: '5%',
                height: 120,
            }}
            textStyle={[globalStyles.whiteText, globalStyles.mediumBoldText]}
            style={{
                marginLeft: '5%',
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                width: '90%',
                borderWidth: 0,
                backgroundColor: displayedColor,
            }}
        >
        </DropDownPicker>
    );
}
export function NamePage() {
    function setFirstName(text1) {

        setField({ key: 'firstname', value: text1 })
        console.log("first name is set")
    }

    return (
        <View style={styles.screen}>
            <Text style={globalStyles.largeSemiBoldText}>Name</Text>
            <UniversityDropdown />
            <NewUserTextInput
                placeholder="First name" onCustomChange={text => setFirstName(text)}
            />
            <NewUserTextInput
                placeholder="Last name" onCustomChange={text => setField({ key: 'lastname', value: text })}
            />
            <View style={{ height: 10 }}></View>
            <SubmitPoints address="Education" title="Next" />
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    iconStyle: {
        width: 30,
        height: 30
    }
});