import React from 'react'
import BoldText from './text/BoldText'
import {StyleProp, TextStyle} from 'react-native'

const Title: React.FC<{text: string; style?: StyleProp<TextStyle>}> = ({
  text,
  style,
}) => {
  return (
    <BoldText style={[{fontSize: 20, position: 'absolute', top: 16}, style]}>
      {text}
    </BoldText>
  )
}

export default Title
