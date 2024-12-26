import React, { useState, useMemo, useEffect } from 'react';
import { Button, SafeAreaView, View, Text, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setSortOrder } from '../store';

const Lab3 = () => {
    const dispatch = useDispatch();
    const sortOrder = useSelector((state) => state.app.sortOrder);
    const [items, setItems] = useState([
        'Яблоко',
        'Банан',
        'Апельсин',
        'Персик',
        'Ананас',
        'Клубника',
    ]);

    const [key, setKey] = useState(0);
    const [sortTime, setSortTime] = useState(null);
    const [timeWithoutMemo, setTimeWithoutMemo] = useState(null);

    const sortedItems = useMemo(() => {
        const start = Date.now();  // Начало замера времени
        const sorted = [...items].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.localeCompare(b);
            } else {
                return b.localeCompare(a);
            }
        });
        const end = Date.now();  // Конец замера времени
        setSortTime(end - start);
        return sorted;
    }, [sortOrder, items]);

    const sortedItemsWithoutMemo = () => {
        const start = Date.now();
        const sorted = [...items].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.localeCompare(b);
            } else {
                return b.localeCompare(a);
            }
        });
        const end = Date.now();
        setTimeWithoutMemo(end - start);
        return sorted;
    };

    useEffect(() => {
        setKey((prevKey) => prevKey + 1);
        
        sortedItemsWithoutMemo();

    }, [sortOrder]);

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }} key={key}>
            <View>
                <Text>Сортировка:</Text>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Button title="По возрастанию" onPress={() => dispatch(setSortOrder('asc'))} />
                    <Button title="По убыванию" onPress={() => dispatch(setSortOrder('desc'))} />
                </View>
                
                <Text>Время сортировки с useMemo: {sortTime} мс</Text>
                <Text>Время сортировки без useMemo: {timeWithoutMemo} мс</Text>

                <FlatList
                    data={sortedItems}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    renderItem={({ item }) => <Text>{item}</Text>}
                />
            </View>
        </SafeAreaView>
    );
};

export default Lab3;
