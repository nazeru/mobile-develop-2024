// App.js
import React from 'react';
import { Animated } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import store from './store/store';

import Home from './screens/Home';
import Lab1 from './screens/Lab1';
import Lab2 from './screens/Lab2';
import Lab3 from './screens/Lab3';
import Lab4 from './screens/Lab4';
import SavedImage from './screens/SavedImage';

import { ThemeProvider } from './ThemeContext';

const Stack = createNativeStackNavigator();

const App = () => {
  const [fadeAnim] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Lab1" component={Lab1} />
              <Stack.Screen name="Lab2" component={Lab2} />
              <Stack.Screen name="Lab3" component={Lab3} />
              <Stack.Screen name="Lab4" component={Lab4} />
              <Stack.Screen name="SavedImage" component={SavedImage} />
            </Stack.Navigator>
          </NavigationContainer>
        </Animated.View>
      </ThemeProvider>
    </Provider>
  );
};

export default App;