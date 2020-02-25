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
  let playerIndex, player;
  switch (action.type) {
    case "START_GAME":
      return action.game;
    case "START_TURN":
      playerIndex = state.players.findIndex(
        player => player.id === state.currentPlayer.id
      );
      player = state.players[playerIndex];

      let hand = [...player.cards.deck].slice(0, 5);
      let deck = [...player.cards.deck].slice(5);
      let discard = [...player.cards.discard];
      let inplay = [];
      if (hand.length < 5) {
        deck = shuffle([...discard]);
        discard = [];
        hand.push(...deck.splice(0, 5 - hand.length));
      }

      return {
        ...state,
        players: [
          ...state.players.slice(0, playerIndex),
          { ...player, cards: { hand, deck, discard, inplay } },
          ...state.players.slice(playerIndex + 1)
        ],
        currentPlayer: { ...state.currentPlayer, actions: 1, buys: 0, gold: 0 }
      };
    case "END_TURN":
      playerIndex = state.players.findIndex(
        player => player.id === state.currentPlayer.id
      );
      player = state.players[playerIndex];

      return {
        ...state,
        players: [
          ...state.players.slice(0, playerIndex),
          {
            ...player,
            cards: {
              ...player.cards,
              hand: [],
              inplay: [],
              discard: [
                ...player.cards.discard,
                ...player.cards.hand,
                ...player.cards.inplay
              ]
            }
          },
          ...state.players.slice(playerIndex + 1)
        ]
      };
    case "MOVE_TO_NEXT_PLAYER":
      playerIndex = state.players.findIndex(
        player => player.id === state.currentPlayer.id
      );
      const nextPlayerIndex = (playerIndex + 1) % state.players.length;
      return {
        ...state,
        currentPlayer: {
          ...state.currentPlayer,
          id: state.players[nextPlayerIndex].id
        }
      };
    default:
      return state;
  }
};

export default game;
