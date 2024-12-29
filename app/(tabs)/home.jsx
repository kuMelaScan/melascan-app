import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { fetchScans, getScanResult } from "../../lib/requests";

const RenderScanItem = ({ item, index }) => {
    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        const fetchResult = async () => {
            try {


                const result = await getScanResult(item);
                setScanResult(result);
            } catch (error) {
                setScanResult({ label: "Error", confidence: "N/A" });
            }
        };

        fetchResult();
    }, [item]);

    return (
        <View className="flex-row items-center justify-between mb-4">
            <Image
                source={{ uri: item.imageUrl }}
                style={{ width: 64, height: 64, borderRadius: 8 }}
                resizeMode="cover"
            />
            <View className="flex-1 ml-4">
                <Text className="text-base font-medium text-black">Scan {index + 1}</Text>
                <Text className="text-sm font-medium text-gray-500">
                    Result: {scanResult ?
                    `${scanResult.label} (${scanResult.label === "Benign"
                        ? ((100 - scanResult.confidence * 100).toFixed(2))
                        : (scanResult.confidence * 100).toFixed(2)}%)`
                    : "Loading..."}
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => console.log(item.imageUrl)}
                className="bg-gray-200 py-2 px-4 rounded-lg"
            >
                <Text className="text-sm font-medium text-black">View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => console.log(item.imageUrl)}
                className="bg-gray-200 py-2 px-4 rounded-lg"
            >
                <Text className="text-sm font-medium text-black">Evolution</Text>
            </TouchableOpacity>
        </View>
    );
};

const Home = () => {
    const [scans, setScans] = useState([]);
    const isFocused = useIsFocused();

    const getScans = async () => {
        try {
            const fetchedScans = await fetchScans();
            setScans(fetchedScans);
        } catch (error) {
            console.error("Error fetching scans:", error.message);
        }
    };

    useEffect(() => {
        if (isFocused) {
            getScans();
        }
    }, [isFocused]);

    return (
        <SafeAreaView className="bg-white flex-1 px-6">
            <Text className="text-3xl font-mbold text-black text-center mt-6 mb-4">
                Welcome to MelaScan!
            </Text>
            <Text className="text-xl font-msemibold text-black mb-4">Your Uploaded Scans</Text>
            <FlatList
                data={scans}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <RenderScanItem item={item} index={index} />}
                contentContainerStyle={{ paddingBottom: 16 }}
                ListEmptyComponent={
                    <Text className="text-base font-mregular text-gray-500 text-center">
                        No scans available. Start by uploading a photo!
                    </Text>
                }
            />
            <View className="mt-8">
                <Text className="text-xl font-msemibold text-black mb-2">Quick Fact</Text>
                <Text className="text-m font-mregular text-gray-600 leading-6">
                    Did you know that melanoma is the deadliest form of skin cancer? It's
                    essential to catch it early for the best chance of successful treatment.
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default Home;
