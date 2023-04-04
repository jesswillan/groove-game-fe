// question data
import { quesions } from "../questionsData";
// react components
import { Button, StyleSheet, Text, View, Platform } from "react-native";
// react/hooks
import React, { useContext, useState } from "react";
// custom styling objects
import { defaultPaddinTop, colourTheme, buttonTheme } from "../stylesheet";
// axios
import axios from "axios";
import userContext from "../context/userContext";
import { useNavigation } from "@react-navigation/native";

const QuizScreen = () => {
  // correct answers state
  const [correctCount, setCorrectCount] = useState(0);
  // number of questions state
  const [questionCount, setQuestionCount] = useState(0);
  // which random question displays state
  const [randQuestion, setRandomQuestion] = useState(
    Math.floor(Math.random() * quesions.length)
  );
  //
  const { user } = useContext(userContext);
  //
  const navigation = useNavigation();

  return (
    <View style={[defaultPaddinTop, styles.container, styles.centrePage]}>
      <View style={styles.centre}>
        {questionCount === 5 ? (
          <>
            <Text style={styles.text}>
              you answered {correctCount} / {questionCount}
            </Text>
            <View style={buttonTheme}>
              <Button
                onPress={() => {
                  axios
                    .post("https://groove-game-be.onrender.com/api/scores", {
                      username: user,
                      score: correctCount,
                    })
                    .then((resp) => navigation.navigate("Home"));
                }}
                color={
                  Platform.OS === "android"
                    ? colourTheme.secondaryColour
                    : "white"
                }
                title="submit results"
              />
            </View>
            <View style={buttonTheme}>
              <Button
                onPress={() => navigation.navigate("Home")}
                color={
                  Platform.OS === "android"
                    ? colourTheme.secondaryColour
                    : "white"
                }
                title="Home"
              />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.text}>{quesions[randQuestion].question}</Text>
            {quesions[randQuestion].potentialAnswers.map((answer) => {
              return (
                <View key={answer} style={buttonTheme}>
                  <Button
                    onPress={() => {
                      if (answer === quesions[randQuestion].correctAnswer) {
                        setCorrectCount((prev) => prev + 1);
                      }
                      setQuestionCount((prev) => prev + 1);
                      setRandomQuestion(() =>
                        Math.floor(Math.random() * quesions.length)
                      );
                    }}
                    color={
                      Platform.OS === "android"
                        ? colourTheme.secondaryColour
                        : "white"
                    }
                    title={answer}
                  ></Button>
                </View>
              );
            })}
            <Text style={styles.text}>correct answers : {correctCount}</Text>
            <Text style={styles.text}>
              number of questions : {questionCount}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colourTheme.primaryColour,
    flex: 1,
  },
  centre: {
    textAlign: "center",
    alignItems: "center",
  },
  text: { color: "white", fontSize: 25 },
  centrePage: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default QuizScreen;
