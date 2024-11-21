import {SplashScreen, Stack} from 'expo-router';
import "../globals.css";
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

    const [loaded, error] = useFonts({
        "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
        "Manrope-ExtraBold": require("../assets/fonts/Manrope-ExtraBold.ttf"),
        "Manrope-ExtraLight": require("../assets/fonts/Manrope-ExtraLight.ttf"),
        "Manrope-Light": require("../assets/fonts/Manrope-Light.ttf"),
        "Manrope-Medium": require("../assets/fonts/Manrope-Medium.ttf"),
        "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
        "Manrope-SemiBold": require("../assets/fonts/Manrope-SemiBold.ttf"),
    });

    useEffect(() => {
        if (error) {
            throw error;
        }
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="(auth)" options={{headerShown: false}}/>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="(onboarding)" options={{headerShown: false}}/>
        </Stack>
    )
}

export default RootLayout;
