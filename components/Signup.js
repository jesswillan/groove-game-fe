import React, {useState, useContext} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import userContext from '../context/userContext';
// colour theme
import { buttonTheme, colourTheme } from "../stylesheet";
import axios from "axios";
//axios library function deployed

const Signup = ({ setLogin }) => {
  //different state being set for each variable that will be used
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(userContext);
  const [alertWarning, setAlertWarning] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  //if statement for password and username and user to be truthy
  const handleSignup = () => {
    //check if the username, name is filled up and the password box has minimum 6 characters
    if (password.length >= 6 && username && name) {
      {
        console.log({
          username: username,
          name: name,
          password: password,
        });
        //send the sign-up details to the table in render
        axios
          .post('https://groove-game-be.onrender.com/api/user-signup', {
            username: username,
            name: name,
            password: password,
          })
          //set the fields to blank
          .then(() => {
            setUser(username);
            setUsername('');
            setPassword('');
            setName('');
            console.log('posted sucessfully');
          })
          //catch errors if it cannot be retreived
          .catch((err) => {
            console.log(err);
          });
      }
      //if any fields are missing not filled up, show the alert to indicate which firld need filling
    } else if (!username || !password || !name) {
      setAlertWarning('Please fill out all values');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 6000);
    } else if (password.length < 6) { // checking to see if password field is less than 6 characters
      setAlertWarning(
        'Password must be a minimum of 6 characters. Please try again'
      );
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 6000); // message displayed of error should time out after 6 secs
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
            title="create account"
          />
        </View>
        <Text style={styles.textCentre}>
          already have an account?
          <Text onPress={() => setLogin(true)} style={styles.switch}>
            {'\n'}
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

// styling of the page fro the sigup section
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
