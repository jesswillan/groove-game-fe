import React, {useState, useContext} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import userContext from '../context/userContext';
// colour theme
import {buttonTheme, colourTheme} from '../stylesheet';
import axios from 'axios';

const Signup = ({setLogin}) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {user, setUser} = useContext(userContext);
  const [alertWarning, setAlertWarning] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  //if statement for password and username and user to be truthy
  const handleSignup = () => {
    if (password.length >= 6 && username && name) {
      {
        console.log({
          username: username,
          name: name,
          password: password,
        });
        axios
          .post('https://groove-game-be.onrender.com/api/user-signup', {
            username: username,
            name: name,
            password: password,
          })
          .then(() => {
            setUser(username);
            setUsername('');
            setPassword('');
            setName('');
            console.log('posted sucessfully');
          })
          .catch((err) => {
            console.log(err);
          });
      }
      //if any fields are missing, show the alert
    } else if (!username || !password || !name) {
      setAlertWarning('Please fill out all values');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 10000);
    } else if (password.length < 6) {
      setAlertWarning(
        'Password must be a minimum of 6 characters. Please try again'
      );
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 10000);
    }
  };

  return (
    <View>
      <Text style={styles.textCentre}> Signup</Text>
      <TextInput
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder="name"
        style={[styles.input, {borderRadius: 5}]}
      />
      <TextInput
        onChangeText={(text) => setUsername(text)}
        value={username}
        placeholder="username"
        style={[styles.input, {borderRadius: 5}]}
      />

      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="password"
        style={[styles.input, {borderRadius: 5}]}
      />

      {showAlert ? <Text style={styles.textCentre}>{alertWarning} </Text> : ''}
      <View>
        <View style={buttonTheme}>
          <Button
            onPress={() => {
              handleSignup();
            }}
            color={
              Platform.OS === 'android' ? colourTheme.secondaryColour : 'white'
            }
            title="Create Account"
          />
        </View>
        <Text style={styles.textCentre}>
          Already have an account?
          <Text onPress={() => setLogin(true)} style={styles.switch}>
            {'\n'}
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userBtn: {backgroundColor: colourTheme.white, width: 75},
  input: {
    height: 50,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 25,
    backgroundColor: colourTheme.white,
    color: 'black',
    textAlign: 'center',
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
  min: {
    color: colourTheme.highlightPink,
  },
});

export default Signup;
