import { CARDS } from "../../utils/cards";

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
      return {
        ...state,
        buys: state.buys - 1,
        gold: state.gold - CARDS[action.cardName].cost
      };
    case "END_TURN":
      return { id: action.nextId, actions: 1, buys: 1, gold: 0 };
    case "GAIN_ACTIONS":
      return {
        ...state,
        actions: state.actions + action.actionAmount
      };
    case "GAIN_BUYS":
      return {
        ...state,
        buys: state.buys + action.buyAmount
      };
    case "GAIN_FLOATING_GOLD":
      return {
        ...state,
        gold: state.gold + action.floatingGoldAmount
      };
    case "PLAY_ACTION":
      return {
        ...state,
        actions: state.actions - 1
      };
    case "PLAY_TREASURE":
      return { ...state, gold: state.gold + CARDS[action.cardName].value };
    default:
      return state;
  }
};

export default currentPlayer;
