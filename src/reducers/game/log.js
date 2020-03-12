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
      return [
        ...state,
        createLogEntry(
          action.logIds,
          `${action.username} blocked the attack.`,
          "INFO"
        )
      ];
    case "REVEAL_CARDS":
      return [
        ...state,
        createLogEntry(
          action.logIds,
          `${action.username} revealed ${action.cards.join(", ")}.`,
          "INFO"
        )
      ];
    case "PLACE_IN_DECK":
      return [
        ...state,
        createLogEntry(
          action.logIds,
          `${action.username} placed ${action.cardName} on top of their deck.`,
          "INFO"
        )
      ];
    case "COMPLETE_CHOICE_GAIN_CARDS":
      return [
        ...state,
        createLogEntry(
          action.logIds,
          `${action.username} gained a ${action.cardName}.`,
          "INFO"
        )
      ];
    case "CHOICE_GAIN_CARDS":
      return [
        ...state,
        createLogEntry(
          action.id,
          `Please choose a card from the supply costing up to ${action.maxCost}.`,
          "REQUEST"
        )
      ];
    default:
      return state;
  }
};

export default log;
