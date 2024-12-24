// TimerScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppContext } from '@/components/AppContext';
import { Picker } from '@react-native-picker/picker'; 

const TimerScreen: React.FC = () => {
    const { isDarkTheme } = useAppContext();

    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [seconds, setSeconds] = useState<number>(0);
    const [pickedHours, setPickedHours] = useState<number>(0);
    const [pickedMinutes, setPickedMinutes] = useState<number>(0);
    const [pickedSeconds, setPickedSeconds] = useState<number>(0);

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
        const totalSeconds = pickedHours * 3600 + pickedMinutes * 60 + pickedSeconds;
        setSeconds(totalSeconds);
        setIsRunning(true);
    };

    const resetTimer = () => {
        setSeconds(0);
        setIsRunning(false);
        setPickedHours(0);
        setPickedMinutes(0);
        setPickedSeconds(0);
    };

    return (
        <View style={isDarkTheme ? styles.containerDark : styles.containerLight}>
            <Text style={[styles.timer, { color: isDarkTheme ? '#fff' : '#000' }]}>
                {String(Math.floor(seconds / 3600)).padStart(2, '0')}:
                {String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')}:
                {String(seconds % 60).padStart(2, '0')}
            </Text>

            <View style={styles.pickerContainer}>
                <View style={styles.pickerWrapper}>
                    <Text style={[styles.label, { color: isDarkTheme ? '#fff' : '#000' }]}>Часы</Text>
                    <Picker
                        selectedValue={pickedHours}
                        onValueChange={(itemValue: number) => setPickedHours(itemValue)}
                        style={styles.picker}
                    >
                        {[...Array(24).keys()].map((hour) => (
                            <Picker.Item key={hour} label={`${hour}`} value={hour} />
                        ))}
                    </Picker>
                </View>

                <View style={styles.pickerWrapper}>
                    <Text style={[styles.label, { color: isDarkTheme ? '#fff' : '#000' }]}>Минуты</Text>
                    <Picker
                        selectedValue={pickedMinutes}
                        onValueChange={(itemValue: number) => setPickedMinutes(itemValue)}
                        style={styles.picker}
                    >
                        {[...Array(60).keys()].map((minute) => (
                            <Picker.Item key={minute} label={`${minute}`} value={minute} />
                        ))}
                    </Picker>
                </View>

                <View style={styles.pickerWrapper}>
                    <Text style={[styles.label, { color: isDarkTheme ? '#fff' : '#000' }]}>Секунды</Text>
                    <Picker
                        selectedValue={pickedSeconds}
                        onValueChange={(itemValue: number) => setPickedSeconds(itemValue)}
                        style={styles.picker}
                    >
                        {[...Array(60).keys()].map((second) => (
                            <Picker.Item key={second} label={`${second}`} value={second} />
                        ))}
                    </Picker>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.resetButton} 
                    onPress={resetTimer}>
                    <Text style={styles.buttonText}>СБРОС</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.startStopButton} 
                    onPress={() => {
                        if (isRunning) {
                            setIsRunning(false);
                        } else {
                            startTimer();
                        }
                    }}
                >
                    <Text style={styles.buttonText}>{isRunning ? "СТОП" : "НАЧАТЬ"}</Text>
                </TouchableOpacity>
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
    timer: {
        fontSize: 48,
        marginBottom: 20,
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    pickerWrapper: {
        width: 80,
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    startStopButton: {
        backgroundColor: '#6200ee',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flex: 1, 
        marginLeft: 10, 
    },
    resetButton: {
        backgroundColor: 'tomato',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flex: 1, 
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default TimerScreen;
