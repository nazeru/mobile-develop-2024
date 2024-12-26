import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Lab1 from "./screens/lab1";
import Lab2 from "./screens/lab2";
import Lab3 from "./screens/lab3";
import store from "./redux/store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[styles.tabItem, isFocused && styles.tabItemActive]}
          >
            <Text style={[styles.tabText, isFocused && styles.tabTextActive]}>
              {options.title || route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
          <Tab.Screen
            name="Лаб 1"
            component={Lab1}
            options={{ title: "lab1", headerShown: false }}
          />
          <Tab.Screen
            name="Лаб 2"
            component={Lab2}
            options={{ title: "lab2", headerShown: false }}
          />
          <Tab.Screen
            name="Лаб 3"
            component={Lab3}
            options={{ title: "lab3", headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f0f0f0", // Фон для всего бара
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  tabItem: {
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: "#e0e0e0", // Цвет прямоугольников
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  tabItemActive: {
    backgroundColor: "#d0d0d0", // Цвет активного прямоугольника
  },
  tabText: {
    color: "#555",
    fontSize: 16,
    textAlign: "center",
  },
  tabTextActive: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});
