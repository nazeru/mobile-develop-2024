// index.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useAppContext } from '@/components/AppContext';

const Stopwatch: React.FC = () => {
    const context = useAppContext();

    if (!context) {
        return <Text style={styles.errorText}>Ошибка контекста</Text>;
    }

    const { isDarkTheme } = context;
    
    
    const [seconds, setSeconds] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        } else if (!isRunning && seconds !== 0) {
            clearInterval(interval);
        }

        
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning, seconds]);

    const resetStopwatch = () => {
        setSeconds(0); 
        setIsRunning(false); 
    };

    return (
        <View style={isDarkTheme ? styles.containerDark : styles.containerLight}>
            <Text style={isDarkTheme ? styles.timerTextDark : styles.timerTextLight}>
                {new Date(seconds * 1000).toISOString().substr(11, 8)}
            </Text>
            <View style={styles.buttonContainer}>
                <Button title={isRunning ? "СТОП" : "НАЧАТЬ"} onPress={() => setIsRunning(!isRunning)} />
                <Button title="СБРОСИТЬ" onPress={resetStopwatch} />
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
    timerTextLight: {
        fontSize: 48,
        marginBottom: 20,
        color: '#000',
    },
    timerTextDark: {
        fontSize: 48,
        marginBottom: 20,
        color: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default Stopwatch;
