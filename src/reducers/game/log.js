function createLogEntry(ids, text, type) {
  return { ids, text, type };
}

const log = (state = [], action) => {
  let selectText;
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
          `${action.username} revealed ${
            action.cards.length > 0 ? action.cards.join(", ") : "no cards"
          }.`,
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
    case "SELECT_CARDS_IN_HAND":
      if (action.minSelectAmount == action.maxSelectAmount) {
        selectText =
          action.maxSelectAmount === 1
            ? "1 card"
            : `${action.maxSelectAmount} cards`;
      } else if (action.maxSelectAmount == null) {
        selectText = "any number of cards";
      } else {
        selectText =
          action.maxSelectAmount === 1
            ? "up to 1 card"
            : `up to ${action.maxSelectAmount} cards`;
      }

      return [
        ...state,
        createLogEntry(
          action.logIds,
          `Please choose ${selectText} from your hand.`,
          "REQUEST"
        )
      ];
    case "PLACE_SELECTED_CARDS_IN_DECK":
      return [
        ...state,
        createLogEntry(
          action.logIds,
          `${action.username} placed ${
            action.cardIndexes.length === 1
              ? "1 card"
              : `${action.cardIndexes.length} cards`
          } on top of their deck.`,
          "INFO"
        )
      ];
    case "TRASH_CARDS_IN_LIMBO":
    case "TRASH_SELECTED_CARDS":
      return [
        ...state,
        createLogEntry(
          action.logIds,
          `${action.username} trashed ${
            action.cards.length > 0 ? action.cards.join(", ") : "no cards"
          }.`,
          "INFO"
        )
      ];
    case "SHOW_TRASH":
      return [
        ...state,
        createLogEntry(
          action.logIds,
          `Trash: ${action.trash.join(", ")}`,
          "INFO"
        )
      ];
    case "DISCARD_CARDS_IN_LIMBO":
    case "DISCARD_CARDS":
      return [
        ...state,
        createLogEntry(
          action.logIds,
          `${action.username} discarded ${
            action.cards.length > 0 ? action.cards.join(", ") : "no cards"
          }.`,
          "INFO"
        )
      ];
    case "MOVE_FROM_DISCARD_TO_DECK":
      return [
        ...state,
        createLogEntry(
          action.logIds,
          `${action.username} placed ${action.cardName} on top of their deck.`,
          "INFO"
        )
      ];
    case "PLAYER_DISCONNECT":
      return [
        ...state,
        createLogEntry(
          action.logIds,
          `${action.username} disconnected from the game.`,
          "ERROR"
        )
      ];
    case "ADD_SPECTATOR":
      return [
        ...state,
        createLogEntry(
          action.logIds,
          `${action.username} joined as a spectator!`,
          "MESSAGE"
        )
      ];
    default:
      return state;
  }
};

export default log;
