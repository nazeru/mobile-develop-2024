import { StyleSheet } from "react-native";

export const getStyles = (isDarkTheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkTheme ? "#333" : "#87CEEB",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      alignItems: "center",
      padding: 20,
      backgroundColor: isDarkTheme ? "#c0c0c0" : "#FFFFFF",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },
    title: {
      fontSize: 24,
      color: "#000",
      textAlign: "center",
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#000",
      textAlign: "center",
      marginBottom: 20,
    },
    subContent: {
      alignItems: "center",
      marginTop: 10,
      padding: 10,
    },
    input: {
      alignContent: "center",
      width: 230,
      borderWidth: 1,
      padding: 5,
      textAlign: "center",
      textAlignVertical: "center",
    },
  });
};
