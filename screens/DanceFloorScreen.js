import { Button, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const DanceFloorScreen = () => {
  const navigate = useNavigation();
  return (
    <View>
      <Button onPress={() => navigate.navigate("Tabs")} title="click" />
    </View>
  );
};

export default DanceFloorScreen;
