import React, { useEffect, useState } from "react";
import {View, Text, TouchableOpacity, FlatList, Image, Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { fetchScans, getScanResult } from "../../lib/requests";
import {router, useNavigation} from "expo-router";
import { Swipeable } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {icons} from "../../constants";

const RenderScanItem = ({ item, index, onDelete }) => {
    const [scanResult, setScanResult] = useState(null);
    const navigation = useNavigation();

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

    // Sağda silme butonu
    const renderRightActions = () => (
        <TouchableOpacity
            onPress={() => onDelete(item.id)}
            className="bg-red-500 justify-center items-center w-20 h-20 rounded-lg"
        >
            <Text className="text-white font-msemibold">Delete</Text>
        </TouchableOpacity>
    );

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <View className="flex-row items-center justify-between mb-4 bg-gray-100 p-4 rounded-lg">
                <Image
                    source={{ uri: item.imageUrl }}
                    style={{ width: 64, height: 64, borderRadius: 8 }}
                    resizeMode="cover"
                />
                <View className="flex-1 ml-4">
                    <Text className="text-base font-medium text-black">Scan {index + 1}</Text>
                    <Text className="text-sm font-medium text-gray-500">
                        Result: {scanResult
                        ? `${scanResult.label} (${scanResult.label === "Benign"
                            ? ((100 - scanResult.confidence * 100).toFixed(2))
                            : (scanResult.confidence * 100).toFixed(2)}%)`
                        : "Loading..."}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("details", { scan: item })}
                    className="bg-gray-300 py-2 px-4 rounded-lg"
                >
                    <Text className="text-sm font-medium text-black">View Details</Text>
                </TouchableOpacity>
            </View>
        </Swipeable>
    );
};

const Home = () => {
    const [scans, setScans] = useState([]);
    const isFocused = useIsFocused();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("userId");
            await AsyncStorage.removeItem("authToken");
            await AsyncStorage.removeItem("scans");

            router.replace("/login");
        } catch (error) {
            console.error("Error during logout:", error);
            Alert.alert("Error", "Failed to log out. Please try again.");
        }
    };

    const getScans = async () => {
        try {
            const fetchedScans = await fetchScans();
            setScans(fetchedScans);
        } catch (error) {
            console.error("Error fetching scans:", error.message);
        }
    };

    const handleDelete = (id) => {
        setScans((prevScans) => prevScans.filter((scan) => scan.id !== id));
    };

    useEffect(() => {
        if (isFocused) {
            getScans();
        }
    }, [isFocused]);

    return (
        <SafeAreaView className="bg-white flex-1 px-6">
            <View className="flex-row justify-between items-center mt-6 mb-6">
                <Text className="text-2xl font-mextrabold text-black">MelaScan</Text>
                <TouchableOpacity
                    onPress={handleLogout}

                >
                    <Image
                        className="w-8 h-8"
                        source={icons.logout}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <Text className="text-xl font-msemibold text-center text-black mb-4">Your Uploaded Scans</Text>
            <FlatList
                data={scans}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <RenderScanItem item={item} index={index} onDelete={handleDelete} />
                )}
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
