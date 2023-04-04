import React from "react";
// stack Navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// screen
import DanceFloorScreen from "./screens/DanceFloorScreen";
import QuizScreen from "./screens/QuizScreen";
// Bottom Navigator / Navbar
import MyTabs from "./components/MyTabs";
import LeaderboardScreen from "./screens/LeaderboardScreen";

// creates stackNavigator for buttons
const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Tabs"
        component={MyTabs}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="dance"
        component={DanceFloorScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="quiz"
        component={QuizScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="leaderboard"
        component={LeaderboardScreen}
      />
    </Stack.Navigator>
  );
}
