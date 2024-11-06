import { Stack } from 'expo-router';
import "../globals.css";


const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
        </Stack>
    )
}

export default RootLayout;
