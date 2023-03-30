import React from "react";
// imports container for Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// navigation components
import StackNavigator from "./StackNavigator";
import MyTabs from "./components/MyTabs";
// global state for users
import userContext from "./context/userContext";
// initialises the stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = React.useState("");

  return (
    <userContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="StackNavigator" component={StackNavigator} />
          {/* navigator contains the screens to be navigated between */}
          <Stack.Screen name="MyTabs" component={MyTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </userContext.Provider>
  );
}
