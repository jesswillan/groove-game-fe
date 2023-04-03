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
export default function FruitMachineGame() {
  const [box1PositionValue] = useState(new Animated.Value(0));
  const [box2PositionValue] = useState(new Animated.Value(0));
  const [box3PositionValue] = useState(new Animated.Value(0));
  const [count, setCount] = useState(0);
  const [isBox1Spun, setIsBox1Spun] = useState(false);
  const [isBox2Spun, setIsBox2Spun] = useState(false);
  const [isBox3Spun, setIsBox3Spun] = useState(false);
  const [isRoundOver, setIsRoundOver] = useState(false);
  const { globalArray, setGlobalArray } = useContext(globalSongArray);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const { songsSelected, setSongsSelected } = useContext(songsSelectedArray);

  const rndNum = () => {
    let min = 1;
    let max = 10;
    let rndNum = Math.floor(Math.random() * (max - min) + min);
    let roundedNum = Math.ceil(rndNum / 1.2) * 1.2;
    return roundedNum;
    // return 1.2;
  };
  let randomValue = rndNum();
  let tile1LandingPosition;
  let tile2LandingPosition;
  let tile3LandingPosition;
  const moveBox = (boxPositionValue) => {
    if (boxPositionValue === box1PositionValue) {
      tile1LandingPosition = randomValue;
    } else if (boxPositionValue === box2PositionValue) {
      tile2LandingPosition = randomValue;
    } else if (boxPositionValue === box3PositionValue) {
      tile3LandingPosition = randomValue;
    }
    // tile1LandingPosition number === index value of global array;
    let t1Song = tile1LandingPosition / 1.2;
    let t2Song = tile2LandingPosition / 1.2;
    let t3Song = tile3LandingPosition / 1.2;
    // console.log(t1Song);
    // console.log(globalArray[Math.floor(t1Song)].track_artist[0].name);
    setSelectedSongs((currentSongs) => {
      if (boxPositionValue === box1PositionValue) {
        return [
          ...currentSongs,
          globalArray[Math.floor(t1Song)].track_artist[0].name,
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
      setTimeout(() => {
        console.log("round over");
        setIsRoundOver(true);
      }, 3500);
    }
    setCount((previous) => {
      return previous + 1;
    });
    Animated.timing(boxPositionValue, {
      toValue: randomValue,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };
  const translateBox = (boxPositionValue) =>
    boxPositionValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100],
    });
  const renderBoxes = () => {
    const reversedGlobal = globalArray.slice().reverse();
    const boxArr = [];
    for (let i = 0; i < 2; i++) {
      reversedGlobal.map((song) => {
        boxArr.push(
          <View
            style={[styles.songImgBox]}
            key={
              Math.floor(Math.random() * (5000 - 0 + 1) + 0) +
              song +
              Math.floor(Math.random() * (5000 - 0 + 1) + 0)
            }
          >
            {/* <Text style={styles.text}>{song.track_name}</Text> */}
            <Image
              source={{
                uri: song.img_url,
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
    <View style={styles.container}>
      {!isGameOver ? (
        <View>
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
          <View style={styles.buttonResultContainer}>
            <TouchableOpacity
              style={[buttonTheme, styles.button]}
              onPress={() => {
                moveBox(box1PositionValue);
                setIsBox1Spun(true);
              }}
              disabled={isBox1Spun}
            >
              <Text style={{ color: colourTheme.white }}>Spin</Text>
            </TouchableOpacity>
            {isRoundOver ? (
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
                  transform: [{ translateX: translateBox(box2PositionValue) }],
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
                  transform: [{ translateX: translateBox(box3PositionValue) }],
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
