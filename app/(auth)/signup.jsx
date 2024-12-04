import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const validateInputs = () => {
        if (!name || !lastName || !dateOfBirth || !email || !password || !confirmPassword) {
            Alert.alert("Error", "All fields are required.");
            return false;
        }
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return false;
        }
        if (password.length < 8) {
            Alert.alert("Error", "Password must be at least 8 characters long.");
            return false;
        }
        return true;
    };

    const handleSignUp = async () => {
        if (!validateInputs()) return;

        const payload = {
            firstName: name,
            lastName,
            dateOfBirth,
            email,
            password,
        };

        try {
            const response = await fetch("http://localhost:8080/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                Alert.alert("Success", "User registered successfully!");
                router.push("/login");
            } else {
                const errorData = await response.json();
                Alert.alert("Error", errorData.message || "Signup failed.");
            }
        } catch (err) {
            Alert.alert("Error", "An error occurred while signing up. Please try again.");
        }
    };

    return (
        <SafeAreaView className="bg-white flex-1 px-6">
            <View className="mt-6">
                <Text className="text-3xl font-mbold text-black mb-6 text-center">Sign Up</Text>

                <View className="space-y-4">
                    <View>
                        <Text className="text-lg font-mmedium text-black-100 mb-3">Name</Text>
                        <TextInput
                            placeholder="John"
                            className="border border-gray-300 rounded-lg py-3 px-4 text-base mb-6"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View>
                        <Text className="text-lg font-mmedium text-black-100 mb-3">Last Name</Text>
                        <TextInput
                            placeholder="Doe"
                            className="border border-gray-300 rounded-lg py-3 px-4 text-base mb-6"
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </View>

                    <View>
                        <Text className="text-lg font-mmedium text-black-100 mb-3">Date of Birth</Text>
                        <TextInput
                            placeholder="DD.MM.YYYY"
                            className="border border-gray-300 rounded-lg py-3 px-4 text-base mb-6"
                            keyboardType="numeric"
                            value={dateOfBirth}
                            onChangeText={setDateOfBirth}
                        />
                    </View>

                    <View>
                        <Text className="text-lg font-mmedium text-black-100 mb-3">Email</Text>
                        <TextInput
                            placeholder="johndoe@example.com"
                            className="border border-gray-300 rounded-lg py-3 px-4 text-base mb-6"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View>
                        <Text className="text-lg font-mmedium text-black-100 mb-3">Password</Text>
                        <View className="flex-row items-center border border-gray-300 rounded-lg py-3 px-4 mb-6">
                            <TextInput
                                placeholder="********"
                                className="flex-1 text-base"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={20}
                                    color="gray"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <Text className="text-lg font-mmedium text-black-100 mb-3">Confirm Password</Text>
                        <View className="flex-row items-center border border-gray-300 rounded-lg py-3 px-4 mb-6">
                            <TextInput
                                placeholder="********"
                                className="flex-1 text-base"
                                secureTextEntry={!showConfirmPassword}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <Ionicons
                                    name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                                    size={20}
                                    color="gray"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View className="items-center">
                    <CustomButton
                        title="Sign Up"
                        handlePress={handleSignUp}
                        containerStyles={"w-[90%] my-3 bg-secondary"}
                        textStyles={"text-primary"}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignUp;
