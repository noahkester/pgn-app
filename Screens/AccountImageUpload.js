import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { AccountTop } from "./Account";
import * as ImagePicker from "expo-image-picker";
import { store, auth } from "../utils/firebase";
import Octicons from "react-native-vector-icons/Octicons";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import UrlContext from "../utils/UrlContext";

import * as ImageManipulator from "expo-image-manipulator";

function ImageUpload(props) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState("");
  const urlContext = useContext(UrlContext);
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
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      const resizedResult = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: 200 } }], // resize to width of 300 and preserve aspect ratio
        { format: "jpeg" }
      );

      setImage(resizedResult);

      uploadImage(resizedResult.uri, auth.currentUser.uid + "_" + props.type)
        .then(() => {
          if (props.type == "professional") {
            urlContext.setProf(resizedResult.uri);
          } else if (props.type == "social") {
            urlContext.setSocial(resizedResult.uri);
          } else if (props.type == "funny") {
            urlContext.setFunny(resizedResult.uri);
          }
        })
        .catch(() => {
          console.log("(AccountImageUpload) Error uploading image");
        });
      props.setImageLoaded(true);
    }
  };
  return (
    <View style={{ flex: 1, }}>
      <TouchableOpacity
        style={{
          zIndex: -1,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "#DBDBDB",
          borderRadius: 10,
          height: 150,
          width: 150,
          backgroundColor: "#FFFFFF",
        }}
        onPress={() => {
          props.setImageLoaded(false);
          pickImage();
        }}
      >
        {image === "" ? (
          <MaterialIcons name="add" color={"#262626"} size={60} />
        ) : (
          <Image source={image} style={{ width: 60 }} resizeMode="contain" />
        )}

      </TouchableOpacity>
      {image != "" ? (
        <View>
          <Text
            style={{
              width: 150,
              paddingTop: 4,
              // paddingLeft: 10,
              fontFamily: "Poppins_500Medium",
              color: "#85C67E",
            }}
          >
            Image Loaded successfully
          </Text>
        </View>
      ) : null}

    </View>
  );
}
function ImageUploadCard(props) {
  return (
    <View
      style={{ marginTop: 20, width: "90%", height: 160, alignItems: "center" }}
    >
      <Text
        style={{
          fontFamily: "Poppins_600SemiBold",
          fontSize: 18,
          marginBottom: 10,
        }}
      >
        {props.title}
      </Text>
      <ImageUpload type={props.type} setImageLoaded={props.setImageLoaded} />
    </View>
  );
}
export function AccountImageUploadPage() {
  const [imageLoaded, setImageLoaded] = useState(true);
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <View
        style={{
          marginTop: 32,
          height: 100,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {imageLoaded ? (
          <TouchableOpacity
            style={{ width: 68, alignItems: "center" }}
            onPress={() => {
              if (imageLoaded) {
                navigation.goBack();
              }
            }}
          >
            <Octicons name="chevron-left" color={"#262626"} size={42} />
          </TouchableOpacity>
        ) : (
          <View style={{ marginLeft: "8%" }}>
            <ActivityIndicator size="large" color="Black" />
          </View>
        )}

        <Text
          style={{
            textAlign: "center",
            fontFamily: "Poppins_600SemiBold",
            fontSize: 20,
            color: "#262626",
          }}
        >
          Picture Upload
        </Text>
        <View style={{ width: 68 }}></View>
      </View>

      <View style={{ width: "100%", alignItems: "center" }}>
        <ImageUploadCard
          title="Professional"
          type="professional"
          setImageLoaded={setImageLoaded}
        />

        <ImageUploadCard
          title="Party/Fun"
          type="social"
          setImageLoaded={setImageLoaded}
        />
        <ImageUploadCard
          title="Funny"
          type="funny"
          setImageLoaded={setImageLoaded}
        />
      </View>
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

