function createLogEntry(ids, text, type) {
  return { ids, text, type };
}

const log = (state = [], action) => {
  switch (action.type) {
    case "START_GAME":
      return action.log;
    case "END_TURN":
      return [
        ...state,
        createLogEntry(action.logIds, "", "INFO"),
        createLogEntry(
          action.logIds,
          `-- ${action.nextUsername}'s turn --`,
          "INFO"
        )
      ];
    case "BUY_CARD":
      return [
        ...state,
        createLogEntry(
          action.logIds,
          `${action.username} bought a ${action.cardName}.`,
          "INFO"
        )
      ];
    case "SEND_MESSAGE":
      return [...state, createLogEntry(action.logIds, action.entry, "MESSAGE")];
    case "PLAY_ACTION":
    case "PLAY_TREASURE":
      return [
        ...state,
        createLogEntry(
          action.logIds,
          `${action.username} played a ${action.cardName}.`,
          "INFO"
        )
      ];
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
    case "COMPLETE_CHOICE_GAIN_CARDS":
      return [...state, `${action.username} gained a ${action.cardName}.`];
    default:
      return state;
  }
};

export default log;
