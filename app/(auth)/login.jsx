import React, { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Function to handle login
    const handleLogin = async () => {
        // Validate inputs
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        const payload = {
            email,
            password,
        };

        try {
            const response = await fetch("http://172.21.178.55:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                const { token, userId } = data; // Assume the token is returned in the response

                // Save token securely
                await AsyncStorage.multiSet([
                    ["userId", userId],
                    ["authToken", token],
                ]);

                Alert.alert("Success", "Login successful!");
                router.push("/home"); // Navigate to home page
            } else {
                const errorData = await response.json();
                Alert.alert("Error", errorData.message || "Login failed.");
            }
        } catch (err) {
            Alert.alert("Error", "An error occurred while logging in. Please try again.");
        }
    };

    return (
        <SafeAreaView className="bg-white flex-1 px-6 py-5">
            <View className="items-center mb-8">
                <Text className="text-xl font-mbold text-black mb-9">MelaScan</Text>
                <Text className="text-3xl font-mbold text-black">Login</Text>
                <Text className="text-lg font-mlight text-black-100 mt-2 text-center mt-4">
                    Early detection of Melanoma using AI-powered Image Recognition Algorithms
                </Text>
            </View>

            {/* Input Fields */}
            <View className="space-y-4">
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="bg-gray-100 py-4 px-4 rounded-xl text-lg font-mregular text-gray-800 mb-6"
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    className="bg-gray-100 py-4 px-4 rounded-xl text-lg font-mregular text-gray-800"
                />
            </View>

            {/* Buttons */}
            <View className="flex-row justify-between mt-6 space-x-4">
                <CustomButton
                    title="Login"
                    handlePress={handleLogin}
                    containerStyles={"w-full bg-secondary"}
                    textStyles={"text-primary"}
                />
            </View>

            <View className="mt-4">
                <CustomButton
                    title="Sign Up"
                    handlePress={() => router.push("/signup")}
                    containerStyles={"w-full bg-gray-100"}
                    textStyles={"text-black-100"}
                />
            </View>
        </SafeAreaView>
    );
};

export default Login;
