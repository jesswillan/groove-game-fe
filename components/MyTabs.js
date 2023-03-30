import React from "react";
// Tab Navigator
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// screens
import HomeScreen from "../screens/HomeScreen";
import UserLoginScreen from "../screens/UserLoginScreen";
import FilterScreen from "../screens/FilterScreen";
// icons
import Icons from "react-native-vector-icons/Ionicons";
// colour theme
import { colourTheme } from "../stylesheet";

// creates Tab navigator
const Tab = createBottomTabNavigator();

export const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Game") {
            iconName = focused ? "musical-notes" : "musical-notes-outline";
          } else {
            iconName = focused ? "person" : "person-outline";
          }
          return <Icons name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: colourTheme.primaryColour,
        tabBarInactiveTintColor: colourTheme.secondaryColour,
      })}
    >
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Game"
        component={FilterScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="UserLogin"
        component={UserLoginScreen}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
