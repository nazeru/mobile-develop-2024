// screens/Home.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import useTheme from '../hooks/useTheme';
import ThemedText from '../components/ThemedText'; // Импорт нового компонента

const menuItems = [
  { id: 1, title: 'Lab1' },
  { id: 2, title: 'Lab2' },
  { id: 3, title: 'Lab3' },
  { id: 4, title: 'Lab4' },
];

function LabHeader({ colors }) {
  return (
    <View style={styles.headerContainer}>
      <ThemedText style={styles.headerText}>
        Laboratory Work{'\n'}
        Nikiforov Arsen{'\n'}
        FIIT-21
      </ThemedText>
    </View>
  );
}



function LabButton({ title, onPress, colors }) {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        {
          borderColor: colors.border,
          backgroundColor: colors.buttonBackground,
          shadowColor: colors.shadow,
        },
      ]}
      onPress={onPress}
    >
      <ThemedText style={[styles.buttonText, { color: colors.buttonText }]}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}


function Home({ navigation }) {
  const colors = useTheme();

  const handleNavigation = (path) => {
    navigation.navigate(path);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LabHeader colors={colors} />
      {menuItems.map((lab) => (
        <LabButton
          key={lab.id}
          title={lab.title}
          onPress={() => handleNavigation(lab.title.replace(' ', ''))}
          colors={colors}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 65,
    paddingVertical: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 30,
    width: '100%', // Устанавливаем ширину контейнера
    alignItems: 'center', // Центруем текст внутри
  },
  headerText: {
    fontSize: 14, // Размер шрифта
    textAlign: 'center', // Выравнивание текста по центру
    fontFamily: 'PixelFont', // Шрифт
    // letterSpacing: -0.2, // Уменьшаем расстояние между буквами
    lineHeight: 30, // Увеличиваем расстояние между строками
    transform: [{ scaleY: 1.4 }], // Вытягиваем текст по высоте
  },
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 20,
    width: '77%',
    paddingVertical: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 12, // Размер шрифта
    textAlign: 'center', // Выравнивание текста по центру
    fontFamily: 'PixelFont', // Шрифт
    // letterSpacing: -0.2, // Уменьшаем расстояние между буквами
    lineHeight: 30, // Увеличиваем расстояние между строками
    transform: [{ scaleY: 1.4 }], // Вытягиваем текст по высоте
  },
});



export default Home;
