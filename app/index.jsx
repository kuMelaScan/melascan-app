import { useEffect, useState } from "react";
import { View, Text, StatusBar, ActivityIndicator, Image, Alert } from "react-native";
import { images } from "../constants";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "../lib/requests";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            initializeApp();
        }
        catch (error) {
            Alert.alert("Error", "Failed to initialize the app. Please try again.");
        }
        finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <View className="flex-1 justify-center items-center bg-white">
            <StatusBar backgroundColor="#0000FF" barStyle="light-content" />

            <Image source={images.squareLogo} className="w-36 h-36 mb-5" />

            <Text className="text-lg text-black mb-2">Loading...</Text>

            {isLoading && <ActivityIndicator size="large" color="#000" />}
        </View>
    );
};

export default App;
