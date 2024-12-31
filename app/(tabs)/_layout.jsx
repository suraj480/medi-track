import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false
            }}
        >
            <Tabs.Screen name="index"
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="home" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen name="AddNew"
                options={{
                    tabBarLabel: "Add New",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="plus-circle" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen name="Profile"
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user" size={size} color={color} />
                    )
                }}

            />
        </Tabs>
    )
}