import React from "react";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserLoginScreen } from "./screens/UserLoginScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* navigator contains the screens to be navigated between */}
      <Stack.Navigator initialRouteName="Home">
        {/* name is what Screen will be referred to as when navigating from another Screen 
        component refers to the component to be rendered
        options are the props
        */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Groove Game",
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: "#6261b7",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="UserLogin"
          component={UserLoginScreen}
          options={{
            title: "Groove Game",
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
