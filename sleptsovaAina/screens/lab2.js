import React, { useState, useEffect } from 'react'
import { View, Image, TouchableOpacity, Text } from 'react-native'
import {styles} from '../styles/StylesLab2'

const Lab2 = () => {
  const [randomImage, setRandomImage] = useState('https://dog.ceo/api/breeds/image/random')

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch('https://dog.ceo/api/breeds/image/random')
      setRandomImage(response.url)
    };
    fetchImage()
  }, [])

  const getRandomImage = async () => {
    const response = await fetch('https://dog.ceo/api/breeds/image/random')
    setRandomImage(response.url)
  }

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <View style={{width:"100%"}}>
          <Text style={styles.text}>Lab Two</Text>
        </View>
      </View>

      {randomImage && <Image source={{ uri: randomImage }} style={styles.image} />}
      
      <TouchableOpacity style={styles.button} onPress={getRandomImage}>
        <Text style={styles.buttontext}>Generate Random  Dog Image</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Lab2;