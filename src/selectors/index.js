export const connectionsSelector = state => state.connections;

export const statusSelector = state => state.status;

export const numberOfConnectionsSelector = state => state.connections.length;

export const currentPlayerSelector = state => state.game.currentPlayer;

export const currentPlayerIdSelector = state => state.game.currentPlayer.id;

export const gameSupplySelector = state => state.game.supply;

export const gameSupplyCardCountSelector = (state, cardName) =>
  state.game.supply.find(c => c.name === cardName).count;

export const gamePlayersSelector = state => state.game.players;

export const gamePlayerSelector = state =>
  state.game.players.find(player => player.id === state.game.currentPlayer.id);

export const gamePlayerIdsSelector = state => state.game.players.map(p => p.id);

export const gamePlayerFromIdSelector = (state, id) =>
  state.game.players.find(player => player.id === id);

export const gameNextPlayerSelector = state => {
  const playerIndex = state.game.players.findIndex(
    player => player.id === state.game.currentPlayer.id
  );
  const nextPlayerIndex = (playerIndex + 1) % state.game.players.length;
  return state.game.players[nextPlayerIndex];
};

export const gameOtherPlayersIdsSelector = state =>
  state.game.players
    .filter(player => player.id !== state.game.currentPlayer.id)
    .map(player => player.id);

export const gameIsOverSelector = state =>
  state.game.supply.find(s => s.name === "Province").count === 0 ||
  state.game.supply.filter(s => s.count === 0).length >= 3;

export const gamePlayerRequestSelector = state => state.game.playerRequest;
