import { StyleSheet, Button, TouchableOpacity, Text, Image, View, Alert } from "react-native";
import { SubmitPoints } from "./Home";
import globalStyles from "./../Styles";
import { NextButton } from "./newUser/NewUser";
import React, { useState, useEffect } from "react";
import { AccountTop } from "./Account";
import * as ImagePicker from "expo-image-picker";
import { store, auth } from "../Firebase";


function ImageUpload(props) {
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(require("../images/imageUpload.png"));
    useEffect(() => {
        async () => {
            const galleryStatus =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus === "granted");
            console.log("(Account Image Upload) Gallery Requested");
        };
    }, []);
    const uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        var ref = store.ref().child("profile-pictures/" + imageName);
        return ref.put(blob);
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        console.log(result);
        setImage(result);
        if (!result.cancelled) {
            uploadImage(result.uri, auth.currentUser.uid + "_" + props.type)
                .then(() => {
                    Alert.alert("Success!")
                })
                .catch(() => {
                    console.log("(AccountImageUpload) Error uploading image");
                })
        }
    };
    return (
        <TouchableOpacity
            style={[styles.imageUpload, { zIndex: -1 }]}
            onPress={() => {
                pickImage();
            }}
        >
            <Image
                source={image}
                style={styles.cloudImage}
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
}
function ImageUploadCard(props) {
    return (
        <View style={styles.imageUploadCard}>
            <Text style={globalStyles.mediumBoldText}>{props.title}</Text>
            <View style={[globalStyles.cardContainer, styles.uploadContainer]}>
                <ImageUpload type={props.type} />
            </View>
        </View>
    );
}
export function AccountImageUploadPage() {
    return (
        <View style={styles.screen}>
            <View style={{ marginTop: 50, width: "100%" }}>
                <AccountTop address="Account" name="Profile Pictures" />
            </View>
            <View style={{ width: "100%", alignItems: "center" }}>
                <ImageUploadCard
                    title="Professional"
                    type="professional"
                    imageSrc={require("../images/imageUpload1.png")}
                />
                <ImageUploadCard
                    title="Party/Fun"
                    type="social"
                    imageSrc={require("../images/imageUpload2.png")}
                />
                <ImageUploadCard
                    title="Childhood"
                    type="child"
                    imageSrc={require("../images/imageUpload3.png")}
                />
            </View>
            <View></View>
            <View></View>
        </View>
    );
}
const styles = StyleSheet.create({
    imageUpload: {
        width: 140,
        height: 160,
        justifyContent: "center",
        alignItems: "center",
    },
    cloudImage: {
        width: 80,
    },
    screen: {
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
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
        justifyContent: "center",
    },
    imageUploadCard: {
        alignItems: "center",
    },
    uploadImage: {
        width: 80,
        height: 80,
    },
    checkImage: {
        position: "absolute",
        top: -5,
        right: -15,
        width: 48,
        height: 48,
    },
});
