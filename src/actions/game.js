export function startGame(game) {
  return {
    type: "START_GAME",
    ...game
  };
}

export function endTurn({ id, logIds, nextId, nextUsername }) {
  return {
    type: "END_TURN",
    id,
    logIds,
    nextId,
    nextUsername
  };
}

export function buyCard({ cardName, id, location, logIds, username }) {
  return {
    type: "BUY_CARD",
    cardName,
    id,
    location,
    logIds,
    username
  };
}

export function playTreasure({ cardName, id, logIds, username }) {
  return {
    type: "PLAY_TREASURE",
    cardName,
    id,
    logIds,
    username
  };
}

export function gainActions({ actionAmount, id }) {
  return { type: "GAIN_ACTIONS", actionAmount, id };
}

export function playAction({ cardName, id, logIds, username }) {
  return {
    type: "PLAY_ACTION",
    cardName,
    id,
    logIds,
    username
  };
}

export function drawCards({ drawAmount, id }) {
  return {
    type: "DRAW_CARDS",
    drawAmount,
    id
  };
}

export function gainCards({ cardName, gainAmount, id, location }) {
  return {
    type: "GAIN_CARDS",
    cardName,
    gainAmount,
    id,
    location
  };
}

export function gainBuys({ buyAmount }) {
  return { type: "GAIN_BUYS", buyAmount };
}

export function sendMessage({ entry, logIds }) {
  return {
    type: "SEND_MESSAGE",
    entry,
    logIds
  };
}

export function gainFloatingGold({ floatingGoldAmount }) {
  return {
    type: "GAIN_FLOATING_GOLD",
    floatingGoldAmount
  };
}

export function blockAttack({ logIds, username }) {
  return {
    type: "BLOCK_ATTACK",
    logIds,
    username
  };
}

export function trashCards({ cardName, id, trashAmount }) {
  return {
    type: "TRASH_CARDS",
    cardName,
    id,
    trashAmount
  };
}

export function revealCards({ cards, logIds, username }) {
  return {
    type: "REVEAL_CARDS",
    cards,
    logIds,
    username
  };
}

export function placeInDeck({ cardIndex, cardName, id, logIds, username }) {
  return {
    type: "PLACE_IN_DECK",
    cardIndex,
    cardName,
    id,
    logIds,
    username
  };
}

export function updateScore({ players }) {
  return {
    type: "UPDATE_SCORE",
    players
  };
}

export function completeChoiceGainCards({
  cardName,
  id,
  location,
  logIds,
  username
}) {
  return {
    type: "COMPLETE_CHOICE_GAIN_CARDS",
    cardName,
    id,
    location,
    logIds,
    username
  };
}

export function completeSelectCardsInHand() {
  return { type: "COMPLETE_SELECT_CARDS_IN_HAND" };
}

export function discardCards({ cards, cardIndexes, id, logIds, username }) {
  return { type: "DISCARD_CARDS", cards, cardIndexes, id, logIds, username };
}
