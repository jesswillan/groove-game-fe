import React from 'react';

import { Text, View, Button, Image } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';
import {colourTheme} from '../stylesheet'

//make sure to export function, not export default

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.playlistButton}>
      <Button color={colourTheme.white} title='Play the game'></Button>
      </View>
      <Text style={styles.instructions}>Welcome to Groove Game</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colourTheme.primaryColour,
    justifyContent: 'center',
  },
  playlistButton: {
    marginTop: 25,
    backgroundColor: colourTheme.secondaryColour,
    borderColor: colourTheme.white,

    borderWidth: 2,
    width: 250,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  instructions: {
    color: colourTheme.white,
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  }
});

export default HomeScreen;
