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
import {
  buttonTheme,
  colourTheme,
  defaultPaddinTop,
  logoutButtonTheme,
} from "../stylesheet";
import axios from "axios";
import { WebView } from "react-native-webview";
import { useIsFocused } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { ResponseType, useAuthRequest } from "expo-auth-session";

const UserProfile = () => {
  const { user, setUser } = useContext(userContext);
  const [usersGames, setUsersGames] = useState([]);
  const [currentGame, setCurrentGame] = useState([]);
  const [isViewingGame, setIsViewingGame] = useState(false);
  const [itsPlaying, setItsPlaying] = useState(false);
  const [songIndex, setSongIndex] = useState(0);

  const isFocused = useIsFocused();

  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "635e97b41a384a20bea1ce568b72c060",
      scopes: [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "streaming",
        "user-read-email",
        "user-read-private",
      ],
      // In order to follow the "Authorization Code Flow" to
      // fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: "exp://localhost:19000/--/",
      //AuthSession.getRedirectUrl('redirect');
    },
    discovery
  );

  useEffect(() => {
    axios
      .post("https://groove-game-be.onrender.com/api/get-games", {
        username: user,
      })
      .then((data) => {
        setUsersGames(data.data);
      });
  }, [isFocused]);

  const renderGame = (game) => {
    setCurrentGame(game);
    setIsViewingGame(true);
  };

  const playSong = (song) => {
    if (songIndex === song && itsPlaying) {
      setItsPlaying(false);
    } else {
      setItsPlaying(true);
      setSongIndex(song);
    }
  };

  return (
    <ScrollView>
      <View style={[styles.container, defaultPaddinTop]}>
        {!isViewingGame ? (
          <View>
            <View style={styles.user}>
              <Icons name={"person"} color={colourTheme.white} size={50} />
              <Text style={{ color: "white", fontSize: 30, paddingLeft: 30 }}>
                {user}
              </Text>
            </View>
            <View style={logoutButtonTheme}>
              <Button
                color={
                  Platform.OS === "android"
                    ? colourTheme.highlightPink
                    : "white"
                }
                onPress={() => {
                  setUser("");
                }}
                title="logout"
              ></Button>
            </View>
            <Button
              title="clickme"
              onPress={() => {
                promptAsync();
              }}
            ></Button>
            <View style={{ marginBottom: 50 }}>
              {usersGames.map(({ game }) => {
                return (
                  <View
                    key={Math.floor(Math.random() * 5000) + game.game_name}
                    style={buttonTheme}
                  >
                    <Button
                      title={game.game_name}
                      onPress={() => renderGame(game)}
                      color={
                        Platform.OS === "android"
                          ? colourTheme.secondaryColour
                          : "white"
                      }
                    ></Button>
                  </View>
                );
              })}
            </View>
          </View>
        ) : (
          <View>
            <View style={buttonTheme}>
              <Button
                title="go back"
                onPress={() => setIsViewingGame(false)}
                color={
                  Platform.OS === "android"
                    ? colourTheme.secondaryColour
                    : "white"
                }
              />
            </View>
            <View style={styles.playlistContainer}>
              {currentGame.songs.map((song) => {
                return (
                  <View
                    key={Math.floor(Math.random() * 5000) + song.track_name}
                    style={styles.resultContainer}
                  >
                    <View style={{ padding: 5 }}>
                      <Image
                        source={{
                          uri: song.img_url,
                          width: 50,
                          height: 50,
                        }}
                      />
                    </View>
                    <View style={{ width: 250 }}>
                      <Text style={{ fontSize: 16, color: "white" }}>
                        {song.track_name}
                      </Text>
                      <Text style={{ fontSize: 12, color: "white" }}>
                        {song.track_artist[0].name}
                      </Text>
                    </View>
                    {song.track_preview ? (
                      <View style={styles.playButton}>
                        <TouchableOpacity
                          onPress={() => {
                            playSong(currentGame.songs.indexOf(song));
                          }}
                        >
                          <Icons
                            name="musical-notes"
                            size={18}
                            color={"white"}
                          />
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
              <View>
                <WebView
                  source={{ uri: currentGame.songs[songIndex].track_preview }}
                ></WebView>
              </View>
            ) : (
              <Text />
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  user: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 30,
  },
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
    justifyContent: "flex-start",
  },
  playButton: {
    backgroundColor: colourTheme.primaryColour,
    padding: 8,
    borderColor: colourTheme.white,
    borderRadius: 5,
    justifyContent: "flex-end",
  },
});

export default UserProfile;
