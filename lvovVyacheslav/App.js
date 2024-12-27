import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Image, StyleSheet, View } from 'react-native';
import Lab1 from './screens/Lab1';
import Lab2 from './screens/Lab2';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#D7E3FC' }, // Верхний заголовок
          headerTintColor: '#000',
          tabBarStyle: {
            backgroundColor: '#D7E3FC', // Фон панели навигации
            height: 52, // Общая высота панели навигации
            justifyContent: 'center',
          },
          tabBarShowLabel: false, // Убирает подписи под иконками
        }}
      >
        <Tab.Screen
          name="Lab1"
          component={Lab1}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <Image
                  source={require('./assets/Tapa.png')} // Иконка для Lab1
                  style={[
                    styles.icon,
                    focused && styles.iconFocused,
                    (styles.height = 12),
                  ]}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Lab2"
          component={Lab2}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <Image
                  source={require('./assets/Spis.png')} // Иконка для Lab2
                  style={[styles.icon, focused && styles.iconFocused]}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    height: 52, // Высота контейнера под иконку
    justifyContent: 'center', // Вертикальное центрирование
    alignItems: 'center', // Горизонтальное центрирование
    marginTop: 10,
  },
  icon: {
    width: 44, // Ширина иконки
    height: 44, // Высота иконки
    tintColor: '#555', // Цвет неактивной иконки
    resizeMode: 'contain', // Сохраняет пропорции иконки
  },
  iconFocused: {
    tintColor: '#0000FF', // Цвет активной иконки
  },
});
