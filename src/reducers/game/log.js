const log = (state = [], action) => {
  switch (action.type) {
    case "START_GAME":
      return action.log;
    case "END_TURN":
      return [...state, "", `-- ${action.nextUsername}'s turn --`];
    case "BUY_CARD":
      return [...state, `${action.username} bought a ${action.cardName}.`];
    case "ADD_TO_LOG":
      return [...state, action.entry];
    case "PLAY_ACTION":
    case "PLAY_TREASURE":
      return [...state, `${action.username} played a ${action.cardName}.`];
    case "BLOCK_ATTACK":
      return [...state, `${action.username} blocked the attack.`];
    case "REVEAL_CARDS":
      return [
        ...state,
        `${action.username} revealed ${action.cards.join(", ")}.`
      ];
    case "PLACE_IN_DECK":
      return [
        ...state,
        `${action.username} placed ${action.cardName} on top of their deck.`
      ];
    default:
      return state;
  }
};

export default log;
