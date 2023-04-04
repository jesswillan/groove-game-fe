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
// the above code imports different library function & modules from react

const GameOver = () => {
  const { songsSelected, setSongsSelected } = useContext(songsSelectedArray);
  const { globalArray, setGlobalArray } = useContext(globalSongArray);
  const { user } = useContext(userContext);

  // setting different useContext which will be used to call the variables alter one

  const [itsPlaying, setItsPlaying] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const [input, setInput] = useState("");
//Use State defined that would be called later on

  const navigation = useNavigation();

  const playSong = (song) => {
    if (songIndex === song && itsPlaying) { //check the song index and if the song is being currently played
      setItsPlaying(false); //if its playing turn it off ie set it to false
    } else {
      setItsPlaying(true); //if not playing the set the set the playing to true so it can be invoked later on
      setSongIndex(song); //set the index to the current song chosen
    }
  };

  const stateClear = () => {
    setSongsSelected([]);
    setGlobalArray([]);
  };
  // function which will set difffernt songs and populate the array

  const handleSave = () => {
    if (!input) {
      console.log("please enter a game name"); //hasn't entered the game name they will get a console log warning
    } else {
      if (user) {
        axios // using axios call the api that will retreive the songs from spotify
          .post("https://groove-game-be.onrender.com/api/submit-games", {
            game: {
              game_name: input,
              user: user,
              songs: songsSelected,
              // specify from the api which attributes we need
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

  //html frotn screen below which will invoke all the function from above and display the data
  return (
    <View style={{ alignItems: "center" }}>
      {!user ? (
        <Button
          onPress={() => {
            navigation.navigate("Home"); // Navigation to different pages
            stateClear();
          }}
          color={
            Platform.OS === "android" ? colourTheme.secondaryColour : "white" // colour theme for Android
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
        {songsSelected.map((songs) => { //map the playlist from the api
          return (
            <View
              key={Math.floor(Math.random() * 500)} //identifyer fro different elements
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
                  // styling the button
                    style={{
                      backgroundColor: "lightgreen",
                      padding: 10,
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      playSong(songsSelected.indexOf(songs)); //display the index of the song selected
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
          source={{ uri: songsSelected[songIndex].track_preview }} //preview the track once selected
        ></WebView>
      ) : (
        <Text />
      )}
    </View>
  );
};

//styling using CSS below
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
