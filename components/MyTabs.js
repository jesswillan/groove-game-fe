import React from "react";
// Tab Navigator
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// screens
import HomeScreen from "../screens/HomeScreen";
import UserLoginScreen from "../screens/UserLoginScreen";
//import FilterScreen from "../screens/FilterScreen";
import DanceFloorScreen from "../screens/DanceFloorScreen";
import FilterScreen from "../screens/FilterScreen";
// icons
import Icons from "react-native-vector-icons/Ionicons";
// colour theme
import { colourTheme } from "../stylesheet";

//imported all modules and library function from react

// creates Tab navigator
const Tab = createBottomTabNavigator();

export const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen" //initialise from the home screen
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"; //if icon name is home route to home screen
          } else if (route.name === "Game") {
            iconName = focused ? "musical-notes" : "musical-notes-outline"; //if icon name is game route to Game screen
          } else {
            iconName = focused ? "person" : "person-outline"; //else if none of the above two is preseed stay on the profile page
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
        component={HomeScreen} //if button tapped navigate to these screens
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Game"
        component={FilterScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="User Login"
        component={UserLoginScreen}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
