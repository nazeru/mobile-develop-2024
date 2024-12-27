import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../components/ThemeContext"; // Импорт контекста темы

const BackArrow = ({ navigation }) => {
  const { darkTheme } = useTheme(); // Получаем текущую тему

  return (
    <TouchableOpacity
      style={styles.arrowContainer}
      onPress={() => {
        if (navigation && navigation.goBack) {
          navigation.goBack();
        } else {
          console.error("Navigation object is undefined in BackArrow.");
        }
      }}
    >
      <Svg width={35} height={35} viewBox="0 0 35 35" fill="none">
        <Path
          d="M22.6552 5.12604L10.2812 17.5L22.6552 29.874L24.7188 27.8119L14.4054 17.5L24.7188 7.18812L22.6552 5.12604Z"
          fill={darkTheme ? "white" : "black"} // Меняем цвет стрелки в зависимости от темы
        />
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  arrowContainer: {
    marginTop: 60,
    marginLeft: 19,
  },
});

export default BackArrow;