const initialState = {
  supply: [],
  trash: [],
  players: [],
  currentPlayer: {
    id: null,
    actions: 0,
    buys: 0,
    gold: 0
  }
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case "START_GAME":
      return action.game;
    default:
      return state;
  }
};

export default game;
