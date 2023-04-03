import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import songsSelectedArray from "../context/songsSelectedArray";
import { useContext } from "react";
import { WebView } from "react-native-webview";
import { TouchableOpacity } from "react-native";


const GameOver = () => {
  const { songsSelected } = useContext(songsSelectedArray);
  //   console.log(songsSelected[0].track_preview);
const [webViewArray, setWebViewArray] = useState([]);

  const playSong = (song) =>{
    console.log(song)
  }

  useEffect(() =>{

let mappedArray = songsSelected.map((song) =>{
return <WebView source={{ uri: song.track_preview }}></WebView>
})
setWebViewArray(mappedArray)
console.log(mappedArray);
  }, [])

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "white", fontSize: 30 }}>Your playlist</Text>
      <View style={styles.playlistContainer}>
        {songsSelected.map((songs) => {
          return (
            <View key={songs.track_id} style={styles.songContainer}>
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
              <View style={styles.playButton}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "lightgreen",
                    padding: 10,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    playSong(songs.track_name);
                  }}
                >

                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
      <WebView source={{ uri: songsSelected[0].track_preview }}></WebView>
      <WebView source={{ uri: songsSelected[1].track_preview }}></WebView>
      <WebView source={{ uri: songsSelected[2].track_preview }}></WebView>
      <WebView source={{ uri: songsSelected[3].track_preview }}></WebView>
      <WebView source={{ uri: songsSelected[4].track_preview }}></WebView>
      <WebView source={{ uri: songsSelected[5].track_preview }}></WebView>
    </View>
  );
};

const styles = StyleSheet.create({
  playlistContainer: {
    marginTop: 50,
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
