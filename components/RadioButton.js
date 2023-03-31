import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { colourTheme, buttonTheme, radioButtonUnselected, radioButtonSelected } from "../stylesheet";

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
            style={({pressed}) => [
              pressed === true ? radioButtonSelected : radioButtonUnselected,
            ]}
            onPress={() => selectHandler(item)}
          >
            <Text style={styles.option}>
              {item}
            </Text>
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
  }
});
