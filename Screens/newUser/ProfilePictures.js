import {
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Image,
  View,
} from "react-native";
import { SubmitPoints } from "../Home";
import globalStyles from "../../Styles";
import { NextButton } from "./NewUser";
import React, { useState,useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
function ImageUpload1() {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(require("../../images/cloud.png"));
  useEffect(() => {
    async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus === "granted");
      console.log("Requested");
    };
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    console.log(result);
    setImage(result);
    if (!result.cancelled) {
      //do something
    }
  };
  return (
    <TouchableOpacity
      style={[styles.imageUpload, { zIndex: -1 }]}
      onPress={() => {
        pickImage();
      }}
    >
      <Image source={image} style={styles.cloudImage} resizeMode="contain" />
    </TouchableOpacity>
  );
}
function ImageUploadCard(props) {
  return (
    <View style={styles.imageUploadCard}>
      <Text style={globalStyles.mediumBoldText}>{props.title}</Text>
      <View style={[globalStyles.cardContainer, styles.uploadContainer]}>
        {/* <Image
                    source={props.imageSrc}
                    style={styles.uploadImage}
                    resizeMode="contain"
                /> */}
        <ImageUpload1 />
        <Image
          source={require("../../images/accept.png")}
          style={styles.checkImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

export function ProfilePicturesPage() {
  return (
    <View style={styles.screen}>
      <View></View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text style={[globalStyles.largeSemiBoldText, styles.title]}>
          Profile Pictures
        </Text>
        <ImageUploadCard
          title="Professional Pic"
          imageSrc={require("../../images/imageUpload1.png")}
        />
        <ImageUploadCard
          title="Party/Fun Pic"
          imageSrc={require("../../images/imageUpload2.png")}
        />
        <ImageUploadCard
          title="Childhood Pic"
          imageSrc={require("../../images/imageUpload3.png")}
        />
      </View>
      <NextButton address="About" title="Next" />
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
        width: 140,
        height: 120,
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
