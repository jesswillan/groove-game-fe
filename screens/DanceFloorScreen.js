import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colourTheme } from "../stylesheet";

const DanceFloorScreen = () => {
  return (
    (
      <View>
        <View style={styles.square1}></View>
      </View>
    ),
    (
      <View>
        <View style={styles.square2}></View>
      </View>
    )

  );
};

const styles = StyleSheet.create({
  square1: {
    width: 100,
    height: 100,
    marginLeft: 10,
    backgroundColor: "blue",
  },
  square2: {
    width: 100,
    height: 100,
    backgroundColor: "pink",
  },
  square3: {
    width: 100,
    height: 100,
    backgroundColor: "green",
  },
  square4: {
    width: 100,
    height: 100,
    backgroundColor: "yellow",
  },
});

export default DanceFloorScreen;
