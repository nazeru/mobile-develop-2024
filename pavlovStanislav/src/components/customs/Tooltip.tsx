import React from 'react'
import {TouchableOpacity, View} from 'react-native'

import {useSomeStore} from '../../stores/store'
import RegularText from './text/RegularText'
import {colors} from '../../constants/colors.const'
import XMark from '../icons/XMark'

const Tooltip: React.FC = () => {
  const store = useSomeStore()

  if (store.isVisible && store.tooltip) {
    return (
      <View
        style={{
          borderRadius: 8,
          padding: 8,
          margin: 8,
          flexDirection: 'row',
          top: 16,
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          backgroundColor: colors.lightLilac,
        }}>
        <RegularText>{store.tooltip}</RegularText>
        <TouchableOpacity onPress={() => store.hideTooltip()}>
          <XMark />
        </TouchableOpacity>
      </View>
    )
  }

  return null
}

export default Tooltip
