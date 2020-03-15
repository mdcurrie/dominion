const playerRequest = (state = null, action) => {
  let gainAmount;
  switch (action.type) {
    case "START_GAME":
      return action.playerRequest;
    case "SELECT_CARDS_IN_HAND":
    case "CHOICE_GAIN_CARDS":
      return action;
    case "COMPLETE_CHOICE_GAIN_CARDS":
      gainAmount = state.gainAmount - 1;
      if (gainAmount <= 0) {
        return null;
      } else {
        return { ...state, gainAmount };
      }
    case "COMPLETE_SELECT_CARDS_IN_HAND":
    case "END_TURN":
      return null;
    default:
      return state;
  }
};

export default playerRequest;
