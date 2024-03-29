import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import Octicons from "react-native-vector-icons/Octicons";

import NewUserContext from "../../utils/NewUserContext";
import { db, store, auth } from "../../utils/firebase";

function ImageUpload(props) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(require("../../images/imageUpload.png"));

  useEffect(() => {
    async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus === "granted");
      //console.log("(Account Image Upload) Gallery Requested");
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
        [{ resize: { width: 400 } }],
        { format: "jpeg" }
      );

      setImage(resizedResult);
      uploadImage(resizedResult.uri, auth.currentUser.uid + "_" + props.type)
        .then(() => {
          props.setImageLoaded(true);
        })
        .catch((e) => {
          //console.log("(AccountImageUpload) Error uploading image" + e);
          props.setImageLoaded(true);
        });
    }
    else {
      props.setImageLoaded(true);
    }
  };
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        width: "80%",
        height: '20%',
        borderRadius: 10,
        borderColor: "#DBDBDB",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        padding: 10
      }}
      onPress={() => {
        props.setImageLoaded(false);
        pickImage();
      }}
    >
      <View
        style={{
          width: "100%",
          height: '70%',
          justifyContent: "center",
          alignItems: "center",
          zIndex: -1,
          backgroundColor: "#FFFFFF",

        }}

      >
        <Image
          source={image}
          style={{ width: "100%", height: '100%' }}
          resizeMode="contain"
        />
      </View>
      <Text
        style={{
          fontFamily: "Poppins_600SemiBold",
          fontSize: 16,
          color: "#262626"
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}
function ImageUploadCard(props) {
  return (
    <ImageUpload type={props.type} title={props.title} setImageLoaded={props.setImageLoaded} />
  );
}

export function ProfilePicturesPage() {
  const [imageLoaded, setImageLoaded] = useState(true);
  const navigation = useNavigation();
  const newUserContext = useContext(NewUserContext);
  const uploadData = () => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .set(newUserContext)
      .then(() => {
        //console.log("(NewUser) User Information successfully written!");
        navigation.navigate("EmailVerification");
      })
      // .catch((error) => {
      //   console.error("(NewUser) Error writing document: ", error);
      // });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <View
        style={{
          marginTop: 32,
          height: 100,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ marginLeft: 16 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Octicons name="chevron-left" color={"#262626"} size={42} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <ImageUploadCard
          setImageLoaded={setImageLoaded}
          title="Professional"
          type="professional"
          imageSrc={require("../../images/imageUpload1.png")}
        />
        <View
          style={{
            width: "80%",
            height: 1,
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: "#DBDBDB",
          }}
        />
        <ImageUploadCard
          setImageLoaded={setImageLoaded}
          title="Party"
          type="social"
          imageSrc={require("../../images/imageUpload2.png")}
        />
        <View
          style={{
            width: "80%",
            height: 1,
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: "#DBDBDB",
          }}
        />
        <ImageUploadCard
          setImageLoaded={setImageLoaded}
          title="Random"
          type="funny"
          imageSrc={require("../../images/imageUpload3.png")}
        />
      </View>

      <View
        style={{
          width: "100%",
          alignItems: "center",
          position: "absolute",
          bottom: 60,
        }}
      >
        <TouchableOpacity
          style={{
            width: "90%",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#DBDBDB",
            backgroundColor: "#FFFFFF",
          }}
          onPress={(imageLoaded) ? uploadData : null}
        >
          <Text
            style={{
              fontFamily: "Poppins_600SemiBold",
              fontSize: 16,
              color: "#262626",
            }}
          >
            {(imageLoaded) ? "Complete" : "Uploading Image..."}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
