const supply = (state = [], action) => {
  let cardIndex;
  switch (action.type) {
    case "START_GAME":
      return action.supply;
    case "COMPLETE_CHOICE_GAIN_CARDS":
    case "BUY_CARD":
      cardIndex = state.findIndex(c => c.name === action.cardName);
      return [
        ...state.slice(0, cardIndex),
        { ...state[cardIndex], count: state[cardIndex].count - 1 },
        ...state.slice(cardIndex + 1)
      ];
    case "GAIN_CARDS":
      cardIndex = state.findIndex(c => c.name === action.cardName);
      return [
        ...state.slice(0, cardIndex),
        {
          ...state[cardIndex],
          count: state[cardIndex].count - action.gainAmount
        },
        ...state.slice(cardIndex + 1)
      ];
    default:
      return state;
  }
};

export default supply;
