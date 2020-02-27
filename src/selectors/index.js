export const connectionsSelector = state => state.connections;

export const numberOfPlayersSelector = state => state.connections.length;

export const currentPlayerSelector = state => state.game.currentPlayer;

export const currentPlayerIdSelector = state => state.game.currentPlayer.id;

export const gameSupplySelector = state => state.game.supply;

export const gamePlayersSelector = state => state.game.players;
