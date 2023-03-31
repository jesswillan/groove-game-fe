import React from "react";
// imports container for Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// navigation components
import StackNavigator from "./StackNavigator";
import MyTabs from "./components/MyTabs";
// global state for users
import userContext from "./context/userContext";
import songsGenre from "./context/songsGenre";
import globalSongArray from "./context/globalSongArray";
// initialises the stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = React.useState("");
  const [chosenGenre, setChosenGenre] = React.useState("pop");
  const [globalArray, setGlobalArray] = React.useState([]);

  return (
    <userContext.Provider value={{ user, setUser }}>
      <songsGenre.Provider value={{ chosenGenre, setChosenGenre }}>
        <globalSongArray.Provider value={{ globalArray, setGlobalArray }}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="StackNavigator" component={StackNavigator} />
              <Stack.Screen name="MyTabs" component={MyTabs} />
            </Stack.Navigator>
          </NavigationContainer>
        </globalSongArray.Provider>
      </songsGenre.Provider>
    </userContext.Provider>
  );
}
