import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React, {useEffect} from "react";
import {colourTheme, defaultPaddinTop, backButton} from "../stylesheet";
import axios from "axios";
import {useState} from "react";
import {ScrollView} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";
import Icons from "react-native-vector-icons/Ionicons";

const LeaderboardScreen = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    axios.get("https://groove-game-be.onrender.com/api/scores").then((resp) => {
      setLeaderboardData(resp.data.data);
    });
  }, []);

  return (
    <ScrollView>
      <View style={[defaultPaddinTop, styles.container]}>
        <View style={backButton}>
          <TouchableOpacity
            style={styles.arrowBack}
            onPress={() => {
              navigation.navigate("Home"); // If the user is not logged in, the button will navigate them home
            }}
            color={
              Platform.OS === "android" ? colourTheme.secondaryColour : "white" // colour theme for Android
            }
          >
            <Icons name="arrow-back" size={18} color={"white"} />
            <Text style={styles.backButtonText}>Back to home</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.leaderboard}>Leaderboard</Text>
        {leaderboardData.map((data, index) => {
          return (
            <View key={index} style={styles.resultContainer}>
              <Text style={styles.position}>{`${index + 1}`}</Text>
              <Text style={styles.user}>{`${data.username}`}</Text>
              <Text style={styles.score}>{`${data.score}`}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default LeaderboardScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colourTheme.primaryColour,
    alignItems: "center",
  },
  textCentre: {
    marginTop: 25,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: colourTheme.white,
  },
  leaderboard: {
    marginTop: 25,
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    color: colourTheme.white,
  },
  arrowBack: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  backButtonText: {
    color: colourTheme.white,
    fontSize: 16,
  },
  resultContainer: {
    flexDirection: "row",
    backgroundColor: colourTheme.secondaryColour,
    width: 350,
    padding: 10,
    margin: 5,
    alignItems: "center",
    borderRadius: 5,
    justifyContent: "flex-start",
  },
  user: {
    color: colourTheme.white,
    padding: 10,
    fontSize: 15,
    width: 230,
    backgroundColor: colourTheme.secondaryColour,
    padding: 10,
    borderColor: colourTheme.white,
    borderWidth: 3,
    borderRadius: 5,
    overflow: "hidden",
    marginHorizontal: 5,
  },
  score: {
    color: colourTheme.primaryColour,
    textAlign: "center",
    backgroundColor: colourTheme.highlightGreen,
    padding: 10,
    borderColor: colourTheme.white,
    borderWidth: 3,
    borderRadius: 5,
    overflow: "hidden",
    marginHorizontal: 5,
  },
  position: {
    color: colourTheme.primaryColour,
    textAlign: "center",
    backgroundColor: colourTheme.highlightPink,
    padding: 10,
    borderColor: colourTheme.white,
    borderWidth: 3,
    borderRadius: 5,
    overflow: "hidden",
    marginHorizontal: 5,
  },
});
