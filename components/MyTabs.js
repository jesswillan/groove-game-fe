import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import UserLoginScreen from "../screens/UserLoginScreen";
import Icons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

//GameScreen takes us to filter page(Start of the game) - Currently leads to HomeScreen as filter screen hasnt been created
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
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Game" component={HomeScreen} />
      <Tab.Screen name="UserLogin" component={UserLoginScreen} />
    </Tab.Navigator>
  );
};

export default MyTabs;
