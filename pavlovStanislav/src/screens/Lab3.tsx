import React, {useState, useMemo} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import BoldText from '../components/customs/text/BoldText'
import MediumText from '../components/customs/text/MediumText'
import SemiBoldText from '../components/customs/text/SemiBoldText'
import {colors} from '../constants/colors.const'
import Tooltip from '../components/customs/Tooltip'
import Title from '../components/customs/Title'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  button: {
    backgroundColor: colors.gray,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
})

const expensiveFunction = (x: number) => {
  for (let i = 0; i < 100000000; i++) {
    x++
  }
  return x
}

const Lab3: React.FC = () => {
  const [num, setNum] = useState(0)
  const [memoNum, setMemoNum] = useState(0)
  const [timeToIterate, setTimeToIterate] = useState(0)
  const [timeToIterateWithMemo, setTimeToIterateWithMemo] = useState(0)
  const [isIterating, setIsIterating] = useState(false)

  const measurePerformance = (callback: () => number, isMemo: boolean) => {
    const startTime = performance.now()
    const callbackResult = callback()
    const endTime = performance.now()

    if (isMemo) {
      setTimeToIterateWithMemo(Math.round(endTime - startTime))
    } else {
      setTimeToIterate(Math.round(endTime - startTime))
    }

    return new Promise<number>(resolve => {
      resolve(callbackResult)
    })
  }

  const iterate = () => {
    setIsIterating(true)
    measurePerformance(() => expensiveFunction(0), false).then(result => {
      setNum(result)
      setIsIterating(false)
    })
  }
  const memoizeExpensiveFunction = useMemo(() => {
    return expensiveFunction(0)
  }, [])

  const iterateWithMemo = () => {
    setIsIterating(true)
    measurePerformance(() => memoizeExpensiveFunction, false).then(result => {
      setMemoNum(result)
      setIsIterating(false)
    })
  }

  const clearState = () => {
    setNum(0)
    setMemoNum(0)
  }

  return (
    <View style={styles.container}>
      <Title text="useMemo" />
      <Tooltip />
      <View style={{flexDirection: 'row'}}>
        <View style={{margin: 10}}>
          <BoldText>Without memo</BoldText>
          <SemiBoldText>{num}</SemiBoldText>
          <SemiBoldText>
            {num ? `Iteration time: ${timeToIterate}ms` : ''}
          </SemiBoldText>
          <TouchableOpacity
            style={styles.button}
            disabled={isIterating}
            onPress={iterate}>
            <MediumText>Click to run</MediumText>
          </TouchableOpacity>
        </View>
        <View style={{margin: 10}}>
          <BoldText>With memo</BoldText>
          <SemiBoldText>{memoNum}</SemiBoldText>
          <SemiBoldText>
            {memoNum ? `Iteration time: ${timeToIterateWithMemo}ms` : ''}
          </SemiBoldText>
          <TouchableOpacity
            style={styles.button}
            disabled={isIterating}
            onPress={() => iterateWithMemo()}>
            <MediumText>Click to run</MediumText>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={clearState}>
        <MediumText>Clear state</MediumText>
      </TouchableOpacity>
    </View>
  )
}

export default Lab3
