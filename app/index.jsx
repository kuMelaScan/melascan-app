import {useEffect} from "react";
import { View, Text, StatusBar, ActivityIndicator, Image } from "react-native";
import {images} from "../constants";
import { router } from "expo-router";

const App = () => {

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/first");
        }, 500);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <View className="flex-1 justify-center items-center bg-white">
            <StatusBar backgroundColor="#0000FF" barStyle="light-content" />

            <Image
                source={images.squareLogo}
                className="w-36 h-36 mb-5"
            />

            <Text className="text-lg text-black mb-2">Loading...</Text>

            <ActivityIndicator size="large" color="#000" />
        </View>
    );
};

export default App;
