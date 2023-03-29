import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
// colour theme
import { colourTheme } from '../stylesheet';

const Login = ({ setLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const resetState = () => {
    setUsername('');
    setPassword('');
  };
  return (
    <View>
      <Text style={styles.textCentre}> Login</Text>
      <TextInput
        onChangeText={(text) => setUsername(text)}
        value={username}
        placeholder="username"
        style={styles.input}
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="password"
        style={styles.input}
      />
      <View style={styles.loginBtn}>
        <Button
          onPress={() => {
            console.log({ username, password });
            resetState();
          }}
          color={'white'}
          title="login"
        />
      </View>
      <Text style={styles.textCentre}>
        Not a member?
        <Text onPress={() => setLogin(false)} style={styles.switch}>
          Register
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  userBtn: { backgroundColor: colourTheme.white, width: 75 },
  input: {
    height: 50,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 25,
    backgroundColor: colourTheme.white,
    color: 'black',
    textAlign: 'center',
  },
  loginBtn: {
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
  textCentre: {
    marginTop: 25,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: colourTheme.white,
  },
  switch: {
    color: colourTheme.highlightPink,
  },
});

export default Login;
