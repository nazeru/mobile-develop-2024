// TimerScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useAppContext } from '@/components/AppContext';

const TimerScreen: React.FC = () => {
    const { isDarkTheme } = useAppContext();

    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [seconds, setSeconds] = useState<number>(0);
    const [inputTime, setInputTime] = useState<number>(0); 

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        if (isRunning && seconds > 0) {
            intervalId = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
        } else if (seconds === 0) {
            setIsRunning(false);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning, seconds]);

    const startTimer = () => {
        setSeconds(inputTime); 
        setIsRunning(true);
    };

    const resetTimer = () => {
        setSeconds(0);
        setIsRunning(false);
        setInputTime(0); 
    };

    return (
        <View style={isDarkTheme ? styles.containerDark : styles.containerLight}>
            <Text style={styles.title}>Таймер</Text>
            <Text style={styles.timer}>
                {new Date(seconds * 1000).toISOString().substr(11, 8)}
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Введите время в секундах"
                keyboardType="numeric"
                value={inputTime ? inputTime.toString() : ''}
                onChangeText={text => setInputTime(Number(text))}
            />
            <View style={styles.buttonContainer}>
                <Button title={isRunning ? "СТОП" : "НАЧАТЬ"} onPress={startTimer} disabled={isRunning && seconds === 0} />
                <Button title="СБРОСИТЬ" onPress={resetTimer} />
            </View>
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
    timer: {
        fontSize: 48,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        width: '80%',
        color: '#000', 
        backgroundColor: '#fff', 
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
});

export default TimerScreen;
