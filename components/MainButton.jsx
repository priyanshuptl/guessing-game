import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const MainButton = ({}) => (
  <TouchableOpacity
    style={styles.confirmation}
    activeOpacity={0.8}
    onPress={() => onStartGame(parseInt(selectedNum))}>
    <Text style={styles.confirmationText}>
      Start Game with Number: {selectedNum}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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

export default MainButton;
