export function startGame(game) {
  return {
    type: "START_GAME",
    ...game
  };
}

export function endTurn({ currentPlayerId, nextPlayerId, nextPlayerUsername }) {
  return {
    type: "END_TURN",
    currentPlayerId,
    nextPlayerId,
    nextPlayerUsername
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
