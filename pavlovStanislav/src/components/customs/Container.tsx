import React, {ReactNode} from 'react'
import {StyleProp, View, ViewStyle} from 'react-native'

const Container: React.FC<{
  style?: StyleProp<ViewStyle>
  children: ReactNode
}> = ({style, children}) => {
  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        },
        style,
      ]}>
      {children}
    </View>
  )
}

export default Container
