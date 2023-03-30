import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { colourTheme, buttonTheme } from "../stylesheet";
import { useState, useEffect } from "react";
import RadioButton from "../components/RadioButton";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";

export default function App() {
  const [option, setOption] = useState(null);
  const [data, setData] = useState([]);

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
    <View style={styles.container}>
      <Text style={styles.paragraph}>Please Select One Genre: </Text>
      <RadioButton data={data} onSelect={(value) => setOption(value)} />
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

//export default FilterScreen;
