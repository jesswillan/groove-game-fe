import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
// components
import Login from "../components/Login";
import Signup from "../components/Signup";
// hooks
import { useState } from "react";
// colour theme
import { colourTheme } from "../stylesheet";

const UserLoginScreen = ({ user, setUser }) => {
  const [login, setLogin] = useState(true);
  return (
    <View style={styles.container}>
      {login ? (
        <Login setLogin={setLogin} user={user} setUser={setUser} />
      ) : (
        <Signup setLogin={setLogin} user={user} setUser={setUser} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colourTheme.primaryColour,
    justifyContent: "center",
  },
});

export default UserLoginScreen;
