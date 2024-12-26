import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Lab1 from "./Screens/Lab1";
import Lab2 from "./Screens/Lab2";
import Lab3 from "./Screens/Lab3";
import Lab4 from "./Screens/Lab4";
import Lab4_2 from "./Screens/Lab4_2";
import store from "./store/store";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              switch (route.name) {
                case "Лабораторная 1":
                  iconName = focused ? "text" : "text-outline";
                  break;
                case "Лабораторная 2":
                  iconName = focused
                    ? "document-text"
                    : "document-text-outline";
                  break;
                case "Лабораторная 3":
                  iconName = focused ? "leaf" : "leaf-outline";
                  break;
                case "Задачи":
                  iconName = focused ? "list" : "list-outline";
                  break;
                case "Завершённые задачи":
                  iconName = focused ? "checkbox" : "checkbox-outline";
                  break;
                default:
                  aa;
                  iconName = "ellipse";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#ffffff", // Цвет активной иконки
            tabBarInactiveTintColor: "#87CEEB", // Цвет неактивной иконки
            tabBarStyle: {
              backgroundColor: "#007AFF", // Цвет фона панели навигации (синий)
              borderTopWidth: 0, // Убирает верхнюю границу
            },
            headerStyle: {
              backgroundColor: "#007AFF", // Синий фон заголовка
            },
            headerTintColor: "#ffffff", // Белый цвет текста заголовка
            headerTitleStyle: {
              fontWeight: "bold", // Полужирный текст заголовка
            },
          })}
        >
          <Tab.Screen name="Лабораторная 1" component={Lab1} />
          <Tab.Screen name="Лабораторная 2" component={Lab2} />
          <Tab.Screen name="Лабораторная 3" component={Lab3} />
          <Tab.Screen name="Задачи" component={Lab4} />
          <Tab.Screen name="Завершённые задачи" component={Lab4_2} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
