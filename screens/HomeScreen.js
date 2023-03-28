import React from "react";
import { Touchable } from "react-native";
import { Text, View, Button } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet } from "react-native";

//navigation passed through props

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.userBtn}>
        <Button title="login"></Button>
      </View>
      <TextInput placeholder="username" style={styles.input} />
      <TextInput placeholder="password" style={styles.input} />
      <View style={styles.loginBtn}>
        <Button title="login" />
      </View>
      <Text style={styles.textCentre}>or create an account</Text>
      <Text style={styles.textCentre}>Choose a username and password</Text>

      <TextInput placeholder="name" style={styles.input} />
      <TextInput placeholder="username" style={styles.input} />
      <TextInput placeholder="password" style={styles.input} />
      <View style={styles.loginBtn}>
        <Button title="create account" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3C3B72",
  },
  userBtn: { backgroundColor: "white", width: 75 },
  input: {
    height: 50,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 25,
    borderWidth: 1,
    backgroundColor: "white",
    color: "black",
    textAlign: "center",
  },
  loginBtn: {
    flexDirection: "row",
    marginTop: 25,
    backgroundColor: "#6261b7",
    borderColor: "white",
    borderWidth: 2,
    width: 250,
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  textCentre: {
    marginTop: 25,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
});

export default HomeScreen;
