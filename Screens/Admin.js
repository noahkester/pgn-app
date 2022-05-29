import { StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Text, View } from "react-native";
import { AccountTop } from "./Account";
import globalStyles from "../Styles"
function DoneImage() {
    return (
        <Image
            source={require("../images/adminparty.png")}
            style={styles.adminParty}
            resizeMode="contain"
        />
    )
}
export function AdminPage(props) {
    return (
        <View>
            <AccountTop address="LoginSignup" />
            <View style={styles.adminScreen}>
                <View>
                    <Text style={globalStyles.largeSemiBoldText}>Remaining Points: 0</Text>
                </View>
                <DoneImage />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    adminScreen: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    adminParty: {
        width: "70%",
        height: "70%"
    }
})