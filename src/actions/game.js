export function startGame(game) {
  return {
    type: "START_GAME",
    ...game
  };
}

export function endTurn({ id, nextId, nextUsername }) {
  return {
    type: "END_TURN",
    id,
    nextId,
    nextUsername
  };
}

export function buyCard({ cardName, id, username }) {
  return {
    type: "BUY_CARD",
    cardName,
    id,
    username
  };
}

export function playTreasure({ cardName, id, username }) {
  return {
    type: "PLAY_TREASURE",
    cardName,
    id,
    username
  };
}

export function playAction({ cardName, id, username }) {
  return {
    type: "PLAY_ACTION",
    cardName,
    id,
    username
  };
}
