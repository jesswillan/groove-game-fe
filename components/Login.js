import React, { useState, useContext } from "react";
import { View, Text, Platform } from "react-native";
import { StyleSheet, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
// colour theme
import { colourTheme, buttonTheme } from "../stylesheet";
import axios from "axios";
import userContext from "../context/userContext";

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
    const loginObj = {
      username: username,
      password: password,
    };
    axios
      .post("https://groove-game-be.onrender.com/api/user-login", loginObj)
      .then(() => {
        setUser(username);
        setUsername("");
        setPassword("");
        console.log("logged in");
      })
      .catch((err) => {
        //setAlertWarning("Invalid Username or password");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 10000);
        console.log(err);
      });
  };

  return (
    <View>
      <Text style={styles.textCentre}> Login</Text>
      <TextInput
        onChangeText={(text) => setUsername(text)}
        value={username}
        placeholder="Username"
        style={[styles.input, {borderRadius: 5}]}
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        style={[styles.input, {borderRadius: 5}]}
      />
      {showAlert ? (
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
