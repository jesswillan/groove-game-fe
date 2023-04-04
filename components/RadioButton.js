import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import { radioButtonUnselected, radioButtonSelected } from "../stylesheet";

export default function RadioButton({ data, onSelect }) {
  const selectHandler = (value) => {
    onSelect(value);
  };

  return (
    <View>
      {data.map((item) => {
        return (
          <Pressable
            key={item}
            style={({ pressed }) => [
              pressed === true ? radioButtonSelected : radioButtonUnselected,
            ]}
            onPress={() => selectHandler(item)}
          >
            {item === "hip_hop" ? (
              <Text style={styles.option}>hip hop</Text>
            ) : (
              <Text style={styles.option}>{item}</Text>
            )}
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
});
