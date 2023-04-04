import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { colourTheme, defaultPaddinTop } from "../stylesheet";
import axios from "axios";
import { useState } from "react";

const LeaderboardScreen = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    axios.get("https://groove-game-be.onrender.com/api/scores").then((resp) => {
      setLeaderboardData(resp.data.data);
    });
  }, []);

  return (
    <View style={[defaultPaddinTop, styles.container]}>
      <Text style={styles.textCentre}>Leaderboard</Text>
      {leaderboardData.map((data, index) => {
        return (
          <Text style={styles.textCentre}>{`${index + 1} ${
            data.username
          } : score ${data.score}`}</Text>
        );
      })}
    </View>
  );
};

export default LeaderboardScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colourTheme.primaryColour,
    flex: 1,
  },
  textCentre: {
    marginTop: 25,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: colourTheme.white,
  },
});
