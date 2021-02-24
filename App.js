import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [chosenNum, setChosenNum] = useState(0);
  const [numOfRounds, setNumOfRounds] = useState(0);
  const [guessesComponent, setGuessesComponent] = useState();

  const startGameHandler = (selectedNum) => {
    setChosenNum(selectedNum);
    setNumOfRounds(0);
  };

  const replayHandler = () => {
    setChosenNum(0);
    setNumOfRounds(0);
  };

  const screen = numOfRounds ? (
    <GameOverScreen
      numOfRounds={numOfRounds}
      onReplay={replayHandler}
      guessesComponent={guessesComponent}
    />
  ) : chosenNum ? (
    <GameScreen
      chosenNum={chosenNum}
      onGameOver={(rounds, guessesComp) => {
        setNumOfRounds(rounds);
        setGuessesComponent(guessesComp);
      }}
    />
  ) : (
    <StartGameScreen onStartGame={startGameHandler} />
  );

  return (
    <View style={styles.container}>
      <Header title='Guessing Game' />
      {screen}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
