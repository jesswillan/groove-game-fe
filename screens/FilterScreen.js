// react/hooks
import React, { useContext, useState, useEffect } from "react";
// react components
import { View, Button, Text, StyleSheet, Image } from "react-native";
// custom styling objects
import { colourTheme, buttonTheme, defaultPaddinTop } from "../stylesheet";
// imports Radio Button component
import RadioButton from "../components/RadioButton";
// axios for requests
import axios from "axios";
// navigation hook
import { useNavigation, useIsFocused } from "@react-navigation/native";
// global songsGenre context
import songsGenre from "../context/songsGenre";
import songsSelectedArray from "../context/songsSelectedArray";
import globalSongArray from "../context/globalSongArray";

export default function App() {
  // option state
  const [option, setOption] = useState(null);
  // data state
  const [data, setData] = useState([]);
  // chosenGenre setChosenGenre from the songsGenre context
  const { chosenGenre, setChosenGenre } = useContext(songsGenre);
  // invokes hook to allow access to the navigation object
  const navigation = useNavigation();
  // useEffect does a axios request then sets the genres data
  const { songsSelected, setSongsSelected } = useContext(songsSelectedArray);
  const { globalArray, setGlobalArray } = useContext(globalSongArray);

  const isFocused = useIsFocused(); // invocation of the useIsFocused module

  useEffect(() => {
    axios
      .get("https://groove-game-be.onrender.com/api/genres")
      .then(({ data }) => {
        console.log(data.genres);
        setData(data.genres);
      });
  }, []);

  useEffect(() => {
    setSongsSelected([]);
    setGlobalArray([]);
  }, [isFocused]);

  return (
    <View style={[styles.container, defaultPaddinTop]}>
      <Text style={styles.paragraph}>Please Select One Genre: </Text>
      <RadioButton data={data} onSelect={(value) => setChosenGenre(value)} />
      <Text style={styles.options}>
        {" "}
        You've chosen {chosenGenre === "hip_hop" ? "hip hop" : chosenGenre}
      </Text>
      <View style={buttonTheme}>
        <Button
          onPress={() => navigation.navigate("dance")}
          color={
            Platform.OS === "android" ? colourTheme.secondaryColour : "white"
          }
          title="Play the game"
        ></Button>
      </View>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colourTheme.primaryColour,
    padding: 20,
  },
  paragraph: {
    margin: 0,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: colourTheme.white,
  },

  options: {
    margin: 24,
    fontSize: 20,
    textAlign: "center",
    color: colourTheme.white,
  },
  backgroundImg: {
    marginTop: 120,
  },
});
