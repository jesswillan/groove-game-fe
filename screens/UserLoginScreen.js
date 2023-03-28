import React from "react";

import { Text, View, Button, Image } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet } from "react-native";

//make sure to export function, not export default

export const UserLoginScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        padding: 10,
      }}
    >
      <View style={{ flex: 2, backgroundColor: "red" }}>
        <Text style={{ fontWeight: "bold" }}>User Profile Page</Text>
        <Image
          source={require("../img/user.png")}
          style={{
            width: 50,
            height: 50,
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        />
      </View>

      <Icon.Button
        name="home"
        onPress={() => navigation.navigate("Home")}
        size={24}
        style={{ Width: 10, justifyContent: "flex-end" }}
      ></Icon.Button>

      <Icon.Button
        name="user"
        onPress={() => navigation.navigate("UserLogin")}
        style={{ Width: 10, justifyContent: "flex-end" }}
      ></Icon.Button>

      <Icon.Button
        name="left"
        onPress={() => navigation.navigate("Home")}
        style={{ Width: 10, justifyContent: "flex-end" }}
      ></Icon.Button>
    </View>
  );
};

export default UserLoginScreen;
