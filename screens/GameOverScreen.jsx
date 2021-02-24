import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import colors from '../constants/colors';

const GameOverScreen = ({ numOfRounds = 0, onReplay, guessesComponent }) => (
  <View style={styles.screen}>
    <Text style={styles.gameOverText}>Game over in {numOfRounds} Rounds!</Text>
    <View style={styles.button}>
      <Button title='Replay' onPress={onReplay} />
    </View>
    {!!guessesComponent && guessesComponent}
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 25,
    // color: colors.secondary,
    fontWeight: 'bold',
  },
  button: {
    width: '70%',
    margin: 30,
  },
});

export default GameOverScreen;
