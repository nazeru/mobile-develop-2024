// WeatherScreen.tsx
import React, { useEffect, useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Modal,
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

const WeatherScreen: React.FC = () => {
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
        return weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1); 
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
                <View style={styles.weatherContainer}>
                    <Text style={[styles.title, isDarkTheme && styles.titleDark]}>{currentCity.split(',')[0]}</Text>
                    <Text style={[styles.temperature, isDarkTheme && styles.temperatureDark]}>{`${weatherData.main.temp}°C`}</Text>
                    <Text style={[styles.weather, isDarkTheme && styles.weatherDark]}>{weatherDescription}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                        <Text style={styles.buttonText}>Сменить город</Text>
                    </TouchableOpacity>
                    <Modal visible={modalVisible} animationType="slide">
                        <View style={isDarkTheme ? styles.modalContainerDark : styles.modalContainerLight}>
                            <Text style={styles.modalTitle}>Выберите город</Text>
                            <FlatList
                                data={CITY_DATA}
                                keyExtractor={(item) => item.name}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleCityChange(item.name)} style={styles.cityItem}>
                                        <Text style={[styles.cityText, { color: isDarkTheme ? '#fff' : '#000' }]}>{item.name.split(',')[0]}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Закрыть</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
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
    weatherContainer: {
        alignItems: 'center', 
        marginBottom: 30, 
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#000', 
        textAlign: 'center',
    },
    temperature: {
        fontSize: 48, 
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#000', 
        textAlign: 'center',
    },
    weather: {
        fontSize: 20, 
        marginBottom: 20,
        textAlign: 'center',
        color: '#222',
    },
    error: {
        color: 'red',
        marginBottom: 20,
        fontSize: 18,
    },
    modalContainerLight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    modalContainerDark: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2b2b2b', 
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000', 
    },
    cityItem: {
        padding: 10,
        width: '100%',
        alignItems: 'center',
    },
    cityText: {
        fontSize: 18,
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
    titleDark: {
        color: '#fff',
    },
    temperatureDark: {
        color: '#fff',
    },
    weatherDark: {
        color: '#fff',
    },
});

export default WeatherScreen;
