import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { colourTheme } from "../stylesheet";

export default function RadioButton({ data, onSelect }) {
  const [userOption, setUserOption] = useState(null);
  const selectHandler = (value) => {
    onSelect(value);
    setUserOption(value);
  };

  return (
    <View>
      {data.map((item) => {
        return (
          <Pressable
            key={item}
            style={
              //Line 5
              item.value === userOption ? styles.selected : styles.unselected
            } /*Add style here */ //Line 7
            onPress={() => selectHandler(item)}
          >
            {/* add style here */}
            <Text style={styles.option}>{item}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  unselected: {
    backgroundColor: "red",
    margin: 5,
  },
  selected: {
    backgroundColor: "blue",
    margin: 6,
    padding: 10,
    borderRadius: 10,
  },
});
