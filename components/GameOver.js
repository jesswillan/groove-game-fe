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
// the above code imports different library function & modules from react

const GameOver = () => {
  const {songsSelected, setSongsSelected} = useContext(songsSelectedArray);
  const {globalArray, setGlobalArray} = useContext(globalSongArray);
  const {user} = useContext(userContext);

  // setting different useContext which will be used to call the variables alter one

  const [itsPlaying, setItsPlaying] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const [input, setInput] = useState("");

  const navigation = useNavigation();

  const playSong = (song) => {
    if (songIndex === song && itsPlaying) {
      //check the song index and if the song is being currently played
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
  // function which will clear the global states once the game has finished

  const handleSave = () => {
    if (!input) {
      console.log("please enter a game name"); //hasn't entered the game name they will get a console log warning
    } else {
      if (user) {
        axios // using axios post the game to the database through our backend
          .post("https://groove-game-be.onrender.com/api/submit-games", {
            game: {
              game_name: input,
              user: user,
              songs: songsSelected,
              // the body of the request
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

  //html screen below which will invoke all the function from above and display the data
  return (
    <View style={{alignItems: "center"}}>
      {!user ? (
        <View style={backButton}>
          <TouchableOpacity
          style={styles.arrowBack}
            onPress={() => {
              navigation.navigate("Home"); // If the user is not logged in, the button will navigate them home
              stateClear();
            }}
            color={
              Platform.OS === "android" ? colourTheme.secondaryColour : "white" // colour theme for Android
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
        autoCapitalize='none'
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
          //map the playlist from the global state
          return (
            <View
              key={Math.floor(Math.random() * 500)}
              style={styles.resultContainer}
            >
              <View style={[styles.songContainer, {paddingHorizontal: 10}]}>
                <Image
                  source={{
                    uri: songs.img_url,
                    width: 50,
                    height: 50,
                  }}
                />
              </View>
              <View style={styles.songNameArtist}>
                <Text style={{fontSize: 14, color: "white"}}>
                  {songs.track_name}
                </Text>
                <Text style={{fontSize: 12, color: "white"}}>
                  {songs.track_artist[0].name}
                </Text>
              </View>
              {songs.track_preview ? (
                <View style={styles.playButton}>
                  <TouchableOpacity
                    onPress={() => {
                      playSong(songsSelected.indexOf(songs)); // invokes the playSong function with the index of the selected song
                    }}
                  >
                    <Icons name="musical-notes" size={18} color={"white"} />
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

//styling using CSS below
const styles = StyleSheet.create({
  playlistContainer: {
    marginTop: 25,
    backgroundColor: colourTheme.white,
    padding: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    
  },
  resultContainer: {
    flexDirection: "row",
    backgroundColor: colourTheme.secondaryColour,
    width: 350,
    margin: 5,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
    justifyContent: 'flex-start'
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
  },
  songNameArtist: {
    width: 'auto',
  },
  playButton: {
    backgroundColor: colourTheme.primaryColour,
    padding: 8,
    borderColor: colourTheme.white,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: 'flex-end',
  },
  songContainer: {

  },
});

export default GameOver;
