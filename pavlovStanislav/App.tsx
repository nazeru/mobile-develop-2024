import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Lab2 from './src/screens/Lab2'
import Lab3 from './src/screens/Lab3'
import Lab4 from './src/screens/Lab4'
import Gear from './src/components/icons/Gear'
import {colors} from './src/constants/colors.const'

const Tab = createBottomTabNavigator()

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.purple,
            borderTopColor: colors.darkPurple,
          },
          tabBarActiveTintColor: colors.white,
          tabBarIcon: ({focused}) => {
            let iconColor
            if (route.name === 'Lab2') {
              iconColor = focused ? colors.white : colors.darkGray
              return <Gear color={iconColor} />
            }
            if (route.name === 'Lab3') {
              iconColor = focused ? colors.white : colors.darkGray
              return <Gear color={iconColor} />
            }
            if (route.name === 'Lab4') {
              iconColor = focused ? colors.white : colors.darkGray
              return <Gear color={iconColor} />
            }
          },
        })}>
        <Tab.Screen name="Lab2" component={Lab2} />
        <Tab.Screen name="Lab3" component={Lab3} />
        <Tab.Screen name="Lab4" component={Lab4} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App
