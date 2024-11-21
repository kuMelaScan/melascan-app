import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";

const AuthLayout = () => {
    return (
        <>
            <StatusBar backgroundColor='#FFFFFF' style="dark"/>
            <Stack>
                <Stack.Screen name="login" options={{headerShown: false}}/>
                <Stack.Screen name="signup" options={{headerShown: false}}/>
            </Stack>
        </>

    )
}

export default AuthLayout;