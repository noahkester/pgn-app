import { TouchableOpacity, StyleSheet, TextInput, Text, View, KeyboardAvoidingView } from "react-native";
import globalStyles from "../../styles/Styles"

export function ErrorMessage(props) {
    return (
        <View style={styles.errorMessage}>
            <Text style={[styles.errorMessageText, globalStyles.smallBoldText, globalStyles.errorRedText]}>{props.message}</Text>
        </View>
    )
}
export function NewUserErrorMessage(props) {
    return (
        <View style={styles.newUserErrorMessage}>
            <Text style={[globalStyles.smallBoldText, globalStyles.errorRedText]}>{props.message}</Text>
        </View>
    )
}
export function NewUserMessage(props) {
    return (
        <View style={styles.newUserErrorMessage}>
            <Text style={[globalStyles.smallBoldText, globalStyles.errorRedText]}>{props.message}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    errorMessage: {
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "end",
        width: "100%",
    },
    errorMessageText: {
        paddingLeft: "35%",
    },
    newUserErrorMessage: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        paddingTop: 10
    },
})