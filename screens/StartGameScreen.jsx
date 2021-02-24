import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Card from '../components/Card';

import Colors from '../constants/colors';

const StartGameScreen = ({ onStartGame }) => {
  const [enteredNumber, setEnteredNumber] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNum, setSelectedNum] = useState();

  const enterNumberHandler = (num) => {
    setEnteredNumber(num.replace(/[^0-9]/g, ''));
    setConfirmed(false);
  };

  const resetNumberHandler = (num) => {
    setEnteredNumber('');
    setConfirmed(false);
  };

  const confirmNumberHandler = () => {
    const chosenNum = parseInt(enteredNumber);
    if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
      Alert.alert(
        'Invalid Entry',
        'Enter a number between 1 to 99',
        [
          {
            text: 'Okay',
            style: 'destructive',
            onPress: resetNumberHandler,
          },
        ],
        { cancelable: true, onDismiss: resetNumberHandler }
      );
      return;
    }
    setConfirmed(true);
    setEnteredNumber('');
    setSelectedNum(chosenNum);
    Keyboard.dismiss();
  };

  let chosenOutput;

  if (confirmed) {
    chosenOutput = (
      <TouchableOpacity
        style={styles.confirmation}
        activeOpacity={0.8}
        onPress={() => onStartGame(parseInt(selectedNum))}>
        <Text style={styles.confirmationText}>
          Start Game with Number: {selectedNum}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <Text style={{ fontSize: 20 }}>Start a New Game!</Text>
            <Card style={styles.card}>
              <Text>Enter a Number</Text>
              <TextInput
                style={styles.inputBox}
                keyboardType='number-pad'
                maxLength={2}
                value={enteredNumber}
                onChangeText={enterNumberHandler}
              />
              <View style={styles.controls}>
                <View style={styles.button}>
                  <Button
                    title='Reset'
                    color={Colors.secondary}
                    onPress={resetNumberHandler}
                  />
                </View>
                <View style={styles.button}>
                  <Button
                    title='Confirm'
                    color={Colors.primary}
                    onPress={confirmNumberHandler}
                  />
                </View>
              </View>
            </Card>
            {chosenOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  card: {
    alignItems: 'center',
    padding: 20,
    minHeight: 175,
    maxWidth: '80%',
    width: 300,
    justifyContent: 'space-evenly',
  },
  inputBox: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    minWidth: '80%',
    marginHorizontal: 10,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    width: '80%',
    maxWidth: '100%',
    justifyContent: 'space-between',
  },
  button: {
    minWidth: 90,
  },
  confirmation: {
    backgroundColor: Colors.primary,
    width: '80%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 30,
    elevation: 15,
  },
  confirmationText: {
    fontSize: 22,
    color: 'white',
  },
});

export default StartGameScreen;
