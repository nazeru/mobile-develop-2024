// src/timer.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol'; 

const TimerScreen = () => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isActive, seconds]);

    const handleStart = () => setIsActive(true);
    const handleStop = () => setIsActive(false);
    const handleReset = () => {
        setIsActive(false);
        setSeconds(0);
    };

    return (
        <View style={styles.container}>
            {/* Иконка таймера */}
            <IconSymbol size={48} name="clock.fill" color="black" style={styles.icon} />
            <Text style={styles.timerText}>{seconds} секунд</Text>
            <View style={styles.buttonContainer}>
                <Button title={isActive ? 'Остановить' : 'Запустить'} onPress={isActive ? handleStop : handleStart} />
                <Button title="Сбросить" onPress={handleReset} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    timerText: {
        fontSize: 48,
        marginVertical: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20,
    },
    icon: {
        marginBottom: 20,
    },
});

export default TimerScreen;
