// react/hooks
import React, { useContext } from "react";
// react components
import { Text, View, Button, Image } from "react-native";
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
          title="Play Game"
        ></Button>
      </View>
      <Text style={styles.instructions}>
        Click "Play Game" to start playing through the three rounds of mini
        games. Please log in or create an account to be able to add the songs to
        your Spotify playlist at the end of each round.{" "}
      </Text>
      {user ? (
        <>
          <View style={buttonTheme}>
            <Button
              onPress={() => navigation.navigate("quiz")}
              color={
                Platform.OS === "android"
                  ? colourTheme.secondaryColour
                  : "white"
              }
              title="Play Quiz"
            />
          </View>
          <View style={buttonTheme}>
            <Button
              onPress={() => navigation.navigate("leaderboard")}
              color={
                Platform.OS === "android"
                  ? colourTheme.secondaryColour
                  : "white"
              }
              title="Leaderboard"
            />
          </View>
        </>
      ) : (
        ""
      )}

      <Image
        source={require("../img/logo-nobg.png")}
        style={[
          { opacity: 0.2 },
          { position: "absolute", zIndex: -1 },
          styles.backgroundImg,
        ]}
      />
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
    marginLeft: "auto",
    marginRight: "auto",
  },

  welcome: {
    color: colourTheme.white,
    justifyContent: "center",
    marginTop: 50,
    textAlign: "center",
    fontSize: 26,
  },
  grooveGame: {
    color: colourTheme.white,
    justifyContent: "center",
    marginTop: 50,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
  instructions: {
    color: colourTheme.white,
    justifyContent: "center",
    marginTop: 50,
    textAlign: "center",
    fontSize: 20,
  },
  backgroundImg: {
    marginTop: 120,
  },
});
