import React, { useContext } from "react";
import { Text, View, Button } from "react-native";
import userContext from "../context/userContext";

const UserProfile = () => {
  const { user, setUser } = useContext(userContext);
  return (
    <View>
      <Text style={{ color: "white" }}>{user}</Text>
      <Button
        onPress={() => {
          setUser("");
        }}
        title="logout"
      >
        logout
      </Button>
    </View>
  );
};

export default UserProfile;
