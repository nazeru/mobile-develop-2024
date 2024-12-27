   import { Tabs } from 'expo-router';
   import React from 'react';
   import { AppProvider } from '@/components/AppContext'; 

   const TabLayout: React.FC = () => {
       return (
           <Tabs>
               <Tabs.Screen name="index" options={{ title: 'Секундомер' }} />  
               <Tabs.Screen name="TimerScreen" options={{ title: 'Таймер' }} />
               <Tabs.Screen name="WheatherScreen" options={{ title: 'Погода' }} />
               <Tabs.Screen name="SettingsScreen" options={{ title: 'Настройки' }} /> 
           </Tabs>
       );
   };

   export default function MainLayout() {
       return (
           <AppProvider>
               <TabLayout />
           </AppProvider>
       );
   }
