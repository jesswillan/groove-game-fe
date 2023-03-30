import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyTabs from "./components/MyTabs";
import userContext from "./context/userContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = React.useState("");

  return (
    <NavigationContainer>
      <userContext.Provider value={{ user, setUser }}>
        {/* navigator contains the screens to be navigated between */}
        <MyTabs />
      </userContext.Provider>
    </NavigationContainer>
  );
}
