import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import userContext from "../context/userContext";
import Icons from "react-native-vector-icons/Ionicons";
import { colourTheme, defaultPaddinTop } from "../stylesheet";
import axios from "axios";

const UserProfile = () => {
  const { user, setUser } = useContext(userContext);
  const [usersGames, setUsersGames] = useState([]);
  const [currentGame, setCurrentGame] = useState([]);
  const [isViewingGame, setIsViewingGame] = useState(false);

  useEffect(() => {
    axios
      .post("https://groove-game-be.onrender.com/api/get-games", {
        username: user,
      })
      .then((data) => {
        setUsersGames(data.data);
      });
  }, []);

  const renderGame = (game) => {
    setCurrentGame(game);
    setIsViewingGame(true);
  };

  return (
    <View style={[styles.container, defaultPaddinTop]}>
      {!isViewingGame ? (
        <View>
          <View style={styles.user}>
            <Icons name={"person"} color={colourTheme.white} size={50} />
            <Text style={{ color: "white", fontSize: 30 }}>{user}</Text>
          </View>
          <Button
            color={"red"}
            onPress={() => {
              setUser("");
            }}
            title="logout"
          >
            logout
          </Button>
          <Image
            style={[
              { opacity: 0.2 },
              { position: "absolute", zIndex: -1 },
              styles.backgroundImg,
            ]}
            source={require("../img/logo-nobg.png")}
          />
          <View>
            {usersGames.map(({ game }) => {
              return (
                <View key={Math.floor(Math.random() * 1000)}>
                  <Button title="game" onPress={() => renderGame(game)} />
                </View>
              );
            })}
          </View>
        </View>
      ) : (
        <View>
          <Button title="goback" onPress={() => setIsViewingGame(false)}>
            <Text>go back</Text>
          </Button>
          <Button title="log" onPress={() => console.log(currentGame.songs)} />
          <View style={styles.playlistContainer}>
            {currentGame.songs.map((songs) => {
              return (
                <View
                  key={Math.floor(Math.random() * 500)}
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
                          // playSong(songsSelected.indexOf(songs));
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
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colourTheme.primaryColour,
    justifyContent: "flex-start",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    padding: 30,
  },
  backgroundImg: {
    marginTop: 120,
  },
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

export default UserProfile;
