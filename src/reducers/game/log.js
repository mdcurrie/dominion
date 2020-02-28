const log = (state = [], action) => {
  switch (action.type) {
    case "START_GAME":
      return action.log;
    case "END_TURN":
      return [...state, "", `-- ${action.nextPlayerUsername}'s turn --`];
    case "BUY_CARD":
      return [...state, `${action.username} bought a ${action.cardName}`];
    case "ADD_TO_LOG":
      return [...state, action.entry];
    case "PLAY_TREASURE":
      return [...state, `${action.username} played a ${action.cardName}`];
    default:
      return state;
  }
};

export default log;
