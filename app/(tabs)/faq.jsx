import React from "react";
import {View, Text, Image, TouchableOpacity, Alert, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
import {images} from "../../constants";
import CustomButton from "../../components/CustomButton";

const Faq = () => {

    return (
    <SafeAreaView className="bg-white flex-1 px-6">
        <View className=" mt-6 mb-8">
            <Text className="text-2xl font-mextrabold text-black">MelaScan</Text>
        </View>

        <Text className=" text-2xl font-mbold text-center text-black">FAQ</Text>
        <ScrollView className="mt-6" showsVerticalScrollIndicator={false}>
            <View className="mt-6">
                <Text className="text-xl font-msemibold text-black mb-2">How are the photos analyzed?</Text>
                <Text className="text-m font-mregular text-gray-600 leading-6">
                    The photos are analyzed using Convolutional Neural Networks (CNNs), which detect patterns and features in skin lesions to assess the risk of melanoma.
                </Text>
            </View>
            <View className="mt-6">
                <Text className="text-xl font-msemibold text-black mb-2">What is Grad-CAM?</Text>
                <Text className="text-m font-mregular text-gray-600 leading-6">
                    Grad-CAM (Gradient-weighted Class Activation Mapping) is a visualization technique that highlights the important regions in an image used by the AI model for its decision-making.
                </Text>
            </View>
            <View className="mt-6">
                <Text className="text-xl font-msemibold text-black mb-2">What is Border Analysis?</Text>
                <Text className="text-m font-mregular text-gray-600 leading-6">
                    Border analysis examines the edges of a mole to identify irregularities, which are a common indicator of melanoma.
                </Text>
            </View>
            <View className="mt-6">
                <Text className="text-xl font-msemibold text-black mb-2">What is Symmetry and SSIM?</Text>
                <Text className="text-m font-mregular text-gray-600 leading-6">
                    Symmetry refers to the balanced shape of a mole, while SSIM (Structural Similarity Index Measure) evaluates image similarity to assess the mole’s symmetry by comparing two halves.
                </Text>
            </View>
            <View className="mt-6">
                <Text className="text-xl font-msemibold text-black mb-2">Is Melanoma important to pre-diagnose?</Text>
                <Text className="text-m font-mregular text-gray-600 leading-6">
                    Yes, early detection of melanoma significantly improves treatment outcomes and increases survival rates.
                </Text>
            </View>
            <View className="mt-6">
                <Text className="text-xl font-msemibold text-black mb-2">How many skin cancers can be prevented with screening?</Text>
                <Text className="text-m font-mregular text-gray-600 leading-6">
                    Screening can help prevent thousands of cases annually by detecting skin cancer early and encouraging timely intervention.
                </Text>
            </View>
        </ScrollView>



    </SafeAreaView>
    );
};

export default Faq;
