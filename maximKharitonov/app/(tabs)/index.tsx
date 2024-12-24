// index.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useAppContext } from '@/components/AppContext';

const Stopwatch: React.FC = () => {
    const context = useAppContext();

    if (!context) {
        return <Text style={styles.errorText}>Ошибка контекста</Text>;
    }

    const { isDarkTheme } = context;

    const [seconds, setSeconds] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [laps, setLaps] = useState<{ lap: number; time: string }[]>([]); 

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        } else {
            clearInterval(interval); 
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning]);

    const recordLap = () => {
        const timeString = new Date(seconds * 1000).toISOString().substr(11, 8);
        setLaps([...laps, { lap: laps.length + 1, time: timeString }]); 
    };

    const resetStopwatch = () => {
        setSeconds(0);
        setIsRunning(false);
        setLaps([]); 
    };

    const handleLeftButtonPress = () => {
        if (isRunning) {
            recordLap(); 
        } else {
            resetStopwatch(); 
        }
    };

    const handleStartStopPress = () => {
        if (isRunning) {
            setIsRunning(false); 
        } else {
            setSeconds(0); 
            setIsRunning(true); 
        }
    };

    return (
        <View style={isDarkTheme ? styles.containerDark : styles.containerLight}>
            <Text style={isDarkTheme ? styles.timerTextDark : styles.timerTextLight}>
                {new Date(seconds * 1000).toISOString().substr(11, 8)}
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleLeftButtonPress}>
                    <Text style={styles.buttonText}>{isRunning ? "ИНТЕРВАЛ" : "СБРОС"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.startButton]} onPress={handleStartStopPress}>
                    <Text style={styles.buttonText}>{isRunning ? "СТОП" : "НАЧАТЬ"}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.lapsContainer}>
                {laps.map(lap => (
                    <Text key={lap.lap} style={isDarkTheme ? styles.lapTextDark : styles.lapTextLight}>
                        Круг {lap.lap}: {lap.time}
                    </Text>
                ))}
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
    button: {
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        flex: 1,
        marginHorizontal: 10,
    },
    resetButton: {
        backgroundColor: 'tomato', 
    },
    startButton: {
        backgroundColor: '#6200ee', 
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    lapsContainer: {
        marginTop: 20,
        width: '80%',
    },
    lapTextLight: {
        color: '#000',
        fontSize: 16,
    },
    lapTextDark: {
        color: '#fff',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default Stopwatch;
