import React, {useState} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import BoldText from '../components/customs/text/BoldText'
import Tooltip from '../components/customs/Tooltip'
import Title from '../components/customs/Title'
import Container from '../components/customs/Container'

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
})

const Lab2: React.FC = () => {
  const [darkTheme] = useState('#000')
  const [lightTheme] = useState('#FFF')
  const [isDarkThemeOn, setIsDarkThemeOn] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkThemeOn(!isDarkThemeOn)
  }

  return (
    <Container
      style={[{backgroundColor: isDarkThemeOn ? darkTheme : lightTheme}]}>
      <Title
        text="useState"
        style={[{color: isDarkThemeOn ? lightTheme : darkTheme}]}
      />
      <Tooltip />
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: isDarkThemeOn ? darkTheme : lightTheme,
            borderColor: isDarkThemeOn ? lightTheme : darkTheme,
          },
        ]}
        onPress={toggleDarkMode}>
        <BoldText style={{color: isDarkThemeOn ? lightTheme : darkTheme}}>
          Click on me
        </BoldText>
      </TouchableOpacity>
    </Container>
  )
}

export default Lab2
