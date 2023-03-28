import React from "react";
import { Touchable } from "react-native";
import { Text, View, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet } from "react-native";

//navigation passed through props

const HomeScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
      }}
    >
      <Text style={{ fontWeight: "bold" }}>Home Page</Text>

      <View
        style={{
          flex: 2,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Icon.Button
          name="home"
          onPress={() => navigation.navigate("Home")}
          size={24}
          style={{ Width: 10, justifyContent: "flex-end" }}
        ></Icon.Button>

        <Icon.Button
          name="user"
          onPress={() => navigation.navigate("UserLogin")}
        ></Icon.Button>

        <Icon.Button
          name="left"
          onPress={() => navigation.navigate("Home")}
        ></Icon.Button>

        {/* <Button title='Go to user login' onPress={() => navigation.navigate('UserLogin')}/> */}
      </View>
    </View>
  );
};

export default HomeScreen;
