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
  borderColor: colourTheme.highlightBlue,
  borderBottomColor: colourTheme.highlightGreen,
  borderTopColor: colourTheme.highlightPink,
  borderWidth: 4,
  width: 250,
  height: 50,
  borderRadius: 10,
  justifyContent: "center",
  marginLeft: "auto",
  marginRight: "auto",
};
const logoutButtonTheme = {
  marginTop: 25,
  backgroundColor: colourTheme.highlightPink,
  borderColor: colourTheme.white,
  borderWidth: 4,
  width: 200,
  height: 50,
  borderRadius: 10,
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
};
const radioButtonUnselected = {
  marginTop: 25,
  backgroundColor: colourTheme.secondaryColour,
  borderColor: colourTheme.highlightGreen,
  borderBottomColor: colourTheme.highlightPink,
  borderTopColor: colourTheme.highlightBlue,
  borderWidth: 4,
  width: 250,
  height: 40,
  borderRadius: 30,
  justifyContent: "center",
  marginLeft: "auto",
  marginRight: "auto",
};

const radioButtonSelected = {
  marginTop: 25,
  backgroundColor: colourTheme.primaryColour,
  borderColor: colourTheme.highlightBlue,
  borderBottomColor: colourTheme.highlightGreen,
  borderTopColor: colourTheme.highlightPink,
  borderWidth: 4,
  width: 250,
  height: 40,
  borderRadius: 30,
  justifyContent: "center",
  marginLeft: "auto",
  marginRight: "auto",
};

// checks if device is ios or android and adds padding top depending on the device
const defaultPaddinTop = {
  paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight,
};

export {
  colourTheme,
  buttonTheme,
  defaultPaddinTop,
  radioButtonUnselected,
  radioButtonSelected,
  logoutButtonTheme
};
