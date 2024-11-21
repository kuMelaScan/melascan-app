import {View, Text, TouchableOpacity, FlatList} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";


const Home = () => {
    const scans = [
        { id: "1", title: "Mole on left arm", result: "Low Risk" },
        { id: "2", title: "Mole on right leg", result: "Medium Risk" },
        { id: "3", title: "Mole on back", result: "High Risk" },
    ];

    const renderScanItem = ({ item }) => (
        <View className="flex-row items-center justify-between mb-4">
            <View className="w-16 h-16 bg-gray-200 rounded-lg mr-4" />
            <View className="flex-1">
                <Text className="text-base font-mmedium text-black">{item.title}</Text>
                <Text className="text-sm font-mmedium text-gray-500">Result: {item.result}</Text>
            </View>
            {/* View Details Button */}
            <TouchableOpacity className="bg-gray-200 py-2 px-4 rounded-lg">
                <Text className="text-sm font-mmedium text-black">View Details</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView className="bg-white flex-1 px-6">
            {/* Header */}
            <Text className="text-3xl font-mbold text-black text-center mt-6 mb-4">
                Welcome to MelaScan!
            </Text>

            <Text className="text-xl font-msemibold text-black mb-4">Previous Scans</Text>
            <FlatList
                data={scans}
                keyExtractor={(item) => item.id}
                renderItem={renderScanItem}
                contentContainerStyle={{ paddingBottom: 16 }}
            />
            <View className= "flex-1 ">
                <Text className="text-xl font-msemibold text-black mt-8 mb-2">Quick Fact</Text>
                <Text className="text-m font-mregular text-gray-600 leading-6">
                    Did you know that melanoma is the deadliest form of skin cancer? It's
                    essential to catch it early for the best chance of successful treatment.
                </Text>
            </View>
        </SafeAreaView>
    );
}

export default Home;