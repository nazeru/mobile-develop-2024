// screens/Lab1.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCounter } from '../store/store';
import useTheme from '../hooks/useTheme';
import Bubble from '../components/Bubble';

const { width, height } = Dimensions.get('window');

function InfoBox({ colors }) {
  return (
    <View style={[styles.infoBox, { borderColor: colors.border, backgroundColor: colors.buttonBackground }]}>
      <Text style={[styles.infoText, { color: colors.buttonText }]}>Info</Text>
    </View>
  );
}

const Lab1 = () => {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const colors = useTheme();

  const addBubble = useCallback(() => {
    const id = Date.now() + Math.random();
    setBubbles((prevBubbles) => [...prevBubbles, { id }]);
  }, []);

  const removeBubble = useCallback((id) => {
    setBubbles((prevBubbles) => prevBubbles.filter((bubble) => bubble.id !== id));
  }, []);

  const onDrag = useCallback(() => {
    setScore((prevScore) => prevScore + 5);
    dispatch(incrementCounter());
  }, [dispatch]);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(addBubble, 2000);
      return () => clearInterval(interval);
    }
  }, [addBubble, gameOver]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGameOver(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const resetGame = () => {
    setBubbles([]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerSection}>
        <View style={styles.scoreContainer}>
          <Text style={[styles.scoreText, { color: colors.text }]}>
            Score: {score}
            {'\n'}
            Counter: {counter}
          </Text>
        </View>
        <TouchableOpacity style={styles.infoButton} onPress={() => setModalVisible(true)}>
          <InfoBox colors={colors} />
        </TouchableOpacity>
      </View>
      {!gameOver && (
        <TouchableOpacity style={styles.touchable} onPress={addBubble}>
          {bubbles.map((bubble) => (
            <Bubble
              key={bubble.id}
              id={bubble.id}
              removeBubble={removeBubble}
              onDrag={onDrag}
              gameOver={gameOver}
            />
          ))}
        </TouchableOpacity>
      )}

      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={[styles.modalContainer, { backgroundColor: colors.secondary }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>How to Play</Text>
            <Text style={[styles.modalText, { color: colors.text }]}>
              Create bubbles and drag them to earn points!
            </Text>
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {gameOver && (
        <View style={[styles.gameOverContainer, { backgroundColor: colors.secondary }]}>
          <Text style={[styles.gameOverText, { color: colors.text }]}>Game Over!</Text>
          <Text style={[styles.finalScoreText, { color: colors.text }]}>
            Your Score: {score}
          </Text>
          <TouchableOpacity style={styles.restartButton} onPress={resetGame}>
            <Text style={styles.restartButtonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 21,
    paddingRight: 21,
    paddingTop: 40,
    paddingBottom: 142,
    alignItems: 'stretch',
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30, // Отступ сверху для опускания HUD
  },
  scoreContainer: {
    lineHeight: 28,
  },
  scoreText: {
    fontSize: 14,
    fontFamily: 'PixelFont',
    textAlign: 'center',
    lineHeight: 30,
    transform: [{ scaleY: 1.2 }],
  },
  infoButton: {
    padding: 10,
  },
  touchable: {
    flex: 1,
  },
  infoBox: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 34,
    paddingVertical: 3,
    lineHeight: 30,
    transform: [{ scaleY: 1.2 }],
  },
  infoText: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'PixelFont',
    lineHeight: 30,
    transform: [{ scaleY: 1.2 }],
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContainer: {
    width: 320,
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 14,
    fontFamily: 'PixelFont',
    textAlign: 'center',
    lineHeight: 30,
    transform: [{ scaleY: 1.2 }],
  },
  modalText: {
    fontSize: 12,
    fontFamily: 'PixelFont',
    textAlign: 'center',
    lineHeight: 30,
    transform: [{ scaleY: 1.2 }],
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#03DAC6',
  },
  closeButtonText: {
    fontSize: 12,
    fontFamily: 'PixelFont',
    textAlign: 'center',
    lineHeight: 30,
    transform: [{ scaleY: 1.2 }],
  },
  gameOverContainer: {
    position: 'absolute',
    top: height / 3,
    left: width / 6,
    right: width / 6,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 14,
    fontFamily: 'PixelFont',
    textAlign: 'center',
    lineHeight: 30,
    transform: [{ scaleY: 1.2 }],
  },
  finalScoreText: {
    fontSize: 12,
    fontFamily: 'PixelFont',
    textAlign: 'center',
    lineHeight: 30,
    transform: [{ scaleY: 1.2 }],
  },
  restartButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#03DAC6',
  },
  restartButtonText: {
    fontSize: 12,
    fontFamily: 'PixelFont',
    textAlign: 'center',
    lineHeight: 30,
    transform: [{ scaleY: 1.2 }],
  },
});

export default Lab1;
