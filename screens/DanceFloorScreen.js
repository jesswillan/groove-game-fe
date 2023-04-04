import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { buttonTheme, colourTheme } from "../stylesheet";
import React, { useEffect, useState, useContext } from "react";
import songsGenre from "../context/songsGenre";
import axios from "axios";
import FruitMachineGame from "../components/FruitMachineGame";
import globalSongArray from "../context/globalSongArray";
import songsSelectedArray from "../context/songsSelectedArray"; // importing of libraries and modules

const DanceFloorScreen = () => {
  const { chosenGenre, setChosenGenre } = useContext(songsGenre); // global state for the chosen genre
  const [isLoading, setIsLoading] = useState(true); // flag for loading content from the api
  const [isRoundFinished, setIsRoundFinished] = useState(false); // flag for checking if the round is over
  const [isNextRound, setIsNextRound] = useState(false);
  const { globalArray, setGlobalArray } = useContext(globalSongArray); // global state for the songs in the game
  const { songsSelected, setSongsSelected } = useContext(songsSelectedArray); // global state for the songs in the game

  const [square1, setSquare1] = useState(""); // the following states store songs within the tiles
  const [square1Pressed, setSquare1Pressed] = useState(false); // these states check if the tile has been selected
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
  const [count, setCount] = useState(0); // count increases each time a tile has been selected
  const [selectedSongs, setSelectedSongs] = useState([]);

  useEffect(() => {
    axios // this use effect will get 50 songs from spotify through our back end
      .get(`https://groove-game-be.onrender.com/api/songs/${chosenGenre}`)
      .then((res) => {
        const mappedArr = res.data.tracks.map((obj) => {
          // this will create an object for each song
          let newObj = {
            track_name: obj.name, // the object will contain these specific properties
            track_artist: obj.artists,
            track_preview: obj.preview_url,
            img_url: obj.album.images[0].url,
            track_id: obj.id,
          };
          return newObj;
        });
        // setSelectedSongs(mappedArr);
        setGlobalArray(mappedArr);
        setSquare1(mappedArr[0]);
        setSquare2(mappedArr[1]);
        setSquare3(mappedArr[2]);
        setSquare4(mappedArr[3]);
        setSquare5(mappedArr[4]); // the songs are mapped to each dance floor tile
        setSquare6(mappedArr[5]);
        setSquare7(mappedArr[6]);
        setSquare8(mappedArr[7]);
        setSquare9(mappedArr[8]);
        setIsLoading(false); // loading is set to false, rendering the majority of the JSX
      });
  }, []);

  const renderNextRound = () => {
    // function to set the flag of isNextRound to true
    setIsNextRound(true);
  };

  const handleClick = (str) => {
    // function for selecting tiles
    if (!isRoundFinished) {
      if (str === "square1") {
        setSquare1Pressed(true);
        setSongsSelected((songs) => {
          return [...songs, square1]; // adds the song to our selected songs array
        });
        setSelectedSongs((current) => [...current, square1]);
      }
      if (str === "square2") {
        setSquare2Pressed(true);
        setSongsSelected((songs) => {
          return [...songs, square2];
        });
        setSelectedSongs((current) => [...current, square2]);
      }
      if (str === "square3") {
        setSquare3Pressed(true);
        setSongsSelected((songs) => {
          return [...songs, square3];
        });
        setSelectedSongs((current) => [...current, square3]);
      }
      if (str === "square4") {
        setSquare4Pressed(true);
        setSongsSelected((songs) => {
          return [...songs, square4];
        });
        setSelectedSongs((current) => [...current, square4]);
      }
      if (str === "square5") {
        setSquare5Pressed(true);
        setSongsSelected((songs) => {
          return [...songs, square5];
        });
        setSelectedSongs((current) => [...current, square5]);
      }
      if (str === "square6") {
        setSquare6Pressed(true);
        setSongsSelected((songs) => {
          return [...songs, square6];
        });
        setSelectedSongs((current) => [...current, square6]);
      }
      if (str === "square7") {
        setSquare7Pressed(true);
        setSongsSelected((songs) => {
          return [...songs, square7];
        });
        setSelectedSongs((current) => [...current, square7]);
      }
      if (str === "square8") {
        setSquare8Pressed(true);
        setSongsSelected((songs) => {
          return [...songs, square8];
        });
        setSelectedSongs((current) => [...current, square8]);
      }
      if (str === "square9") {
        setSquare9Pressed(true);
        setSongsSelected((songs) => {
          return [...songs, square9];
        });
        setSelectedSongs((current) => [...current, square9]);
      }
      setCount((count) => count + 1);
      console.log(count);
      if (count >= 2) {
        // increases the count variable and checks to see if the round has finished
        setIsRoundFinished(true);
        console.log("round complete");
      }
    }
  };

  return (
    <View style={styles.container}>
      {!isNextRound ? (
        <View>
          <View>
            {isLoading ? (
              <Text>loading...</Text>
            ) : (
              <View style={styles.squaresContainer}>
                <TouchableOpacity
                  onPress={() => {
                    handleClick("square1");
                  }}
                  disabled={square1Pressed ? true : false}
                >
                  {!square1Pressed ? (
                    <View style={styles.squareBlue}></View>
                  ) : (
                    <View style={styles.squareBlue}>
                      {/* <Text>{square1.track_name}</Text> */}
                      <Image
                        style={{ borderRadius: 5 }}
                        source={{
                          uri: square1.img_url,
                          width: 123,
                          height: 123,
                        }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleClick("square2");
                  }}
                  disabled={square2Pressed ? true : false}
                >
                  {!square2Pressed ? (
                    <View style={styles.squareGreen}></View>
                  ) : (
                    <View style={styles.squareGreen}>
                      {/* <Text>{square2.track_name}</Text> */}
                      <Image
                        style={{ borderRadius: 5 }}
                        source={{
                          uri: square2.img_url,
                          width: 123,
                          height: 123,
                        }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleClick("square3");
                  }}
                  disabled={square3Pressed ? true : false}
                >
                  {!square3Pressed ? (
                    <View style={styles.squarePink}></View>
                  ) : (
                    <View style={styles.squarePink}>
                      {/* <Text>{square3.track_name}</Text> */}
                      <Image
                        style={{ borderRadius: 5 }}
                        source={{
                          uri: square3.img_url,
                          width: 123,
                          height: 123,
                        }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleClick("square4");
                  }}
                  disabled={square4Pressed ? true : false}
                >
                  {!square4Pressed ? (
                    <View style={styles.squarePink}></View>
                  ) : (
                    <View style={styles.squarePink}>
                      {/* <Text>{square4.track_name}</Text> */}
                      <Image
                        style={{ borderRadius: 5 }}
                        source={{
                          uri: square4.img_url,
                          width: 123,
                          height: 123,
                        }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleClick("square5");
                  }}
                  disabled={square5Pressed ? true : false}
                >
                  {!square5Pressed ? (
                    <View style={styles.squareBlue}></View>
                  ) : (
                    <View style={styles.squareBlue}>
                      {/* <Text>{square5.track_name}</Text> */}
                      <Image
                        style={{ borderRadius: 5 }}
                        source={{
                          uri: square5.img_url,
                          width: 123,
                          height: 123,
                        }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleClick("square6");
                  }}
                  disabled={square6Pressed ? true : false}
                >
                  {!square6Pressed ? (
                    <View style={styles.squareGreen}></View>
                  ) : (
                    <View style={styles.squareGreen}>
                      {/* <Text>{square6.track_name}</Text> */}
                      <Image
                        style={{ borderRadius: 5 }}
                        source={{
                          uri: square6.img_url,
                          width: 123,
                          height: 123,
                        }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleClick("square7");
                  }}
                  disabled={square7Pressed ? true : false}
                >
                  {!square7Pressed ? (
                    <View style={styles.squareGreen}></View>
                  ) : (
                    <View style={styles.squareGreen}>
                      {/* <Text>{square7.track_name}</Text> */}
                      <Image
                        style={{ borderRadius: 5 }}
                        source={{
                          uri: square7.img_url,
                          width: 123,
                          height: 123,
                        }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleClick("square8");
                  }}
                  disabled={square8Pressed ? true : false}
                >
                  {!square8Pressed ? (
                    <View style={styles.squarePink}></View>
                  ) : (
                    <View style={styles.squarePink}>
                      {/* <Text>{square8.track_name}</Text> */}
                      <Image
                        style={{ borderRadius: 5 }}
                        source={{
                          uri: square8.img_url,
                          width: 123,
                          height: 123,
                        }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleClick("square9");
                  }}
                  disabled={square9Pressed ? true : false}
                >
                  {!square9Pressed ? (
                    <View style={styles.squareBlue}></View>
                  ) : (
                    <View style={styles.squareBlue}>
                      <Image
                        style={{ borderRadius: 5 }}
                        source={{
                          uri: square9.img_url,
                          width: 123,
                          height: 123,
                        }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.songList}>
            <Text style={styles.yourSongs}>Your songs:</Text>
            {selectedSongs.map((song) => {
              return (
                <Text style={styles.songs} key={song.track_name}>
                  {song.track_name}
                </Text>
              );
            })}
          </View>
          {isRoundFinished ? (
            <View style={buttonTheme}>
              <Button
                color={
                  Platform.OS === "android"
                    ? colourTheme.secondaryColour
                    : "white"
                }
                title="Next round"
                onPress={renderNextRound}
              />
            </View>
          ) : (
            <Text></Text>
          )}
        </View>
      ) : (
        <FruitMachineGame />
      )}
      <Image
        source={require("../img/logo-nobg.png")}
        style={[
          { opacity: 0.2 },
          { position: "absolute", zIndex: -1 },
          styles.backgroundImg,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colourTheme.primaryColour,
    marginTop: 0,
    fontSize: 30,
  },
  squaresContainer: {
    borderColor: colourTheme.primaryColour,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 150,
    marginLeft: "auto",
    marginRight: "auto",
    width: "auto",
    justifyContent: "center",
  },
  squareBlue: {
    width: 125,
    height: 125,
    backgroundColor: colourTheme.highlightBlue,
    borderColor: colourTheme.primaryColour,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  squareGreen: {
    width: 125,
    height: 125,
    backgroundColor: colourTheme.highlightGreen,
    borderColor: colourTheme.primaryColour,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  squarePink: {
    width: 125,
    height: 125,
    backgroundColor: colourTheme.highlightPink,
    borderColor: colourTheme.primaryColour,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  songList: {
    backgroundColor: colourTheme.secondaryColour,
    width: 375,
    height: "auto",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  yourSongs: {
    color: colourTheme.white,
    fontWeight: "bold",
    fontSize: 18,
    padding: 2,
    paddingBottom: 10,
  },
  songs: {
    color: colourTheme.white,
    padding: 2,
    fontSize: 16,
  },
  backgroundImg: {
    marginTop: 120,
  },
});

export default DanceFloorScreen;
