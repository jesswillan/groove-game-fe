import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const Signup = ({ setLogin }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const resetState = () => {
    setName('');
    setUsername('');
    setPassword('');
  };

  return (
    <View>
      <Text style={styles.textCentre}> Signup</Text>
      <TextInput
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder="name"
        style={styles.input}
      />
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
            console.log({ name, username, password });
            resetState();
          }}
          color={'white'}
          title="create account"
        />
      </View>
      <Text style={styles.textCentre}>
        already have an account?
        <Text onPress={() => setLogin(true)} style={styles.switch}>
          login
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  userBtn: { backgroundColor: 'white', width: 75 },
  input: {
    height: 50,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 25,
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'center',
  },
  loginBtn: {
    marginTop: 25,
    backgroundColor: '#6261b7',
    borderColor: 'white',
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
    color: 'white',
  },
  switch: {
    color: 'red',
  },
});

export default Signup;
