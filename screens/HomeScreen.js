// react/hooks
import React, { useContext, useEffect } from "react";
// react components
import { Text, View, Button, Image } from "react-native";
// global userContext
import userContext from "../context/userContext";
// StyleSheet component to create styles object
import { StyleSheet } from "react-native";
// custom styling objects
import { colourTheme, defaultPaddinTop, buttonTheme } from "../stylesheet";
// navigation hook
import { useNavigation, useIsFocused } from "@react-navigation/native";
import globalSongArray from "../context/globalSongArray";
import songsSelectedArray from "../context/songsSelectedArray";

export default HomeScreen = () => {
  // grabs the user and setUser values from the userContext
  const { user, setUser } = useContext(userContext);
  // invokes hook to allow access to the navigation object
  const { songsSelected, setSongsSelected } = useContext(songsSelectedArray);
  const { globalArray, setGlobalArray } = useContext(globalSongArray);
  // global context imports
  const navigation = useNavigation();

  const isFocused = useIsFocused(); // invocation of the useIsFocused module

  useEffect(() => {
    // This will clear global state when home screen is the focused screen
    setGlobalArray([]);
    setSongsSelected([]);
  }, [isFocused]);

  return (
    <View style={[styles.container, defaultPaddinTop]}>
      {user ? (
        <Text style={{ color: "white" }}>logged in as: {user}</Text>
      ) : (
        <Text></Text>
      )}

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
        Click "Play Game" to filter your results by genre, then play the game
        rounds to create your playlist. Please log in or create an account to be
        able to add the songs to your Spotify playlist at the end of each round,
        and to play the quiz!{" "}
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
