import React, { useContext } from "react";
import { Text, View, Button, StyleSheet, SafeAreaView } from "react-native";
import userContext from "../context/userContext";
import Icons from "react-native-vector-icons/Ionicons";
import { colourTheme } from "../stylesheet";

const UserProfile = () => {
  const { user, setUser } = useContext(userContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.user}>
        <Icons name={"person"} color={colourTheme.white} size={50} />
        <Text style={{ color: "white", fontSize: 30 }}>{user}</Text>
      </View>
      <Button
        color={"red"}
        onPress={() => {
          setUser("");
        }}
        title="logout"
      >
        logout
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colourTheme.primaryColour,
    justifyContent: "flex-start",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    padding: 30,
  },
});

export default UserProfile;
