import React, { useState, useContext } from "react";
import { View, Text, Platform } from "react-native";
import { StyleSheet, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
// colour theme
import { colourTheme, buttonTheme } from "../stylesheet";
import axios from "axios";
import userContext from "../context/userContext";
//Above importing the modules and library function from react

//Settign the states and user context
const Login = ({ setLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(userContext);
  //const [alertWarning, setAlertWarning] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // const resetState = () => {
  //   setUsername("");
  //   setPassword("");
  // };

  const handleLogin = () => {
    //declaring a function which will invoke username and password
    const loginObj = {
      username: username,
      password: password,
    };
    axios
    //using axios retieve the user infroamtion from user database. Use callback to set them then concole log the new user
      .post("https://groove-game-be.onrender.com/api/user-login", loginObj)
      .then(() => {
        setUser(username);
        setUsername("");
        setPassword("");
        console.log("logged in");
      })
      //if the user does not exists show error of user not found
      .catch((err) => {
        //setAlertWarning("Invalid Username or password");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 10000); //message to be displayed for 10 sec
        console.log(err);
      });
  };

  return (
    <View>
      <Text style={styles.textCentre}> Login</Text>
      <TextInput
        onChangeText={(text) => setUsername(text)}
        value={username}
        autoCapitalize="none"
        placeholder="Username"
        style={[styles.input, { borderRadius: 5 }]} //Enter the username and password then check them against the database
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        autoCapitalize="none"
        placeholder="Password"
        style={[styles.input, { borderRadius: 5 }]}
      />
      {showAlert ? ( //alert message to show user doesn't exists
        <Text style={styles.textCentre}>Invalid username or password</Text>
      ) : (
        ""
      )}
      <View style={buttonTheme}>
        <Button
          onPress={() => {
            console.log({ username, password });
            handleLogin();
            // resetState();
          }}
          color={
            Platform.OS === "android" ? colourTheme.secondaryColour : "white"
          }
          title="Login"
        />
      </View>
      <Text style={styles.textCentre}>
        Not a Member?
        <Text onPress={() => setLogin(false)} style={styles.switch}>
          {"\n"}Register
        </Text>
      </Text>
    </View>
  );
};

//Style the login page using consistence format
const styles = StyleSheet.create({
  input: {
    height: 50,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 25,
    backgroundColor: colourTheme.white,
    color: "black",
    textAlign: "center",
  },

  textCentre: {
    marginTop: 25,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: colourTheme.white,
  },
  switch: {
    color: colourTheme.highlightPink,
  },
});

export default Login;
