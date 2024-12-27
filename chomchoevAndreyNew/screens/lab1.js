import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Lab1 = () => {
    const [count, setCount] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.counterText}>Счетчик: {count}</Text>
            <TouchableOpacity style={styles.button} onPress={() => setCount(count + 1)}>
                <Text style={styles.buttonText}>Увеличить</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2f3136', // Темный фон, как в Discord
        padding: 20,
    },
    counterText: {
        fontSize: 30,
        fontWeight: 'bold', // Жирный шрифт для текста
        marginBottom: 30,
        color: '#fff', // Белый текст для контраста на темном фоне
    },
    button: {
        backgroundColor: '#7289da', // Основной цвет Discord (синий)
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30, // Округлые углы, как у кнопок в Discord
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff', // Белый цвет для текста на кнопке
        fontSize: 20,
        fontWeight: '600', // Утолщенный шрифт для кнопки
        textAlign: 'center',
    },
});

export default Lab1;