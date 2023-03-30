import React, { useContext } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
// components
import Login from "../components/Login";
import Signup from "../components/Signup";
// hooks
import { useState } from "react";
// colour theme
import { colourTheme } from "../stylesheet";
import userContext from "../context/userContext";
import UserProfile from "../components/UserProfile";

const UserLoginScreen = () => {
  const [login, setLogin] = useState(true);
  const { user, setUser } = useContext(userContext);

  return (
    <View style={styles.container}>
      {user !== "" ? (
        <UserProfile />
      ) : login ? (
        <Login setLogin={setLogin} />
      ) : (
        <Signup setLogin={setLogin} />
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
