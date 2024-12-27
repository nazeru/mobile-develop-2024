// SettingsScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAppContext } from '@/components/AppContext';

const SettingsScreen: React.FC = () => {
    const { isDarkTheme, toggleTheme } = useAppContext();

    return (
        <View style={isDarkTheme ? styles.containerDark : styles.containerLight}>
            <Text style={styles.title}>Настройки</Text>
            <Button title="Сменить тему" onPress={toggleTheme} />
        </View>
    );
};

const styles = StyleSheet.create({
    containerLight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    containerDark: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default SettingsScreen;
