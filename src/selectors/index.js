export const connectionsSelector = state => state.connections;

export const numberOfPlayersSelector = state => state.connections.length;

export const currentPlayerSelector = state => state.game.currentPlayer;

export const currentPlayerIdSelector = state => state.game.currentPlayer.id;

export const gameSupplySelector = state => state.game.supply;

export const gameSupplyCardCountSelector = (state, cardName) =>
  state.game.supply.find(c => c.name === cardName).count;

export const gamePlayersSelector = state => state.game.players;

export const gamePlayerSelector = state =>
  state.game.players.find(player => player.id === state.game.currentPlayer.id);

export const gameNextPlayerSelector = (state, id) => {
  const playerIndex = state.game.players.findIndex(player => player.id === id);
  const nextPlayerIndex = (playerIndex + 1) % state.game.players.length;
  return state.game.players[nextPlayerIndex];
};
