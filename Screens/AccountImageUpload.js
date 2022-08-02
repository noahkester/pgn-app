import { StyleSheet, TouchableOpacity, Text, Image, View, Alert, } from "react-native";
import React, { useState, useEffect } from "react";
import { AccountTop } from "./Account";
import * as ImagePicker from "expo-image-picker";
import { store, auth } from "../utils/firebase";
import Octicons from 'react-native-vector-icons/Octicons';
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImageManipulator from 'expo-image-manipulator';

function ImageUpload(props) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState('');
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
        { format: 'jpeg' },
      );

      setImage(resizedResult);
      uploadImage(resizedResult.uri, auth.currentUser.uid + "_" + props.type)
        .then(() => {
          Alert.alert("(AccountImageUpload) Success!");
        })
        .catch(() => {
          console.log("(AccountImageUpload) Error uploading image");
        });
    }
  };
  return (
    <TouchableOpacity
      style={{
        zIndex: -1,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#DBDBDB',
        borderRadius: 10,
        height: 150,
        width: 150,
        backgroundColor: '#FFFFFF'
      }}
      onPress={() => {
        pickImage();
      }}
    >
      {(image === '') ?
        <MaterialIcons
          name="add"
          color={'#262626'}
          size={60}
        /> :
        <Image source={image} style={styles.cloudImage} resizeMode="contain" />
      }
    </TouchableOpacity>
  );
}
function ImageUploadCard(props) {
  return (
    <View style={{ marginTop: 20, width: '90%', height: 160, alignItems: 'center' }}>
      <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 18, marginBottom: 10 }}>{props.title}</Text>
      <ImageUpload type={props.type} />
    </View>
  );
}
export function AccountImageUploadPage() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
      <View style={{ marginTop: 32, height: 100, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={{ width: 68, alignItems: 'center' }}
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
        <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#262626' }}>{'Picture Upload'}</Text>
        <View style={{ width: 68 }}></View>
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
          title="Funny"
          type="funny"
          imageSrc={require("../images/imageUpload3.png")}
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
