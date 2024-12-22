import { View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import {uploadPhotoToS3} from "../../lib/requests";

const Scan = () => {

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
      await uploadPhotoToS3(result.assets[0].uri);
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
      await uploadPhotoToS3(result.assets[0].uri);
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