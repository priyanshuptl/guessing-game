import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = ({ children, style = {} }) => (
  <View style={{ ...styles.card, ...style }}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    elevation: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    // minHeight: 30,
    maxWidth: '90%',
    width: 300,
  },
});

export default Card;
