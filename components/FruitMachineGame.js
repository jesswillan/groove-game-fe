import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Button,
  Image,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import globalSongArray from "../context/globalSongArray";
import { buttonTheme, colourTheme } from "../stylesheet";
import GameOver from "./GameOver";
import songsSelectedArray from "../context/songsSelectedArray";
import { ScrollView } from "react-native-gesture-handler";
// the code above handles importing external libraries and importing modules

export default function FruitMachineGame() {
  const [box1PositionValue] = useState(new Animated.Value(0));
  const [box2PositionValue] = useState(new Animated.Value(0)); // the variables here determine the start position of the animations for each tile
  const [box3PositionValue] = useState(new Animated.Value(0));

  const [count, setCount] = useState(0); // counts the times users have spun the wheels
  const [isBox1Spun, setIsBox1Spun] = useState(false);
  const [isBox2Spun, setIsBox2Spun] = useState(false);
  const [isBox3Spun, setIsBox3Spun] = useState(false); // bool flags for checking if the tile has been spun

  const [isRoundOver, setIsRoundOver] = useState(false); // checks if the round has ended
  const { globalArray, setGlobalArray } = useContext(globalSongArray); // global state for holding the songs for the game
  const [selectedSongs, setSelectedSongs] = useState([]); // songs selected by the user for this round
  const [isGameOver, setIsGameOver] = useState(false); // checks if the game has ended
  const { songsSelected, setSongsSelected } = useContext(songsSelectedArray);

  const rndNum = () => {
    // this function will generate a random number between 1 and 49
    let min = 1; // the number is then rounded to a number compliant with 1.2
    let max = 49; // multiples of 1.2 are needed to center the tiles
    let rndNum = Math.floor(Math.random() * (max - min) + min);
    let roundedNum = Math.ceil(rndNum / 1.2) * 1.2;
    return Math.ceil(roundedNum / 1.2) * 1.2;
  };

  let randomValue = rndNum();
  let tile1LandingPosition;
  let tile2LandingPosition; // initializing variables for use within the movebox function
  let tile3LandingPosition;
  const moveBox = (boxPositionValue) => {
    if (boxPositionValue === box1PositionValue) {
      // this part of the function determines which wheel
      tile1LandingPosition = randomValue; // is being spun
    } else if (boxPositionValue === box2PositionValue) {
      tile2LandingPosition = randomValue;
    } else if (boxPositionValue === box3PositionValue) {
      tile3LandingPosition = randomValue;
    }
    // tile1LandingPosition number === index value of global array;
    let t1Song = tile1LandingPosition / 1.2; // divides the landing position by 1.2
    let t2Song = tile2LandingPosition / 1.2;
    let t3Song = tile3LandingPosition / 1.2;
    setSelectedSongs((currentSongs) => {
      // this function will add the song to the global array
      if (boxPositionValue === box1PositionValue) {
        return [
          ...currentSongs,
          globalArray[Math.floor(t1Song)].track_artist[0].name, // index position is determined by the tile landing position
        ];
      } else if (boxPositionValue === box2PositionValue) {
        return [
          ...currentSongs,
          globalArray[Math.floor(t2Song)].track_artist[0].name,
        ];
      } else if (boxPositionValue === box3PositionValue) {
        return [
          ...currentSongs,
          globalArray[Math.floor(t3Song)].track_artist[0].name,
        ];
      }
    });
    setSongsSelected((currentSongs) => {
      if (boxPositionValue === box1PositionValue) {
        return [...currentSongs, globalArray[Math.floor(t1Song)]];
      } else if (boxPositionValue === box2PositionValue) {
        return [...currentSongs, globalArray[Math.floor(t2Song)]];
      } else if (boxPositionValue === box3PositionValue) {
        return [...currentSongs, globalArray[Math.floor(t3Song)]];
      }
    });
    if (count >= 2) {
      // if the count is more than two, the round is over
      setTimeout(() => {
        // the timeout function will mean text revealing song names will render
        console.log("round over"); // 3500ms after the last wheel has been spun
        setIsRoundOver(true);
      }, 3500);
    }
    setCount((previous) => {
      return previous + 1; // the count increases when the user spins a wheel
    });
    Animated.timing(boxPositionValue, {
      // animation module for the wheels
      toValue: randomValue,
      duration: 3000, // duration in milliseconds for the wheel to spin
      useNativeDriver: true,
    }).start();
  };
  const translateBox = (
    boxPositionValue // the translation values for the animation module
  ) =>
    boxPositionValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100],
    });
  const renderBoxes = () => {
    // generates the songs when the component is rendered
    const reversedGlobal = globalArray.slice().reverse(); // the global array is reversed
    const boxArr = []; // this is so that the index position generated by moveBox is positive
    for (let i = 0; i < 2; i++) {
      reversedGlobal.map((song) => {
        // maps over the reversed global array
        boxArr.push(
          <View
            style={[styles.songImgBox]}
            key={
              Math.floor(Math.random() * (5000 - 0 + 1) + 0) + // this is to avoid duplicate keys
              song +
              Math.floor(Math.random() * (5000 - 0 + 1) + 0)
            }
          >
            {/* <Text style={styles.text}>{song.track_name}</Text> */}
            <Image
              source={{
                uri: song.img_url, // generates the image for each tile
                width: 110,
                height: 110,
              }}
            />
          </View>
        );
      });
    }
    return boxArr;
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        {!isGameOver ? ( // if the game is not over, generate the code below
          <View>
            <StatusBar style="auto" />
            <View style={styles.tileContainer}>
              <Animated.View
                style={[
                  styles.spinner,
                  {
                    transform: [
                      { translateX: translateBox(box1PositionValue) },
                    ], // the x axis transform
                  }, // value evaluates to the animation values
                ]} // when the tile is spun, this value is updated frame by frame
              >
                {renderBoxes()}
              </Animated.View>
            </View>
            <View style={styles.buttonResultContainer}>
              <TouchableOpacity
                style={[buttonTheme, styles.button]}
                onPress={() => {
                  moveBox(box1PositionValue); // pressing the spin button triggers the animation and the moveBox function
                  setIsBox1Spun(true); // the box has been spun
                }}
                disabled={isBox1Spun} // disables this button if the box has been spun
              >
                <Text style={{ color: colourTheme.white }}>Spin</Text>
              </TouchableOpacity>
              {isRoundOver ? ( // if the round is over, display the song selected
                <Text style={styles.yourSongs}>{selectedSongs[0]}</Text>
              ) : (
                <Text></Text>
              )}
            </View>
            <View style={styles.tileContainer}>
              <Animated.View
                style={[
                  styles.spinner,
                  {
                    transform: [
                      { translateX: translateBox(box2PositionValue) },
                    ],
                  },
                ]}
              >
                {renderBoxes()}
              </Animated.View>
            </View>
            <View style={styles.buttonResultContainer}>
              <TouchableOpacity
                style={[buttonTheme, styles.button]}
                onPress={() => {
                  moveBox(box2PositionValue);
                  setIsBox2Spun(true);
                }}
                disabled={isBox2Spun}
              >
                <Text style={{ color: colourTheme.white }}>Spin</Text>
              </TouchableOpacity>
              {isRoundOver ? (
                <Text style={styles.yourSongs}>{selectedSongs[1]}</Text>
              ) : (
                <Text></Text>
              )}
            </View>
            <View style={styles.tileContainer}>
              <Animated.View
                style={[
                  styles.spinner,
                  {
                    transform: [
                      { translateX: translateBox(box3PositionValue) },
                    ],
                  },
                ]}
              >
                {renderBoxes()}
              </Animated.View>
            </View>
            <View style={styles.buttonResultContainer}>
              <TouchableOpacity
                style={[buttonTheme, styles.button]}
                onPress={() => {
                  moveBox(box3PositionValue);
                  setIsBox3Spun(true);
                }}
                disabled={isBox3Spun}
              >
                <Text style={{ color: colourTheme.white }}>Spin</Text>
              </TouchableOpacity>
              {isRoundOver ? (
                <Text style={styles.yourSongs}>{selectedSongs[2]}</Text>
              ) : (
                <Text></Text>
              )}
            </View>
            {isRoundOver ? (
              <View style={buttonTheme}>
                <Button
                  title="Next round"
                  onPress={() => setIsGameOver(true)}
                  color={
                    Platform.OS === "android"
                      ? colourTheme.secondaryColour
                      : "white"
                  }
                />
              </View>
            ) : (
              <Text></Text>
            )}
          </View>
        ) : (
          <GameOver />
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    // marginRight: 120,
    right: -60,
    flexDirection: "row",
    backgroundColor: colourTheme.white,
    width: 5000,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  songImgBox: {
    width: 110,
    height: 110,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 0,
    width: 80,
    height: 40,
  },
  tileContainer: {
    borderColor: colourTheme.white,
    backgroundColor: "#F5F0F0",
    width: 300,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 5,
  },
  yourSongs: {
    color: colourTheme.white,
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonResultContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 30,
  },
});
