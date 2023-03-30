import React from "react";
// stack Navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// screen
import DanceFloorScreen from "./screens/DanceFloorScreen";
// Bottom Navigator / Navbar
import MyTabs from "./components/MyTabs";

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
    </Stack.Navigator>
  );
}
