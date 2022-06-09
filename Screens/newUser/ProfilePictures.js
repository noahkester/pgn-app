import { StyleSheet, Button, TouchableOpacity, Text, Image, View, } from "react-native";
import { SubmitPoints } from "../Home";
import globalStyles from "../../Styles"

function ImageUploadCard(props) {
    return (
        <View style={styles.imageUploadCard}>
            <Text style={globalStyles.mediumBoldText}>{props.title}</Text>
            <View style={[globalStyles.cardContainer, styles.uploadContainer]}>
                <Image
                    source={props.imageSrc}
                    style={styles.uploadImage}
                    resizeMode="contain"
                />
                <Image
                    source={require("../../images/accept.png")}
                    style={styles.checkImage}
                    resizeMode="contain"
                />
            </View>
        </View>
    )
}




export function ProfilePicturesPage() {
    return (
        <View style={styles.screen}>
            <Text style={[globalStyles.largeSemiBoldText, styles.title]}>Profile Pictures</Text>
            <ImageUploadCard title="Professional Pic" imageSrc={require("../../images/imageUpload1.png")} />
            <ImageUploadCard title="Party/Fun Pic" imageSrc={require("../../images/imageUpload2.png")} />
            <ImageUploadCard title="Childhood Pic" imageSrc={require("../../images/imageUpload3.png")} />
            <View style={{ height: 10 }}></View>
            <SubmitPoints address="About" title="Next" />
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    title: {
        marginBottom: 10,
    },
    uploadContainer: {
        marginBottom: 10,
        width: 150,
        height: 120,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    imageUploadCard: {
        alignItems: "center",
    },
    uploadImage: {
        width: 80,
        height: 80
    },
    checkImage: {
        position: "absolute",
        top: -5,
        right: -15,
        width: 48,
        height: 48
    }
});