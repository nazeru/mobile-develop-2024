import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import useThemeStore from "../store/themeStore";
import { useState } from "react";

const colors = ["black", "red", "blue"];

const Lab1 = () => {
  const { isDarkTheme, toggleTheme } = useThemeStore();
  const [colorIndex, setColorIndex] = useState(0);

  const themeStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkTheme ? "#121212" : "#ffffff",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      backgroundColor: colors[colorIndex],
      padding: 10,
      borderRadius: 120,
      marginTop: 10,
    },
    buttonText: {
      color: "#ffffff",
    },
    themeSwitchButton: {
      position: "absolute",
      top: 10,
      right: 10,
      backgroundColor: isDarkTheme ? "#121212" : "#ffffff",
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: isDarkTheme ? "#ffffff" : "#121212",
    },
    themeSwitchButtonText: {
      color: isDarkTheme ? "#ffffff" : "#121212",
    },
  };

  return (
    <SafeAreaView style={themeStyles.container}>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            backgroundColor: colors[colorIndex],
            width: 100,
            height: 100,
            borderRadius: 120,
          }}
        />
        <TouchableOpacity
          onPress={() => setColorIndex((colorIndex + 1) % colors.length)}
          style={themeStyles.button}
        >
          <Text style={themeStyles.buttonText}>Press me!</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={toggleTheme}
        style={themeStyles.themeSwitchButton}
      >
        <Text style={themeStyles.themeSwitchButtonText}>Сменить тему</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Lab1;
