const initialState = {
  supply: [],
  trash: [],
  players: [],
  currentPlayerId: null
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
