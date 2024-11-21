import {View, Text, ScrollView, Image, TextInput} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import {router} from "expo-router";

const Login = () => {
    return (
        <SafeAreaView className="bg-white flex-1 px-6 py-5">
            <View className="items-center mb-8">
                <Text className="text-xl font-mbold text-black mb-9">MelaScan</Text>
                <Text className="text-3xl font-mbold text-black">Login</Text>
                <Text className="text-lg font-mlight text-black-100 mt-2 text-center mt-4">
                    Early detection of Melanoma using AI-powered Image Recognition Algorithms
                </Text>
            </View>
            <View className="space-y-4">
                <TextInput
                    placeholder="Email"
                    className="bg-gray-100 py-4 px-4 rounded-xl text-lg font-mregular text-gray-800 mb-6"
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    className="bg-gray-100 py-4 px-4 rounded-xl text-lg font-mregular text-gray-800"
                />
            </View>

            {/* Buttons */}
            <View className="flex-row justify-between mt-6 space-x-4">
                <CustomButton
                    title="Log in"
                    handlePress={() => router.push("/home")}
                    containerStyles={"w-[48%] bg-gray-100"}
                    textStyles={"text-black-100"}
                />
                <CustomButton
                    title="Sign Up"
                    handlePress={() => router.push("/signup")}
                    containerStyles={"w-[48%] bg-secondary"}
                    textStyles={"text-primary"}
                />
            </View>
        </SafeAreaView>
    );
}

export default Login;