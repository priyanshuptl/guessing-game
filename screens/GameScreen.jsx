import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Colors from '../constants/colors';
import Card from '../components/Card';
import { MaterialIcons } from '@expo/vector-icons';
// import { ScreenOrientation } from 'expo';

const guessNewNum = (min = 1, max = 99, exclude = 0) => {
  const num = Math.round(
    Math.random() * (Math.ceil(max) - Math.floor(min)) + Math.floor(min)
  );
  return num !== exclude ? num : guessNewNum(min, max, exclude);
};

const GameScreen = ({ chosenNum, onGameOver }) => {
  const initialGuess = guessNewNum(1, 99, chosenNum);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guesses, setGuesses] = useState([
    { id: '' + initialGuess, guess: initialGuess },
  ]);

  useEffect(() => {
    if (currentGuess === chosenNum) {
      Alert.alert(
        'Game Over!',
        currentGuess + ' is the correct guess.',
        [
          {
            text: 'Ok',
            onPress: () => onGameOver(guesses.length, pastGuessesComponent),
          },
        ],
        {
          cancelable: true,
          onDismiss: () => onGameOver(guesses.length, pastGuessesComponent),
        }
      );
    }
  }, [currentGuess]);

  const min = useRef(1);
  const max = useRef(99);

  const takeNewGuessHandler = (isLesser = false) => {
    if (
      (isLesser && currentGuess < chosenNum) ||
      (!isLesser && currentGuess > chosenNum)
    ) {
      Alert.alert(
        "Don't cheat!",
        "You know that's wrong",
        [
          {
            text: 'Okay, Sorry!',
          },
        ],
        {
          cancelable: true,
        }
      );
      return;
    }

    if (isLesser) {
      max.current = currentGuess - 1;
    } else {
      min.current = currentGuess + 1;
    }
    const newGuess = guessNewNum(min.current, max.current, currentGuess);
    setCurrentGuess(newGuess);
    setGuesses((prevGuesses) => [
      { id: '' + newGuess, guess: newGuess },
      ...prevGuesses,
    ]);
  };

  const pastGuessesComponent = (
    <View style={styles.guessList}>
      <FlatList
        ListHeaderComponent={() => (
          <Text style={styles.guessListHeaderText}>Past Guesses</Text>
        )}
        ListHeaderComponentStyle={styles.guessListHeader}
        data={guesses}
        renderItem={({ item }) => (
          <Card style={styles.guessItem}>
            <Text style={styles.guessItemText}>{item.guess}</Text>
          </Card>
        )}
      />
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Card style={styles.card}>
          <Text style={styles.title}>Computers Guess</Text>
          <View style={styles.numContainer}>
            <Text style={styles.num}>{currentGuess}</Text>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => takeNewGuessHandler(true)}>
              <MaterialIcons name='remove' size={30} color='white' />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => takeNewGuessHandler(false)}>
              <MaterialIcons name='add' size={30} color='white' />
            </TouchableOpacity>
          </View>
        </Card>
        {pastGuessesComponent}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    alignItems: 'center',
    padding: 20,
    margin: 20,
    height: 250,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
  },
  numContainer: {
    borderWidth: 3,
    borderColor: Colors.primary,
    borderRadius: 5,
    padding: 10,
  },
  num: {
    fontSize: 30,
  },
  controls: {
    flexDirection: 'row',
    width: '80%',
    maxWidth: '100%',
    justifyContent: 'space-between',
  },
  button: {
    minWidth: 90,
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
  },
  guessList: {
    // marginVertical: 10
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
  },
  guessListHeader: {
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    padding: 2,
    marginBottom: 5,
  },
  guessListHeaderText: {
    fontSize: 20,
    color: 'white',
  },
  guessItem: {
    margin: 5,
    alignItems: 'center',
    padding: 5,
    alignSelf: 'center',
    elevation: 5,
  },
  guessItemText: {
    fontSize: 15,
  },
});

export default GameScreen;
