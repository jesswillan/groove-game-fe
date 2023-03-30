import React, { useState, useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import userContext from "../context/userContext";
// colour theme
import { colourTheme } from "../stylesheet";
import axios from "axios";

const Signup = ({ setLogin }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(userContext);

  const handleSignup = () => {
    console.log({
      username: username,
      name: name,
      password: password,
    });
    axios
      .post("https://groove-game-be.onrender.com/api/user-signup", {
        username: username,
        name: name,
        password: password,
      })
      .then(() => {
        setUser(username);
        setUsername("");
        setPassword("");
        setName("");
        console.log("posted sucessfully");
      })
      .catch((err) => {
        console.log(err);
      });
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
            handleSignup();
          }}
          color={
            Platform.OS === "android" ? colourTheme.secondaryColour : "white"
          }
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
  userBtn: { backgroundColor: colourTheme.white, width: 75 },
  input: {
    height: 50,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 25,
    backgroundColor: colourTheme.white,
    color: "black",
    textAlign: "center",
  },
  loginBtn: {
    marginTop: 25,
    backgroundColor: colourTheme.secondaryColour,
    borderColor: colourTheme.white,
    borderWidth: 2,
    width: 250,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
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

export default Signup;
