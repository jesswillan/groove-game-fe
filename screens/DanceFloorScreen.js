import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colourTheme } from "../stylesheet";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import songsGenre from "../context/songsGenre";
import axios from "axios";

const DanceFloorScreen = () => {
  const [sampleMuisc, setSampleMusic] = useState([]);
  const { chosenGenre, setChosenGenre } = useContext(songsGenre);

  useEffect(() => {
    console.log(chosenGenre);
    axios
      .get(`https://groove-game-be.onrender.com/api/songs/${chosenGenre}`)
      .then((res) => {
        const mappedArr = res.data.tracks.map((obj) => {
          let newObj = {
            track_name: obj.name,
            track_artist: obj.artists,
            track_preview: obj.preview_url,
            img_url: obj.album.images[0].url,
            track_id: obj.id,
          };
          return newObj;
        });
        setSampleMusic(mappedArr);
      });
  }, []);

  const [square1, setSquare1] = useState("");
  const [square1Pressed, setSquare1Pressed] = useState(false);
  const [square2, setSquare2] = useState("");
  const [square2Pressed, setSquare2Pressed] = useState(false);
  const [square3, setSquare3] = useState("");
  const [square3Pressed, setSquare3Pressed] = useState(false);
  const [square4, setSquare4] = useState("");
  const [square4Pressed, setSquare4Pressed] = useState(false);
  const [square5, setSquare5] = useState("");
  const [square5Pressed, setSquare5Pressed] = useState(false);
  const [square6, setSquare6] = useState("");
  const [square6Pressed, setSquare6Pressed] = useState(false);
  const [square7, setSquare7] = useState("");
  const [square7Pressed, setSquare7Pressed] = useState(false);
  const [square8, setSquare8] = useState("");
  const [square8Pressed, setSquare8Pressed] = useState(false);
  const [square9, setSquare9] = useState("");
  const [square9Pressed, setSquare9Pressed] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedSongs, setSelectedSongs] = useState([]);

  useState(() => {
    setSquare1(sampleMuisc[0]);
    setSquare2(sampleMuisc[1]);
    setSquare3(sampleMuisc[2]);
    setSquare4(sampleMuisc[3]);
    setSquare5(sampleMuisc[4]);
    setSquare6(sampleMuisc[5]);
    setSquare7(sampleMuisc[6]);
    setSquare8(sampleMuisc[7]);
    setSquare9(sampleMuisc[8]);
  });

  const handleClick = (str) => {
    if (count >= 3) {
      console.log("round complete");
    } else {
      if (str === "square1") {
        setSquare1Pressed(true);
        setSelectedSongs((current) => [...current, square1]);
      }
      if (str === "square2") {
        setSquare2Pressed(true);
        setSelectedSongs((current) => [...current, square2]);
      }
      if (str === "square3") {
        setSquare3Pressed(true);
        setSelectedSongs((current) => [...current, square3]);
      }
      if (str === "square4") {
        setSquare4Pressed(true);
        setSelectedSongs((current) => [...current, square4]);
      }
      if (str === "square5") {
        setSquare5Pressed(true);
        setSelectedSongs((current) => [...current, square5]);
      }
      if (str === "square6") {
        setSquare6Pressed(true);
        setSelectedSongs((current) => [...current, square6]);
      }
      if (str === "square7") {
        setSquare7Pressed(true);
        setSelectedSongs((current) => [...current, square7]);
      }
      if (str === "square8") {
        setSquare8Pressed(true);
        setSelectedSongs((current) => [...current, square8]);
      }
      if (str === "square9") {
        setSquare9Pressed(true);
        setSelectedSongs((current) => [...current, square9]);
      }
      setCount((count) => count + 1);
    }
  };

  return (
    <View>
      <View>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              handleClick("square1");
            }}
          >
            {!square1Pressed ? (
              <View style={styles.squareBlue}></View>
            ) : (
              <View style={styles.squareBlue}>
                <Text>{square1}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleClick("square2");
            }}
          >
            {!square2Pressed ? (
              <View style={styles.squareGreen}></View>
            ) : (
              <View style={styles.squareGreen}>
                <Text>{square2}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleClick("square3");
            }}
          >
            {!square3Pressed ? (
              <View style={styles.squarePink}></View>
            ) : (
              <View style={styles.squarePink}>
                <Text>{square3}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleClick("square4");
            }}
          >
            {!square4Pressed ? (
              <View style={styles.squarePink}></View>
            ) : (
              <View style={styles.squarePink}>
                <Text>{square4}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleClick("square5");
            }}
          >
            {!square5Pressed ? (
              <View style={styles.squareBlue}></View>
            ) : (
              <View style={styles.squareBlue}>
                <Text>{square5}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleClick("square6");
            }}
          >
            {!square6Pressed ? (
              <View style={styles.squareGreen}></View>
            ) : (
              <View style={styles.squareGreen}>
                <Text>{square6}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleClick("square7");
            }}
          >
            {!square7Pressed ? (
              <View style={styles.squareGreen}></View>
            ) : (
              <View style={styles.squareGreen}>
                <Text>{square7}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleClick("square8");
            }}
          >
            {!square8Pressed ? (
              <View style={styles.squarePink}></View>
            ) : (
              <View style={styles.squarePink}>
                <Text>{square8}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleClick("square9");
            }}
          >
            {!square9Pressed ? (
              <View style={styles.squareBlue}></View>
            ) : (
              <View style={styles.squareBlue}>
                <Text>{square9}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.songList}>
        <Text>songs here</Text>
        {selectedSongs.map((song) => {
          return <Text key={song.name}>{song.name}</Text>;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "black",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 200,
    width: 400,
    justifyContent: "center",
  },
  squareBlue: {
    width: 125,
    height: 125,
    backgroundColor: colourTheme.highlightBlue,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  squareGreen: {
    width: 125,
    height: 125,
    backgroundColor: colourTheme.highlightGreen,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  squarePink: {
    width: 125,
    height: 125,
    backgroundColor: colourTheme.highlightPink,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  songList: {
    margin: "auto",
    backgroundColor: "lightblue",
    width: 100,
    height: 100,
  },
  songs: {
    backgroundColor: "black",
  },
});

export default DanceFloorScreen;
