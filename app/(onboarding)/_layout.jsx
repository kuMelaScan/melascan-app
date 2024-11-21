import React from 'react';
import { View, Text } from 'react-native';
import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";


const OnboardingLayout = () => {
    return(
        <>
            <StatusBar backgroundColor='#FFFFFF' style="dark"> </StatusBar>
            <Stack>
                <Stack.Screen name="first" options={{headerShown: false}}/>
                <Stack.Screen name="second" options={{headerShown: false}}/>
                <Stack.Screen name="third" options={{headerShown: false}}/>
            </Stack>
        </>
    )
}

export default OnboardingLayout;