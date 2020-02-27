const currentPlayer = (
  state = {
    id: null,
    actions: 0,
    buys: 0,
    gold: 0
  },
  action
) => {
  switch (action.type) {
    case "START_GAME":
      return action.currentPlayer;
    case "BUY_CARD":
      return { ...state, buys: state.buys - 1 };
    case "END_TURN":
      return { id: action.nextPlayerId, actions: 1, buys: 1, gold: 0 };
    default:
      return state;
  }
};

export default currentPlayer;
