import {View, Text, TouchableOpacity} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import {router} from "expo-router";

const Scan = () => {
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
                <CustomButton title="Take a Photo" handlePress={() => {}} containerStyles={"w-[90%] py-4 bg-secondary my-5"} />
                <CustomButton title="Upload from Gallery" handlePress={() => {}} containerStyles={"w-[90%] py-4 bg-gray-200"} textStyles={"text-black-100"} />
            </View>
        </SafeAreaView>
    );
}

export default Scan;