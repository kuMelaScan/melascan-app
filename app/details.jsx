import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import {getBorderCircularity, getGradcamResult, getSymmetry} from "../lib/requests";
import {SafeAreaView} from "react-native-safe-area-context";

const Details = ({ route }) => {
    const { scan } = route.params;
    const [gradcamUri, setGradcamUri] = useState(null);
    const [borderCircularity, setBorderCircularity] = useState("");
    const [symmetry, setSymmetry] = useState("")
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const uri = await getGradcamResult(scan);
                setGradcamUri(uri);
                const circularityResult = await getBorderCircularity(scan);
                setBorderCircularity(circularityResult.message);
                const symmetryResult = await getSymmetry(scan);
                setSymmetry(symmetryResult.message);
            } catch (error) {
                console.error("Error fetching Grad-CAM:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [scan]);


    return (
        <SafeAreaView className="bg-white flex-1 px-6 pt-5">
            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : gradcamUri && borderCircularity && symmetry ? (
                <View className="flex-1">
                    <View className="mt-6 mb-6">
                        <Text className="text-2xl font-bold text-black text-center mb-4">
                            Grad-CAM Result
                        </Text>
                        <Image
                            source={{ uri: gradcamUri }}
                            className="w-72 h-72 rounded-xl self-center"
                            resizeMode="contain"
                        />
                    </View>

                    <View className="mb-6">
                        <Text className="text-xl font-bold text-black mb-2">
                            Border Circularity:
                        </Text>
                        <Text className="text-base text-gray-600 ml-4">
                            {borderCircularity}
                        </Text>
                    </View>

                    <View className="mb-6">
                        <Text className="text-xl font-bold text-black mb-2">
                            Symmetry:
                        </Text>
                        <Text className="text-base text-gray-600 ml-4">
                            {symmetry}
                        </Text>
                    </View>
                </View>
            ) : (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-base font-regular text-gray-500">
                        Unable to load details.
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
};

export default Details;
