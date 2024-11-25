import React, { useState, useEffect } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [gallery, setGallery] = useState([]);

  const loadGallery = async () => {
    try {
      const storedImages = await AsyncStorage.getItem("gallery");
      if (storedImages) {
        setGallery(JSON.parse(storedImages));
      }
    } catch (error) {
      console.error("Failed to load images from storage", error);
    }
  };

  const saveGallery = async (images) => {
    try {
      await AsyncStorage.setItem("gallery", JSON.stringify(images));
    } catch (error) {
      console.error("Failed to save images to storage", error);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Camera access is required.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled && result.assets && result.assets[0].uri) {
      const newGallery = [...gallery, result.assets[0].uri];
      setGallery(newGallery);
      saveGallery(newGallery);
    } else {
      Alert.alert("No image", "No image was captured.");
    }
  };

  const handleUploadPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Media library access is required.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled && result.assets && result.assets[0].uri) {
      const newGallery = [...gallery, result.assets[0].uri];
      setGallery(newGallery);
      saveGallery(newGallery);
    } else {
      Alert.alert("No image", "No image was selected.");
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item }} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Gallery</Text>
      <FlatList
        data={gallery}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.galleryContainer}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Ionicons name="camera" size={24} color="white" />
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleUploadPhoto}>
          <Ionicons name="image" size={24} color="white" />
          <Text style={styles.buttonText}>Upload Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FAFAFA",
      padding: 10,
      alignItems: "center",
      width:'auto' 
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 20,
      textAlign: "center",
      fontFamily: 'Roboto',
    },
    galleryContainer: {
    flex:1,
     flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 20,
    },
    imageWrapper: {
      margin: 8,
      borderRadius: 12,
      elevation: 5, 
      shadowColor: "#000", 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
    image: {
      width: (Dimensions.get('window').width - 60) / 3, 
      height: (Dimensions.get('window').width - 60) / 3, 
      resizeMode: "cover",
      borderRadius: 12,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      paddingVertical: 20,
      marginTop: 20,
    },
    button: {
      flexDirection: "row",
      backgroundColor: "#FF6F61", 
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 10,
      width: "45%",
      elevation: 4, 
      shadowColor: "#000", 
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
      marginLeft: 10,
      fontFamily: 'Roboto',
    },
  });