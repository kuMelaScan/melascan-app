import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import React from "react";

export default function First() {
    return (
        <SafeAreaView className="bg-white flex-1">
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}>
                <View className="flex-1 items-center mt-24">
                    <Image
                        source={images.onboardingFirst}
                        className={"mb-5"}
                        resizeMode="contain"
                    />
                    <Text className="text-2xl font-mbold text-black mb-2 py-2">
                        Take photos of your skin
                    </Text>
                    <Text className="text-xl font-mregular text-black-100 mb-6 px-6">
                        Easily capture photos of your moles using the app. Documenting these images helps the app track any changes in your skin over time.
                    </Text>
                    <View className={"flex-row justify-center items-center mb-8"}>
                        <View className={"w-2.5 h-2.5 bg-blue-500 rounded-full"}/>
                        <View className={"w-2.5 h-2.5 bg-gray-300 rounded-full mx-3"}/>
                        <View className={"w-2.5 h-2.5 bg-gray-300 rounded-full"}/>
                    </View>
                    <CustomButton
                        title="Next"
                        handlePress={() => router.push("/second")}
                        containerStyles={"w-[90%] bg-secondary"}
                        textStyles={"text-primary"}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
