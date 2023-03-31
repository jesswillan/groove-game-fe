import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { colourTheme, buttonTheme } from "../stylesheet";
import { useState, useEffect } from "react";
import RadioButton from "../components/RadioButton";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import songsGenre from "../context/songsGenre";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [option, setOption] = useState(null);
  const [data, setData] = useState([]);
  const { chosenGenre, setChosenGenre } = useContext(songsGenre);

  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get("https://groove-game-be.onrender.com/api/genres")
      .then(({ data }) => {
        console.log(data.genres);
        setData(data.genres);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.paragraph}>Please Select One Genre: </Text>
        <RadioButton data={data} onSelect={(value) => setChosenGenre(value)} />
        <Text style={styles.options}> You've chosen {chosenGenre}</Text>
        <View style={buttonTheme}>
          <Button
            onPress={() => navigation.navigate('dance')}
            color={colourTheme.white}
            title="Play the game"
          ></Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colourTheme.primaryColour,
    padding: 20,
  },
  paragraph: {
    margin:0,
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

  startBtn: {
    backgroundColor: colourTheme.secondaryColour,
    borderRadius: 10,
    borderWidth: 3,
    color: colourTheme.secondaryColour,
  },
});

//export default FilterScreen;
