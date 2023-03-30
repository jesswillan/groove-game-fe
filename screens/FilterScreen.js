import React from "react";
import { View, Button } from "react-native";
import { StyleSheet } from "react-native";
import { colourTheme, buttonTheme } from "../stylesheet";
import { RadioButton } from "react-native-paper";
import { useState } from "react";

const FilterScreen = () => {
  return (
    <View style={styles.container}>
      <View style={buttonTheme}>
        <Button color={colourTheme.white} title="Play"></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colourTheme.primaryColour,
    padding: 20,
  },
});

export default FilterScreen;
