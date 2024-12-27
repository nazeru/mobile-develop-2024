// _layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';
import { AppProvider, useAppContext } from '@/components/AppContext';
import { MaterialIcons } from '@expo/vector-icons'; 
import { View } from 'react-native';

const TabLayout: React.FC = () => {
    const { isDarkTheme } = useAppContext(); 

    return (
        <View style={{ flex: 1, backgroundColor: isDarkTheme ? '#1e1e1e' : '#f0f0f0' }}> 
            <Tabs
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: isDarkTheme ? '#1e1e1e' : '#f0f0f0', 
                    },
                    tabBarActiveTintColor: 'tomato', 
                    tabBarInactiveTintColor: isDarkTheme ? '#fff' : 'grey', 
                }}
            >
                <Tabs.Screen 
                    name="index" 
                    options={{ 
                        title: 'Секундомер',
                        headerShown: false, 
                        tabBarIcon: ({ color, size, focused }) => (
                            <MaterialIcons name="access-alarm" size={size} color={focused ? 'orange' : color} />  
                        ),
                    }} 
                />
                <Tabs.Screen 
                    name="TimerScreen" 
                    options={{ 
                        title: 'Таймер',
                        headerShown: false, 
                        tabBarIcon: ({ color, size, focused }) => (
                            <MaterialIcons name="timer" size={size} color={focused ? 'orange' : color} />  
                        ),
                    }} 
                />
                <Tabs.Screen 
                    name="WheatherScreen" 
                    options={{ 
                        title: 'Фильмы',
                        headerShown: false, 
                        tabBarIcon: ({ color, size, focused }) => (
                            <MaterialIcons name="wb-sunny" size={size} color={focused ? 'orange' : color} />  
                        ),
                    }} 
                />
                <Tabs.Screen 
                    name="SettingsScreen" 
                    options={{ 
                        title: 'Настройки',
                        headerShown: false, 
                        tabBarIcon: ({ color, size, focused }) => (
                            <MaterialIcons name="settings" size={size} color={focused ? 'orange' : color} />  
                        ),
                    }} 
                />
            </Tabs>
        </View>
    );
};

export default function MainLayout() {
    return (
        <AppProvider>
            <TabLayout />
        </AppProvider>
    );
}
