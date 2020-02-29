import cardPrices from "../../utils/cardPrices";

const currentPlayer = (
  state = {
    id: null,
    actions: 0,
    buys: 0,
    gold: 0
  },
  action
) => {
  const treasuresToValue = { Copper: 1, Silver: 2, Gold: 3 };
  switch (action.type) {
    case "START_GAME":
      return action.currentPlayer;
    case "PLAY_ACTION":
      return {
        ...state,
        actions: state.actions - 1
      };
    case "BUY_CARD":
      return {
        ...state,
        buys: state.buys - 1,
        gold: state.gold - cardPrices[action.cardName]
      };
    case "END_TURN":
      return { id: action.nextPlayerId, actions: 1, buys: 1, gold: 0 };
    case "PLAY_TREASURE":
      return { ...state, gold: state.gold + treasuresToValue[action.cardName] };
    default:
      return state;
  }
};

export default currentPlayer;
