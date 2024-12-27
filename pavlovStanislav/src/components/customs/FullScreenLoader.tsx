import React from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import {colors} from '../../constants/colors.const'

const FullScreenLoader: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
      }}>
      <ActivityIndicator />
    </View>
  )
}

export default FullScreenLoader
