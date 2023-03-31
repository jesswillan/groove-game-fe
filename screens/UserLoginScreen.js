// react/hooks
import React, { useContext, useState } from "react";
// react components
import { View } from "react-native";
// StyleSheet component to create react styles object
import { StyleSheet } from "react-native";
// components
import Login from "../components/Login";
import Signup from "../components/Signup";
import UserProfile from "../components/UserProfile";
// colour theme
import { colourTheme } from "../stylesheet";
// global userContext
import userContext from "../context/userContext";

const UserLoginScreen = () => {
  // login state
  const [login, setLogin] = useState(true);
  // grabs the user and setUser values from the userContext
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
