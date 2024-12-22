// WheatherScreen
import React, { useEffect, useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Button,
    Modal,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import axios from 'axios';
import { useAppContext } from '@/components/AppContext'; 

const API_KEY = '7c6b17f0cd7a80b5b2aaa1ba44838279';

const CITY_DATA = [
    { name: 'Якутск,ru' },
    { name: 'Москва,ru' },
    { name: 'Санкт-Петербург,ru' },
    { name: 'Новосибирск,ru' },
    { name: 'Екатеринбург,ru' },
    { name: 'Казань,ru' },
    { name: 'Нижний Новгород,ru' },
    { name: 'Челябинск,ru' },
    { name: 'Омск,ru' },
];

const WheatherScreen: React.FC = () => {
    const { currentCity, setCurrentCity, isDarkTheme } = useAppContext(); 
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null); 

    const fetchWeather = async () => {
        setLoading(true);
        setError(null); 
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=metric`);
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError('Не удалось загрузить данные о погоде.'); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [currentCity]);

    const weatherDescription = useMemo(() => {
        if (!weatherData) return '';
        return `Температура: ${weatherData.main.temp}°C, ${weatherData.weather[0].description}`;
    }, [weatherData]);

    const handleCityChange = (city: string) => {
        setCurrentCity(city);
        setModalVisible(false);
    };

    return (
        <View style={isDarkTheme ? styles.containerDark : styles.containerLight}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
                <Text style={styles.error}>{error}</Text> 
            ) : (
                <>
                    <Text style={styles.title}>{`Погода в ${currentCity.split(',')[0]}`}</Text>
                    <Text style={styles.weather}>{weatherDescription}</Text>
                    <View style={styles.buttonContainer}>
                        <Button title="Сменить город" onPress={() => setModalVisible(true)} />
                    </View>
                    <Modal visible={modalVisible} animationType="slide">
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>Выберите город</Text>
                            <FlatList
                                data={CITY_DATA}
                                keyExtractor={(item) => item.name}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleCityChange(item.name)} style={styles.cityItem}>
                                        <Text style={styles.cityText}>{item.name.split(',')[0]}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                            <Button title="Закрыть" onPress={() => setModalVisible(false)} />
                        </View>
                    </Modal>
                </>
            )}
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
        fontWeight: 'bold',
        marginBottom: 20,
    },
    weather: {
        fontSize: 18,
        marginBottom: 20,
    },
    error: {
        color: 'red',
        marginBottom: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', 
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cityItem: {
        padding: 10,
    },
    cityText: {
        fontSize: 18,
    },
    buttonContainer: {
        marginTop: 20,
    },
});

export default WheatherScreen;
