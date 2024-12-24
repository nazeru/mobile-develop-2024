// SettingsScreen.tsx
import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useAppContext } from '@/components/AppContext';

const SettingsScreen: React.FC = () => {
    const { isDarkTheme, toggleTheme } = useAppContext();

    return (
        <View style={isDarkTheme ? styles.containerDark : styles.containerLight}>
            <TouchableOpacity style={styles.button} onPress={toggleTheme}>
                <Text style={styles.buttonText}>Сменить тему</Text>
            </TouchableOpacity>
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
    button: {
        backgroundColor: '#6200ee', 
        borderRadius: 10, 
        paddingVertical: 15,
        paddingHorizontal: 30,
        elevation: 5,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginTop: 20, 
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default SettingsScreen;
