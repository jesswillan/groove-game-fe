import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet, Image, Button, TouchableOpacity} from "react-native";
import songsSelectedArray from "../context/songsSelectedArray";
import {useContext} from "react";
import {WebView} from "react-native-webview";
// import {TouchableOpacity} from "react-native";
import userContext from "../context/userContext";
import axios from "axios";
import {useNavigation} from "@react-navigation/native";
import {backButton, buttonTheme, colourTheme} from "../stylesheet";
import globalSongArray from "../context/globalSongArray";
import {TextInput} from "react-native-gesture-handler";
import Icons from "react-native-vector-icons/Ionicons";
// import GenericTouchable from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';
const GameOver = () => {
  const {songsSelected, setSongsSelected} = useContext(songsSelectedArray);
  const {globalArray, setGlobalArray} = useContext(globalSongArray);
  const {user} = useContext(userContext);

  const [itsPlaying, setItsPlaying] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const [input, setInput] = useState("");

  const navigation = useNavigation();

  const playSong = (song) => {
    if (songIndex === song && itsPlaying) {
      setItsPlaying(false);
    } else {
      setItsPlaying(true);
      setSongIndex(song);
    }
  };

  const stateClear = () => {
    setSongsSelected([]);
    setGlobalArray([]);
  };

  const handleSave = () => {
    if (!input) {
      console.log("please enter a game name");
    } else {
      if (user) {
        axios
          .post("https://groove-game-be.onrender.com/api/submit-games", {
            game: {
              game_name: input,
              user: user,
              songs: songsSelected,
            },
          })
          .then(() => {
            console.log("game submitted");
          });
      } else {
        console.log("please sign up or log in to save games");
      }
    }
    setInput("");
  };

  return (
    <View style={{alignItems: "center"}}>
      {!user ? (
        <View style={backButton}>
          <TouchableOpacity
          style={styles.arrowBack}
            onPress={() => {
              navigation.navigate("Home");
              stateClear();
            }}
            color={
              Platform.OS === "android" ? colourTheme.secondaryColour : "white"
            }
          >
            <Icons name='arrow-back' size={18} color={'white'}/>
            <Text style={styles.backButtonText}>Back to home</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Button
            onPress={() => {
              navigation.navigate("User Login");
              stateClear();
            }}
            color={
              Platform.OS === "android" ? colourTheme.secondaryColour : "white"
            }
            title="Back to profile"
          ></Button>
        </View>
      )}

      {/* <Text style={{ color: "white", fontSize: 30 }}>Your playlist</Text> */}
      <TextInput
        style={styles.input}
        value={input}
        placeholder="Your Playlist Name... "
        onChangeText={(text) => setInput(text)}
      />
      <View style={buttonTheme}>
        <Button
          title="Save your playlist"
          onPress={handleSave}
          color={
            Platform.OS === "android" ? colourTheme.secondaryColour : "white"
          }
        />
      </View>
      <View style={styles.playlistContainer}>
        {songsSelected.map((songs) => {
          return (
            <View
              key={Math.floor(Math.random() * 500)}
              style={styles.songContainer}
            >
              <View style={{padding: 5}}>
                <Image
                  source={{
                    uri: songs.img_url,
                    width: 50,
                    height: 50,
                  }}
                />
              </View>
              <View style={{width: 250}}>
                <Text style={{fontSize: 16, color: "white"}}>
                  {songs.track_name}
                </Text>
                <Text style={{fontSize: 12, color: "white"}}>
                  {songs.track_artist[0].name}
                </Text>
              </View>
              {songs.track_preview ? (
                <View style={styles.playButton}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "lightgreen",
                      padding: 10,
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      playSong(songsSelected.indexOf(songs));
                    }}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text></Text>
              )}
            </View>
          );
        })}
      </View>
      {itsPlaying ? (
        <WebView
          source={{uri: songsSelected[songIndex].track_preview}}
        ></WebView>
      ) : (
        <Text />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  playlistContainer: {
    marginTop: 25,
    backgroundColor: "black",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  songContainer: {
    flexDirection: "row",
    backgroundColor: "purple",
    borderBottomColor: "black",
    borderBottomWidth: 2,
    width: 350,
    margin: 5,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    width: 300,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 25,
    backgroundColor: colourTheme.white,
    color: colourTheme.primaryColour,
    textAlign: "center",
    borderRadius: 5,
    padding: 5,
  },
  arrowBack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  backButtonText: {
    color: colourTheme.white,
    fontSize: 16,
  }
});

export default GameOver;
