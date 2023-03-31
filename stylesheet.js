const colourTheme = {
  primaryColour: '#1b163d',
  secondaryColour: '#3c3b72',
  highlightGreen: '#5adf4e',
  highlightBlue: '#3edde8',
  highlightPink: '#FF78C1',
  white: '#fff',
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
  height: 50,
  borderRadius: 30,
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const radioButtonSelected = {
  marginTop: 25,
  backgroundColor: colourTheme.primaryColour,
  borderColor: colourTheme.highlightBlue,
  borderBottomColor: colourTheme.highlightGreen,
  borderTopColor: colourTheme.highlightPink,
  borderWidth: 4,
  width: 250,
  height: 50,
  borderRadius: 30,
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
};

export {colourTheme, buttonTheme, radioButtonUnselected, radioButtonSelected};
