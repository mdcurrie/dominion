import shuffle from "lodash/shuffle";

const initialState = {
  supply: [],
  trash: [],
  players: [],
  currentPlayer: {
    id: null,
    actions: 0,
    buys: 0,
    gold: 0
  },
  log: []
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case "START_GAME":
      return action.game;
    case "START_TURN":
      const playerIndex = state.players.findIndex(
        player => player.id === state.currentPlayer.id
      );
      const player = state.players[playerIndex];

      let hand = [...player.cards.deck].slice(0, 5);
      let deck = [...player.cards.deck].slice(5);
      let discard = [...player.cards.discard];
      if (hand.length < 5) {
        deck = shuffle([...discard]);
        discard = [];
        hand.push(...deck.splice(0, 5 - hand.length));
      }

      return {
        ...state,
        players: [
          ...state.players.slice(0, playerIndex),
          { ...player, hand, deck, discard },
          ...state.players.slice(playerIndex + 1)
        ],
        currentPlayer: { ...state.currentPlayer, actions: 1 }
      };
    default:
      return state;
  }
};

export default game;
