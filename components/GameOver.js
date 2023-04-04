import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, Button } from "react-native";
import songsSelectedArray from "../context/songsSelectedArray";
import { useContext } from "react";
import { WebView } from "react-native-webview";
import { TouchableOpacity } from "react-native";
import userContext from "../context/userContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { colourTheme } from "../stylesheet";
import globalSongArray from "../context/globalSongArray";
import { TextInput } from "react-native-gesture-handler";
const GameOver = () => {
  const { songsSelected, setSongsSelected } = useContext(songsSelectedArray);
  const { globalArray, setGlobalArray } = useContext(globalSongArray);
  const { user } = useContext(userContext);

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
    <View style={{ alignItems: "center" }}>
      {!user ? (
        <Button
          onPress={() => {
            navigation.navigate("Home");
            stateClear();
          }}
          color={
            Platform.OS === "android" ? colourTheme.secondaryColour : "white"
          }
          title="Back to home"
        ></Button>
      ) : (
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
      )}

      {/* <Text style={{ color: "white", fontSize: 30 }}>Your playlist</Text> */}
      <TextInput
        style={{
          backgroundColor: "white",
          width: 250,
          height: 50,
          marginTop: 10,
        }}
        value={input}
        placeholder="Your Playlist Name... "
        onChangeText={(text) => setInput(text)}
      />
      <View>
        <Button title="save playlist to profile" onPress={handleSave} />
      </View>
      <View style={styles.playlistContainer}>
        {songsSelected.map((songs) => {
          return (
            <View
              key={Math.floor(Math.random() * 500) + songs.track_name}
              style={styles.songContainer}
            >
              <View style={{ padding: 5 }}>
                <Image
                  source={{
                    uri: songs.img_url,
                    width: 50,
                    height: 50,
                  }}
                />
              </View>
              <View style={{ width: 250 }}>
                <Text style={{ fontSize: 16, color: "white" }}>
                  {songs.track_name}
                </Text>
                <Text style={{ fontSize: 12, color: "white" }}>
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
          source={{ uri: songsSelected[songIndex].track_preview }}
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
});

export default GameOver;
