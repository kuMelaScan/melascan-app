import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Scan = () => {
  const [userId, setUserId] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        const storedToken = await AsyncStorage.getItem("authToken");
        if (storedUserId && storedToken) {
          setUserId(storedUserId);
          setAuthToken(storedToken);
        } else {
        }
      } catch (err) {
        Alert.alert("Error", "Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  // Function to handle uploading a photo to AWS S3
  const uploadPhotoToS3 = async (uri) => {
    if (!userId || !authToken) {
      Alert.alert("Error", "User ID or authentication token not found.");
      return;
    }

    try {
      const formData = new FormData();
      const fileName = uri.split("/").pop();
      const fileType = fileName.split(".").pop();

      formData.append("userId", userId);
      formData.append("image", {
        uri,
        name: fileName,
        type: `image/${fileType}`,
      });

      console.log("Form Data: ", formData);

      const response = await axios.post("http://172.21.178.55:8080/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`, // Add Bearer token
        },
      });

      if (response.status === 200) {
        Alert.alert("Success", response.data);
      } else {
        Alert.alert("Upload Failed", "Please try again later.");
      }
    } catch (error) {
      console.log("Axios Error: ", error);
      Alert.alert("Upload Error", "An error occurred while uploading the photo.");
    }
  };

  // Function to open the camera
  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "Camera access is required to take a photo.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      uploadPhotoToS3(result.assets[0].uri);
    } else {
      Alert.alert("Action Cancelled", "No photo was taken.");
    }
  };

  // Function to open the gallery
  const handleUploadPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "Gallery access is required to upload a photo.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      uploadPhotoToS3(result.assets[0].uri);
    } else {
      Alert.alert("Action Cancelled", "No photo was selected.");
    }
  };

  return (
      <SafeAreaView className="bg-white flex-1 px-6">
        {/* Header */}
        <View className="items-center mt-6 mb-8">
          <Text className="text-xl font-mbold text-black">MelaScan Logo</Text>
        </View>

        {/* Title and Description */}
        <View className="mb-12">
          <Text className="text-2xl font-msemibold text-black text-center mb-2">
            Take a photo of your mole
          </Text>
          <Text className="text-m font-mregular text-gray-600 text-center">
            Use the camera to take a photo of your mole. Make sure it’s clear and in focus.
          </Text>
        </View>

        {/* Buttons */}
        <View className="items-center">
          <CustomButton
              title="Take a Photo"
              handlePress={handleTakePhoto}
              containerStyles={"w-[90%] py-4 bg-secondary my-5"}
              textStyles={"text-primary"}
          />
          <CustomButton
              title="Upload from Gallery"
              handlePress={handleUploadPhoto}
              containerStyles={"w-[90%] py-4 bg-gray-200"}
              textStyles={"text-black-100"}
          />
        </View>
      </SafeAreaView>
  );
};

export default Scan;