import React from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
import {images} from "../../constants";
import CustomButton from "../../components/CustomButton";
import {router} from "expo-router";

const Profile = () => {

    return (
    <SafeAreaView className="bg-white flex-1 px-6">
        <View className="flex-row justify-between items-center mt-6 mb-6">
            <Text className="text-xl font-mbold text-black">Profile</Text>
            <TouchableOpacity>
                <Ionicons name="create" size={24} />
            </TouchableOpacity>
        </View>

        <View className="items-center mb-6">
            <Image
                source={images.squareLogo}
                className="w-24 h-24 rounded-full mb-4"
            />
            <Text className="text-lg font-mbold text-black">MelaScan</Text>
            <Text className="text-sm font-mregular text-gray-500">Basic Plan</Text>
            <Text className="text-sm font-mregular text-gray-500">$5/month</Text>
        </View>

        <TouchableOpacity className="bg-gray-200 py-3 rounded-lg mb-6">
            <Text className="text-center text-black font-mmedium">Upgrade</Text>
        </TouchableOpacity>

        <View className="space-y-4 flex-1">
            <TouchableOpacity className="flex-row justify-between items-center py-3">
                <Text className="text-base font-mregular text-black">Your skin history</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row justify-between items-center py-3">
                <Text className="text-base font-mregular text-black">Medical Records</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row justify-between items-center py-3">
                <Text className="text-base font-mregular text-black">FAQ</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row justify-between items-center py-3">
                <Text className="text-base font-mregular text-black">Contact Us</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="gray" />
            </TouchableOpacity>
        </View>
        <View className="mb-6 items-center">
            <CustomButton
                title="Log Out"
                handlePress={() => {router.push("/login")}}
                containerStyles={"bg-red-500 py-3 mt-6 w-[75%]"}
                textStyles={"text-primary"}
            />
        </View>
    </SafeAreaView>
    );
};

export default Profile;
