import {View, Text, TextInput, TouchableOpacity} from "react-native";
import {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import {router} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                        />
                    </View>

                    <View>
                        <Text className="text-lg font-mmedium text-black-100 mb-3">Last Name</Text>
                        <TextInput
                            placeholder="Doe"
                            className="border border-gray-300 rounded-lg py-3 px-4 text-base mb-6"
                        />
                    </View>

                    <View>
                        <Text className="text-lg font-mmedium text-black-100 mb-3">Date of Birth</Text>
                        <TextInput
                            placeholder="DD.MM.YYYY"
                            className="border border-gray-300 rounded-lg py-3 px-4 text-base mb-6"
                            keyboardType="numeric"
                        />
                    </View>

                    <View>
                        <Text className="text-lg font-mmedium text-black-100 mb-3">Email</Text>
                        <TextInput
                            placeholder="johndoe@example.com"
                            className="border border-gray-300 rounded-lg py-3 px-4 text-base mb-6"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View>
                        <Text className="text-lg font-mmedium text-black-100 mb-3">Password</Text>
                        <View className="flex-row items-center border border-gray-300 rounded-lg py-3 px-4 mb-6">
                            <TextInput
                                placeholder="********"
                                className="flex-1 text-base"
                                secureTextEntry={!showPassword}
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
                        handlePress={() => {router.push("/login")}}
                        containerStyles={"w-[90%] my-3 bg-secondary"}
                        textStyles={"text-primary"}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default SignUp;