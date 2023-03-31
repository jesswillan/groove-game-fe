import { Platform, StatusBar } from "react-native";

const colourTheme = {
  primaryColour: "#1b163d",
  secondaryColour: "#3c3b72",
  highlightGreen: "#5adf4e",
  highlightBlue: "#3edde8",
  highlightPink: "#FF78C1",
  white: "#fff",
};

const buttonTheme = {
  marginTop: 25,
  backgroundColor: colourTheme.secondaryColour,
  borderColor: colourTheme.white,
  borderWidth: 2,
  width: 250,
  height: 50,
  borderRadius: 20,
  justifyContent: "center",
  marginLeft: "auto",
  marginRight: "auto",
};
// checks if device is ios or android and adds padding top depending on the device
const defaultPaddinTop = {
  paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight,
};

export { colourTheme, buttonTheme, defaultPaddinTop };
