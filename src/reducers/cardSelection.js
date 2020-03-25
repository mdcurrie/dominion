const cardSelection = (state = [], action) => {
  const index = state.indexOf(action.card);
  switch (action.type) {
    case "RESET_CARD_SELECTION":
      return [];
    case "PREGAME_CARD_SELECT":
      if (index === -1 && state.length >= 10) {
        return state;
      }

      if (index === -1) {
        return [...state, action.card];
      } else {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
    default:
      return state;
  }
};

export default cardSelection;
