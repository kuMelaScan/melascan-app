import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import React from "react";

export default function Second() {
    return (
        <SafeAreaView className="bg-white flex-1">
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}>
                <View className="flex-row items-center mt-6 ml-4">
                    <TouchableOpacity onPress={() => router.back()} className="ml-4">
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View className="flex-1 items-center mt-12">
                    <Image
                        source={images.onboardingSecond}
                        className={"mb-5"}
                        resizeMode="contain"
                    />
                    <Text className="text-2xl font-mbold text-black mb-2 py-2">
                        Get AI-Powered Insights
                    </Text>
                    <Text className="text-xl font-mregular text-black-100 mb-6 px-6 text-center">
                        Our AI technology analyzes your mole photos to detect early signs of melanoma, giving you insights to support your skin health.
                    </Text>
                    <View className={"flex-row justify-center items-center mb-8"}>
                        <View className={"w-2.5 h-2.5 bg-gray-300 rounded-full"} />
                        <View className={"w-2.5 h-2.5 bg-blue-500 rounded-full mx-3"} />
                        <View className={"w-2.5 h-2.5 bg-gray-300 rounded-full"} />
                    </View>
                    <CustomButton
                        title="Next"
                        handlePress={() => router.push("/third")}
                        containerStyles={"w-[90%] bg-secondary"}
                        textStyles={"text-primary"}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
