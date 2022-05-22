import { PixelRatio, StyleSheet, Button, TouchableOpacity, Text, View } from "react-native";

export default StyleSheet.create({
    colors : {
        backgroundColor: '#D9D9D9',
    },

    container: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center',
    },


    //Sign Up/Login Page
    button_style: {
    
        width: 147,
        height: 53,
        //rounded edges
        borderRadius: 10,
        //space between boxes
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },




    //Login Page
    typein_box: {
        marginLeft: 6,
        //space between the other box
        marginBottom: 25,
        width: 189,
        height: 22,
        borderRadius: 6,
        //align them horizontally
        flexDirection: 'row',
        paddingLeft: 5,
        justifyContent: 'space-between',
    }
})

