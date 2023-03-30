import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { colourTheme, buttonTheme } from "../stylesheet";
import { RadioGroup } from "react-native-radio-button-group";
import { useState } from "react";
import RadioButton from "../components/RadioButton";

export default function App() {
  const data = [
    { value: "Apple" },
    { value: "Samsung" },
    { value: "Blackberry" },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Choose your favorite company: </Text>
      <RadioButton data={data} />
    </View>
  );
}

// const FilterScreen = () => {
//   const [radioButtons, setRadioButtons] = useState([
//     {
//       id: "1", // acts as primary key, should be unique and non-empty string
//       label: "Option 1",
//       value: "option1",
//     },
//     {
//       id: "2",
//       label: "Option 2",
//       value: "option2",
//     },
//   ]);

//   function onPressRadioButton(radioButtonsArray) {
//     setRadioButtons(radioButtonsArray);
//   }

//   return (
//     <View style={styles.container}>
//       <View style={buttonTheme}>
//         <Button color={colourTheme.white} title="Play"></Button>
//       </View>
//       <RadioGroup radioButtons={radioButtons} onPress={onPressRadioButton} />
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colourTheme.primaryColour,
    padding: 20,
  },
  paragraph: {
    fontWeight: "bold",
    color: colourTheme.white,
  },
});

//export default FilterScreen;
