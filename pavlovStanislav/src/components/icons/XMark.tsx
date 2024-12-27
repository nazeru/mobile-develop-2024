import React from 'react'
import Svg, {Path} from 'react-native-svg'
import {Icon} from '../../interfaces/icon.interface'

const XMark: React.FC<Icon> = () => {
  return (
    <Svg fill="none" width={24} height={24} stroke="currentColor">
      <Path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </Svg>
  )
}

export default XMark
