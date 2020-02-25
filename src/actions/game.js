export function startGame(game) {
  return {
    type: "START_GAME",
    game
  };
}

export function startTurn() {
  return {
    type: "START_TURN"
  };
}

export function endTurn() {
  return {
    type: "END_TURN"
  };
}

export function moveToNextPlayer() {
  return {
    type: "MOVE_TO_NEXT_PLAYER"
  };
}

export function buyCard({ name, id }) {
  return {
    type: "BUY_CARD",
    name,
    id
  };
}
