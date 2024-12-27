import React, {useState} from 'react'
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native'
import BoldText from '../components/customs/text/BoldText'
import {colors} from '../constants/colors.const'
import {useSomeStore} from '../stores/store'
import Tooltip from '../components/customs/Tooltip'
import Title from '../components/customs/Title'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  button: {
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  input: {
    borderRadius: 16,
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: colors.white,
  },
})

const Lab4: React.FC = () => {
  const [input, setInput] = useState('')
  const store = useSomeStore()
  const addToolTip = () => {
    store.setTooltip(input)
    setInput('')
  }

  return (
    <View style={[styles.container]}>
      <Title text="State Management" />
      <Tooltip />
      <View style={styles.controls}>
        <TextInput
          style={styles.input}
          onChangeText={text => setInput(text)}
          value={input}></TextInput>
        <TouchableOpacity style={styles.button} onPress={addToolTip}>
          <BoldText>Добавить</BoldText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Lab4
