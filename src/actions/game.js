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
