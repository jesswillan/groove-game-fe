import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import {buttonTheme, colourTheme} from '../stylesheet';
import React, {useEffect, useState, useContext} from 'react';
import songsGenre from '../context/songsGenre';
import axios from 'axios';
import FruitMachineGame from '../components/FruitMachineGame';
import globalSongArray from '../context/globalSongArray';

const DanceFloorScreen = () => {
  const [sampleMusic, setSampleMusic] = useState([]);
  const {chosenGenre, setChosenGenre} = useContext(songsGenre);
  const [isLoading, setIsLoading] = useState(true);
  const [isRoundFinished, setIsRoundFinished] = useState(false);
  const [isNextRound, setIsNextRound] = useState(false);
  const {globalArray, setGlobalArray} = useContext(globalSongArray);

  const [square1, setSquare1] = useState('');
  const [square1Pressed, setSquare1Pressed] = useState(false);
  const [square2, setSquare2] = useState('');
  const [square2Pressed, setSquare2Pressed] = useState(false);
  const [square3, setSquare3] = useState('');
  const [square3Pressed, setSquare3Pressed] = useState(false);
  const [square4, setSquare4] = useState('');
  const [square4Pressed, setSquare4Pressed] = useState(false);
  const [square5, setSquare5] = useState('');
  const [square5Pressed, setSquare5Pressed] = useState(false);
  const [square6, setSquare6] = useState('');
  const [square6Pressed, setSquare6Pressed] = useState(false);
  const [square7, setSquare7] = useState('');
  const [square7Pressed, setSquare7Pressed] = useState(false);
  const [square8, setSquare8] = useState('');
  const [square8Pressed, setSquare8Pressed] = useState(false);
  const [square9, setSquare9] = useState('');
  const [square9Pressed, setSquare9Pressed] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedSongs, setSelectedSongs] = useState([]);

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
        // setSelectedSongs(mappedArr);
        setGlobalArray(mappedArr);
        setSquare1(mappedArr[0]);
        setSquare2(mappedArr[1]);
        setSquare3(mappedArr[2]);
        setSquare4(mappedArr[3]);
        setSquare5(mappedArr[4]);
        setSquare6(mappedArr[5]);
        setSquare7(mappedArr[6]);
        setSquare8(mappedArr[7]);
        setSquare9(mappedArr[8]);
        setIsLoading(false);
        console.log(square1);
      });
  }, []);

  const renderNextRound = () => {
    setIsNextRound(true);
  };

  const handleClick = (str) => {
    if (count >= 3) {
      setIsRoundFinished(true);
      console.log('round complete');
    } else {
      if (str === 'square1') {
        setSquare1Pressed(true);
        setSelectedSongs((current) => [...current, square1]);
      }
      if (str === 'square2') {
        setSquare2Pressed(true);
        setSelectedSongs((current) => [...current, square2]);
      }
      if (str === 'square3') {
        setSquare3Pressed(true);
        setSelectedSongs((current) => [...current, square3]);
      }
      if (str === 'square4') {
        setSquare4Pressed(true);
        setSelectedSongs((current) => [...current, square4]);
      }
      if (str === 'square5') {
        setSquare5Pressed(true);
        setSelectedSongs((current) => [...current, square5]);
      }
      if (str === 'square6') {
        setSquare6Pressed(true);
        setSelectedSongs((current) => [...current, square6]);
      }
      if (str === 'square7') {
        setSquare7Pressed(true);
        setSelectedSongs((current) => [...current, square7]);
      }
      if (str === 'square8') {
        setSquare8Pressed(true);
        setSelectedSongs((current) => [...current, square8]);
      }
      if (str === 'square9') {
        setSquare9Pressed(true);
        setSelectedSongs((current) => [...current, square9]);
      }
      setCount((count) => count + 1);
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
                    handleClick('square1');
                  }}
                >
                  {!square1Pressed ? (
                    <View style={styles.squareBlue}></View>
                  ) : (
                    <View style={styles.squareBlue}>
                      {/* <Text>{square1.track_name}</Text> */}
                      <Image
                        style={{borderRadius: 5}}
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
                    handleClick('square2');
                  }}
                >
                  {!square2Pressed ? (
                    <View style={styles.squareGreen}></View>
                  ) : (
                    <View style={styles.squareGreen}>
                      {/* <Text>{square2.track_name}</Text> */}
                      <Image
                        style={{borderRadius: 5}}
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
                    handleClick('square3');
                  }}
                >
                  {!square3Pressed ? (
                    <View style={styles.squarePink}></View>
                  ) : (
                    <View style={styles.squarePink}>
                      {/* <Text>{square3.track_name}</Text> */}
                      <Image
                        style={{borderRadius: 5}}
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
                    handleClick('square4');
                  }}
                >
                  {!square4Pressed ? (
                    <View style={styles.squarePink}></View>
                  ) : (
                    <View style={styles.squarePink}>
                      {/* <Text>{square4.track_name}</Text> */}
                      <Image
                        style={{borderRadius: 5}}
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
                    handleClick('square5');
                  }}
                >
                  {!square5Pressed ? (
                    <View style={styles.squareBlue}></View>
                  ) : (
                    <View style={styles.squareBlue}>
                      {/* <Text>{square5.track_name}</Text> */}
                      <Image
                        style={{borderRadius: 5}}
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
                    handleClick('square6');
                  }}
                >
                  {!square6Pressed ? (
                    <View style={styles.squareGreen}></View>
                  ) : (
                    <View style={styles.squareGreen}>
                      {/* <Text>{square6.track_name}</Text> */}
                      <Image
                        style={{borderRadius: 5}}
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
                    handleClick('square7');
                  }}
                >
                  {!square7Pressed ? (
                    <View style={styles.squareGreen}></View>
                  ) : (
                    <View style={styles.squareGreen}>
                      {/* <Text>{square7.track_name}</Text> */}
                      <Image
                        style={{borderRadius: 5}}
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
                    handleClick('square8');
                  }}
                >
                  {!square8Pressed ? (
                    <View style={styles.squarePink}></View>
                  ) : (
                    <View style={styles.squarePink}>
                      {/* <Text>{square8.track_name}</Text> */}
                      <Image
                        style={{borderRadius: 5}}
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
                    handleClick('square9');
                  }}
                >
                  {!square9Pressed ? (
                    <View style={styles.squareBlue}></View>
                  ) : (
                    <View style={styles.squareBlue}>
                      <Image
                        style={{borderRadius: 5}}
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
                  Platform.OS === 'android'
                    ? colourTheme.secondaryColour
                    : 'white'
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
        source={require('../img/logo-nobg.png')}
        style={[
          {opacity: 0.2},
          {position: 'absolute', zIndex: -1},
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 'auto',
    justifyContent: 'center',
  },
  squareBlue: {
    width: 125,
    height: 125,
    backgroundColor: colourTheme.highlightBlue,
    borderColor: colourTheme.primaryColour,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareGreen: {
    width: 125,
    height: 125,
    backgroundColor: colourTheme.highlightGreen,
    borderColor: colourTheme.primaryColour,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  squarePink: {
    width: 125,
    height: 125,
    backgroundColor: colourTheme.highlightPink,
    borderColor: colourTheme.primaryColour,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  songList: {
    backgroundColor: colourTheme.secondaryColour,
    width: 375,
    height: 'auto',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  yourSongs: {
    color: colourTheme.white,
    fontWeight: 'bold',
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
