// react/hooks
import React, { useContext } from "react";
// react components
import { Text, View, Button } from "react-native";
// global userContext
import userContext from "../context/userContext";
// StyleSheet component to create styles object
import { StyleSheet } from "react-native";
// custom styling objects
import { colourTheme, defaultPaddinTop, buttonTheme } from "../stylesheet";
// navigation hook
import { useNavigation } from "@react-navigation/native";

export default HomeScreen = () => {
  // grabs the user and setUser values from the userContext
  const { user, setUser } = useContext(userContext);
  // invokes hook to allow access to the navigation object
  const navigation = useNavigation();

  return (
    <View style={[styles.container, defaultPaddinTop]}>
      <Text style={{ color: "white" }}>logged in as: {user}</Text>
      <Text style={styles.welcome}>
        Welcome to {"\n"} <Text style={styles.grooveGame}>Groove Game</Text>
      </Text>
      <View style={buttonTheme}>
        <Button
          onPress={() => navigation.navigate("Game")}
          color={
            Platform.OS === "android" ? colourTheme.secondaryColour : "white"
          }
          title="Play the game"
        ></Button>
      </View>
      <Text style={styles.instructions}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Cursus sit amet
        dictum sit amet justo donec enim diam. Quisque sagittis purus sit amet
        volutpat consequat mauris nunc congue. Eget gravida cum sociis natoque
        penatibus et. Aenean vel elit scelerisque mauris pellentesque pulvinar
        pellentesque habitant.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // checks device if android padding added based on statusBar heiht if ios padding top is 40
  default: defaultPaddinTop,
  container: {
    flex: 1,
    backgroundColor: colourTheme.primaryColour,
    padding: 20,
  },

  welcome: {
    color: colourTheme.white,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
    textAlign: "center",
    fontSize: 26,
  },
  grooveGame: {
    color: colourTheme.white,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
  instructions: {
    color: colourTheme.white,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
    textAlign: "center",
    fontSize: 20,
  },
});
