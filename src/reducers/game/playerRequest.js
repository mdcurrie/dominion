const playerRequest = (state = null, action) => {
  switch (action.type) {
    case "START_GAME":
      return action.playerRequest;
    case "CHOICE_GAIN_CARDS":
      return action;
    default:
      return state;
  }
};

export default playerRequest;
