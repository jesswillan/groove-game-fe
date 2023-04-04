// question data
import { quesions } from "../questionsData";
// react components
import { Button, StyleSheet, Text, View, Platform } from "react-native";
// react/hooks
import React, { useContext, useState } from "react";
// custom styling objects
import { defaultPaddinTop, colourTheme, buttonTheme, quizButton } from "../stylesheet";
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
            <Text style={styles.questionCount}>
              Question {questionCount+1} / 5
            </Text>
            <Text style={styles.question}>
              {quesions[randQuestion].question}
            </Text>
            {quesions[randQuestion].potentialAnswers.map((answer) => {
              return (
                <View
                  key={answer}
                  style={[quizButton, {color: colourTheme.primaryColour}]}
                >
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
                        ? colourTheme.highlightBlue
                        : colourTheme.primaryColour
                    }
                    title={answer}
                  ></Button>
                </View>
              );
            })}
            <Text style={styles.score}>
              Correct answers : {correctCount}
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
  question: {
    color: colourTheme.white,
    fontSize: 23,
    padding: 15,
  },
  score: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
  },
  questionCount: {
    color: 'white',
    fontSize: 20,
  },
});

export default QuizScreen;
