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
                className={`w-6 h-6 ${focused ? "#369EFF" : "gray-500"}`}
            />
            <Text className={`${focused ? "font-msemibold" : "font-mlight"} text-xs`}
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
                    backgroundColor: '#FFFFFF',
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
                name="scan"
                options={
                    {
                        title: "Scan",
                        headerShown: false,
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon
                                icon={icons.scan}
                                color={color}
                                focused={focused}
                                name="Scan"
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