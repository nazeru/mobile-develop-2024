// screens/Lab3.js
import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import useTheme from '../hooks/useTheme';

const { width } = Dimensions.get('window');

const OPERATIONS = ['+', '-', '*', '/'];
const MAX_LEVEL = 5;
const MAX_MISTAKES = 3;

const CalculatorButton = ({ value, onPress, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{value}</Text>
  </TouchableOpacity>
);

const ButtonRow = ({ values, onKeyPress }) => (
  <View style={styles.buttonRow}>
    {values.map((value, index) => (
      <CalculatorButton key={index} value={value} onPress={() => onKeyPress(value)} />
    ))}
  </View>
);

const Lab3 = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [mistakes, setMistakes] = useState(0);
  const colors = useTheme();

  const generateProblem = useCallback((level) => {
    const operation = OPERATIONS[Math.floor(Math.random() * OPERATIONS.length)];
    let num1, num2;
    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * (20 * level)) + 1;
        num2 = Math.floor(Math.random() * (20 * level)) + 1;
        break;
      case '-':
        num1 = Math.floor(Math.random() * (20 * level)) + 1;
        num2 = Math.floor(Math.random() * num1) + 1;
        break;
      case '*':
        num1 = Math.floor(Math.random() * (10 * level)) + 1;
        num2 = Math.floor(Math.random() * (10 * level)) + 1;
        break;
      case '/':
        num2 = Math.floor(Math.random() * (10 * level)) + 1;
        num1 = num2 * (Math.floor(Math.random() * (10 * level)) + 1);
        break;
    }
    return { num1, num2, operation };
  }, []);

  const calculateAnswer = useCallback((problem) => {
    const { num1, num2, operation } = problem;
    switch (operation) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num1 / num2;
      default:
        return 0;
    }
  }, []);

  const memoizedProblem = useMemo(() => {
    if (!currentProblem) {
      const newProblem = generateProblem(level);
      setCurrentProblem(newProblem);
      return newProblem;
    }
    return currentProblem;
  }, [level, currentProblem, generateProblem]);

  const handleKeyPress = useCallback(
    (key) => {
      ReactNativeHapticFeedback.trigger('selection');
      if (key === '⌫') {
        setUserAnswer(userAnswer.slice(0, -1));
      } else if (userAnswer.length < 8) {
        setUserAnswer(userAnswer + key);
      }
    },
    [userAnswer]
  );

  const checkAnswer = useCallback(() => {
    const memoizedAnswer = calculateAnswer(memoizedProblem);
    const userAnswerNum = parseFloat(userAnswer);

    if (Math.abs(userAnswerNum - memoizedAnswer) < 0.01) {
      ReactNativeHapticFeedback.trigger('notificationSuccess');
      setScore(score + level * 10);
      if (level < MAX_LEVEL) {
        setLevel(level + 1);
      } else {
        setGameOver(true);
      }
      setCurrentProblem(null);
    } else {
      ReactNativeHapticFeedback.trigger('notificationError');
      setMistakes(mistakes + 1);
      if (mistakes + 1 >= MAX_MISTAKES) {
        setGameOver(true);
      }
    }
    setUserAnswer('');
  }, [userAnswer, memoizedProblem, level, score, mistakes, calculateAnswer]);

  const restartGame = useCallback(() => {
    setLevel(1);
    setScore(0);
    setGameOver(false);
    setCurrentProblem(null);
    setUserAnswer('');
    setMistakes(0);
  }, []);

  if (gameOver) {
    return (
      <View style={[styles.calculatorContainer, { backgroundColor: colors.background }]}>
        <View style={styles.scoreBoard}>
          <Text style={[styles.pixelText, { color: colors.text }]}>Score: {score}</Text>
          <Text style={[styles.pixelText, { color: colors.text }]}>Mistakes: {mistakes}</Text>
          <Text style={[styles.pixelText, { color: colors.text }]}>Game Over!</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.answerButton,
            { backgroundColor: colors.buttonBackground, borderColor: colors.border }
          ]}
          onPress={restartGame}
        >
          <Text style={[styles.pixelText, { color: colors.buttonText }]}>Restart</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.calculatorContainer, { backgroundColor: colors.background }]}>
      <View style={styles.topRow}>
        <View style={styles.scoreBoard}>
          <Text style={[styles.pixelText, { color: colors.text }]}>Score: {score}</Text>
          <Text style={[styles.pixelText, { color: colors.text }]}>
            Mistakes: {mistakes}/{MAX_MISTAKES}
          </Text>
        </View>
        <Text style={[styles.pixelText, { color: colors.text }]}>Level: {level}</Text>
      </View>

      <View style={styles.equationContainer}>
        <Text style={[styles.equationText, { color: colors.text }]}>
          {memoizedProblem.num1} {memoizedProblem.operation} {memoizedProblem.num2} = ?
        </Text>
      </View>

      <View style={styles.resultDisplay}>
        <Text style={[styles.resultText, { color: colors.text }]}>
          {userAnswer || '___'}
        </Text>
      </View>

      <View style={styles.keypadContainer}>
        <ButtonRow values={['7', '8', '9']} onKeyPress={handleKeyPress} />
        <ButtonRow values={['4', '5', '6']} onKeyPress={handleKeyPress} />
        <ButtonRow values={['1', '2', '3']} onKeyPress={handleKeyPress} />

        <View style={styles.bottomRow}>
          <CalculatorButton value="." onPress={() => handleKeyPress('.')} />
          <CalculatorButton value="0" onPress={() => handleKeyPress('0')} />
          <CalculatorButton value="⌫" onPress={() => handleKeyPress('⌫')} />
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.answerButton,
          { backgroundColor: colors.buttonBackground, borderColor: colors.border }
        ]}
        onPress={checkAnswer}
      >
        <Text style={[styles.pixelText, { color: colors.buttonText }]}>Answer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  calculatorContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  scoreBoard: {
    flexDirection: 'column',
  },
  pixelText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'PixelFont',
  },
  equationContainer: {
    marginBottom: 10,
    marginTop: 50,
  },
  equationText: {
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'PixelFont',
  },
  resultDisplay: {
    marginBottom: 20,
    marginTop: 20,
  },
  resultText: {
    fontSize: 50,
    textAlign: 'center',
    fontFamily: 'PixelFont',
  },
  keypadContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000',
    minHeight: 55,
    minWidth: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 24,
    fontFamily: 'PixelFont',
  },
  answerButton: {
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 55,
    minWidth: 95,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Lab3;