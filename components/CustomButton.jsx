import React from "react";
import {Text, TouchableOpacity} from "react-native";


const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading}) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`${containerStyles} rounded-2xl h-[50px] justify-center items-center  ${isLoading ? "opacity-50" : ""}`}
            disabled={isLoading}
        >
            <Text className={`text-white font-msemibold text-lg ${textStyles}`}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton;