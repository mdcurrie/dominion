import shuffle from "lodash/shuffle";

const players = (state = [], action) => {
  let player, playerIndex, hand, deck, discard, inplay, cardIndex;
  switch (action.type) {
    case "START_GAME":
      return action.players;
    case "BUY_CARD":
      playerIndex = state.findIndex(p => p.id === action.id);
      player = state[playerIndex];
      return [
        ...state.slice(0, playerIndex),
        {
          ...player,
          cards: {
            ...player.cards,
            discard: [...player.cards.discard, action.cardName]
          }
        },
        ...state.slice(playerIndex + 1)
      ];
    case "END_TURN":
      playerIndex = state.findIndex(p => p.id === action.currentPlayerId);
      player = state[playerIndex];

      hand = [...player.cards.deck].slice(0, 5);
      deck = [...player.cards.deck].slice(5);
      discard = [
        ...player.cards.discard,
        ...player.cards.inplay,
        ...player.cards.hand
      ];
      inplay = [];

      if (hand.length < 5) {
        deck = shuffle([...discard]);
        discard = [];
        hand.push(...deck.splice(0, 5 - hand.length));
      }

      return [
        ...state.slice(0, playerIndex),
        { ...player, cards: { hand, deck, discard, inplay } },
        ...state.slice(playerIndex + 1)
      ];
    case "PLAY_ACTION":
    case "PLAY_TREASURE":
      playerIndex = state.findIndex(p => p.id === action.id);
      player = state[playerIndex];
      cardIndex = player.cards.hand.findIndex(c => c === action.cardName);

      return [
        ...state.slice(0, playerIndex),
        {
          ...player,
          cards: {
            ...player.cards,
            hand: [
              ...player.cards.hand.slice(0, cardIndex),
              ...player.cards.hand.slice(cardIndex + 1)
            ],
            inplay: [...player.cards.inplay, action.cardName]
          }
        },
        ...state.slice(playerIndex + 1)
      ];
    case "DRAW_CARDS":
      playerIndex = state.findIndex(p => p.id === action.id);
      player = state[playerIndex];

      hand = [...player.cards.hand];
      deck = [...player.cards.deck];
      discard = [...player.cards.discard];
      if (deck.length < action.drawAmount) {
        deck = [...deck, ...shuffle(discard)];
        discard = [];
      }
      hand.push(...deck.splice(0, action.drawAmount));

      return [
        ...state.slice(0, playerIndex),
        { ...player, cards: { ...player.cards, hand, deck, discard } },
        ...state.slice(playerIndex + 1)
      ];
    default:
      return state;
  }
};

export default players;
