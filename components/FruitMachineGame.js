import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React, { useState } from "react";

export default function FruitMachineGame() {
  const [box1PositionValue] = useState(new Animated.Value(-17));
  const [box2PositionValue] = useState(new Animated.Value(-17));
  const [box3PositionValue] = useState(new Animated.Value(-17));
  const [songSample, setSongSample] = useState([
    "bob",
    "paul",
    "pete",
    "jim",
    "steve",
    "dan",
    "robert",
  ]);

  const moveBox = (boxPositionValue) => {
    console.log(rndNum());
    Animated.timing(boxPositionValue, {
      toValue: rndNum(),
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const translateBox = (boxPositionValue) =>
    boxPositionValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100],
    });

  const rndNum = () => {
    let min = 5;
    let max = 20;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const renderBoxes = () => {
    const boxArr = [];
    for (let i = 0; i < 10; i++) {
      songSample.map((song) => {
        boxArr.push(
          <View
            style={[styles.box]}
            key={
              Math.floor(Math.random() * (5000 - 0 + 1) + 0) +
              song +
              Math.floor(Math.random() * (5000 - 0 + 1) + 0)
            }
          >
            <Text style={styles.text}>{song}</Text>
          </View>
        );
      });
    }
    return boxArr;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.tileContainer}>
        <Animated.View
          style={[
            styles.spinner,
            {
              transform: [{ translateX: translateBox(box1PositionValue) }],
            },
          ]}
        >
          {renderBoxes()}
        </Animated.View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => moveBox(box1PositionValue)}
      >
        <Text>Move</Text>
      </TouchableOpacity>
      <View style={styles.tileContainer}>
        <Animated.View
          style={[
            styles.spinner,
            { transform: [{ translateX: translateBox(box2PositionValue) }] },
          ]}
        >
          {renderBoxes()}
        </Animated.View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => moveBox(box2PositionValue)}
      >
        <Text>Move</Text>
      </TouchableOpacity>
      <View style={styles.tileContainer}>
        <Animated.View
          style={[
            styles.spinner,
            { transform: [{ translateX: translateBox(box3PositionValue) }] },
          ]}
        >
          {renderBoxes()}
        </Animated.View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => moveBox(box3PositionValue)}
      >
        <Text>Move</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 100,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    flexDirection: "row",
    backgroundColor: "lightgrey",
    width: 5000,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 100,
    height: 100,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15,
    width: 100,
    height: 40,
    backgroundColor: "lightgreen",
    borderRadius: 10,
  },
  tileContainer: {
    borderColor: "black",
    backgroundColor: "#f5f0f0",
    width: 300,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  text: {
    color: "white",
  },
});
