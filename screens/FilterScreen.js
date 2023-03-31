// react/hooks
import React, { useContext, useState, useEffect } from "react";
// react components
import { View, Button, Text, StyleSheet } from "react-native";
// custom styling objects
import { colourTheme, buttonTheme, defaultPaddinTop } from "../stylesheet";
//
import RadioButton from "../components/RadioButton";
// axios for requests
import axios from "axios";
// navigation hook
import { useNavigation } from "@react-navigation/native";
// global songsGenre context
import songsGenre from "../context/songsGenre";

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
  useEffect(() => {
    axios
      .get("https://groove-game-be.onrender.com/api/genres")
      .then(({ data }) => {
        console.log(data.genres);
        setData(data.genres);
      });
  }, []);

  return (
    <View style={[styles.container, defaultPaddinTop]}>
      <Text style={styles.paragraph}>Please Select One Genre: </Text>
      <RadioButton data={data} onSelect={(value) => setChosenGenre(value)} />
      <Text style={styles.options}> Your option: {option}</Text>
      <View style={buttonTheme}>
        <Button
          onPress={() => navigation.navigate("dance")}
          color={colourTheme.white}
          title="Play the game"
        ></Button>
      </View>
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
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: colourTheme.white,
  },

  options: {
    margin: 24,
    fontSize: 12,
    textAlign: "left",
    color: colourTheme.white,
  },

  startBtn: {
    backgroundColor: colourTheme.secondaryColour,
    borderRadius: 10,
    borderWidth: 3,
    color: colourTheme.secondaryColour,
  },
});
