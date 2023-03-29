import React from 'react';

import {Text, View, Button, Image} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet} from 'react-native';
import {colourTheme, buttonTheme} from '../stylesheet';

//make sure to export function, not export default

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to {'\n'} <Text style={styles.grooveGame}>Groove Game</Text>
      </Text>
      <View style={buttonTheme}>
        <Button color={colourTheme.white} title="Play the game"></Button>
      </View>
      <Text style={styles.instructions}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Cursus sit amet
        dictum sit amet justo donec enim diam. Quisque sagittis purus sit amet
        volutpat consequat mauris nunc congue. Eget gravida cum sociis natoque
        penatibus et. Aenean vel elit scelerisque mauris pellentesque pulvinar
        pellentesque habitant.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colourTheme.primaryColour,
    padding: 20,
  },
  welcome: {
    color: colourTheme.white,
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
    textAlign: 'center',
    fontSize: 26,
  },
  grooveGame: {
    color: colourTheme.white,
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },
  instructions: {
    color: colourTheme.white,
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default HomeScreen;
