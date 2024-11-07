import { StatusBar } from 'expo-status-bar';
import {Image, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../constants";
import CustomButton from "../components/CustomButton";
import {router} from "expo-router";


export default function App() {
    return (
        <SafeAreaView className={"bg-blue-500 h-full"}>
            <ScrollView contentContainerStyle={{height: "100%"}}>
                <View className={"w-full justify-center items-center h-full" +
                    "px-4 min-h-[85vh]"}>
                    <Image
                        source={images.logo}
                        className={"w-[130px] h-[84px]"}
                        resizeMode={"contain"}
                    />
                    <View className={"relative mt-5"}>
                        <Text className={"text-3xl font-bold text-white-white text-center"}>
                            Welcome to MelaScan!
                        </Text>
                    </View>
                    <CustomButton
                        title="Get Started"
                        handlePress={() => router.push("/home")}
                        containerStyles={"w-full mt-7"}
                    />
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#161622' style="light" />
        </SafeAreaView>
    );
}

