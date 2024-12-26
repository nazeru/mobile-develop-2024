import React, { useState, useEffect } from 'react';
import { Button, SafeAreaView, Image, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRandomImage } from '../store';

const Lab2 = () => {
  const imageUrl = useSelector((state) => state.app.imageUrl);
  const dispatch = useDispatch();

  const getData = () => {
    dispatch(fetchRandomImage());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          margin: 20,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 300, height: 300 }}
            resizeMode="contain"
          />
        ) : null}
        <Button
          title="Случайная страница с КОТшибкой"
          onPress={() => {
            getData();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Lab2;
