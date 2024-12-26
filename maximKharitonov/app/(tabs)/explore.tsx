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

const Explore: React.FC = () => {
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentCity, setCurrentCity] = useState<string>(CITY_DATA[0].name); 
    const [modalVisible, setModalVisible] = useState<boolean>(false); 

    const fetchWeather = async () => {
        setLoading(true); 
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=metric`);
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
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
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <Text style={styles.title}>Погода в {currentCity.split(',')[0]}</Text>
                    <Text style={styles.weather}>{weatherDescription}</Text>
                    <Button title="Сменить город" onPress={() => setModalVisible(true)} />

                    {/* Модальное окно для выбора города */}
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    weather: {
        fontSize: 18,
        marginBottom: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    cityItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    cityText: {
        fontSize: 18,
    },
});

export default Explore;
