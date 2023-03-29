import React from 'react';
import { Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
// components
import Login from '../components/Login';
import Signup from '../components/Signup';
// hooks
import { useState } from 'react';

//navigation passed through props

const UserLoginScreen = ({ navigation }) => {
  const [login, setLogin] = useState(true);
  return (
    <View style={styles.container}>
      {login ? <Login setLogin={setLogin} /> : <Signup setLogin={setLogin} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3C3B72',
    justifyContent: 'center',
  },
});

export default UserLoginScreen;
