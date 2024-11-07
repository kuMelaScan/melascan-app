import {Tabs, Redirect} from "expo-router";
import {Text , Image, View} from "react-native";

import { icons } from "../../constants";

const TabIcon = ({icon, color, focused, name}) => {
    return (
        <View className={"items-center justify-center gap-2"}>
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className={`w-6 h-6 ${focused ? "tint-blue-500" : "tint-gray-500"}`}
            />
            <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
                            style={{color: color}}
            >
                {name}
            </Text>
        </View>
    )
}


const TabsLayout = () => {
    return (
        <>
        <Tabs
            screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: [
                {
                    backgroundColor: "white",
                    borderTopWidth: 1,
                    borderTopColor: "transparent",
                    height: 90,
                },
                null
            ]
            }}
        >
            <Tabs.Screen
                name="home"
                options={
                    {
                        title: "Home",
                        headerShown: false,
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon
                                icon={icons.home}
                                color={color}
                                focused={focused}
                                name="Home"
                            />
                        )
                    }
                }
            />
            <Tabs.Screen
                name="upload"
                options={
                    {
                        title: "Upload",
                        headerShown: false,
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon
                                icon={icons.upload}
                                color={color}
                                focused={focused}
                                name="Upload"
                            />
                        )
                    }
                }
            />
            <Tabs.Screen
                name="profile"
                options={
                    {
                        title: "Profile",
                        headerShown: false,
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon
                                icon={icons.profile}
                                color={color}
                                focused={focused}
                                name="Profile"
                            />
                        )
                    }
                }
            />
        </Tabs>
        </>
    )
}

export default TabsLayout;