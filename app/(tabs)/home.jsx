import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

const Home = () => {
    const [scans, setScans] = useState([]);
    const isFocused = useIsFocused();
    const fetchScans = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            const authToken = await AsyncStorage.getItem("authToken");

            if (!userId || !authToken) {
                Alert.alert("Error", "User ID or authentication token is missing.");
                return;
            }

            const response = await axios.get(`http://172.21.178.55:8080/images/list/${userId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (response.status === 200) {
                setScans(response.data); // Assuming the response contains a list of ImageMetadata
            } else {
                throw new Error("Failed to fetch scans.");
            }
        } catch (error) {
            Alert.alert("Error", "Failed to fetch scans.");
            console.error(error);
        }
    };
    useEffect(() => {
        if (isFocused) {
            fetchScans();
        }
    }, [isFocused]);

    // Render a single scan item
    const renderScanItem = ({ item, index }) => (
        <View className="flex-row items-center justify-between mb-4">
            <Image
                source={{ uri: item.imageUrl }} // Presigned URL from backend
                style={{ width: 64, height: 64, borderRadius: 8 }}
                resizeMode="cover"
            />
            <View className="flex-1 ml-4">
                <Text className="text-base font-mmedium text-black">Scan {index + 1}</Text>
                <Text className="text-sm font-mmedium text-gray-500">
                    Last Modified: {new Date(item.lastModified).toLocaleDateString()}
                </Text>
                <Text className="text-sm font-mmedium text-gray-500">
                    Size: {(item.size / 1024).toFixed(2)} KB
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => Alert.alert("Details", `Image URL: ${item.imageUrl}`)}
                className="bg-gray-200 py-2 px-4 rounded-lg"
            >
                <Text className="text-sm font-mmedium text-black">View Details</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView className="bg-white flex-1 px-6">
            <Text className="text-3xl font-mbold text-black text-center mt-6 mb-4">
                Welcome to MelaScan!
            </Text>
            <Text className="text-xl font-msemibold text-black mb-4">Your Uploaded Scans</Text>
            <FlatList
                data={scans}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderScanItem}
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
