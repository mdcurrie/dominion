import shuffle from "lodash/shuffle";

const players = (state = [], action) => {
  let player, playerIndex, hand, deck, discard, inplay, cardIndex, count;
  switch (action.type) {
    case "START_GAME":
      return action.players;
    case "COMPLETE_CHOICE_GAIN_CARDS":
    case "BUY_CARD":
      playerIndex = state.findIndex(player => player.id === action.id);
      player = state[playerIndex];
      discard = [...player.cards.discard];
      hand = [...player.cards.hand];

      if (action.location === "DISCARD") {
        discard.push(action.cardName);
      } else if (action.location === "HAND") {
        hand.push(action.cardName);
      }

      return [
        ...state.slice(0, playerIndex),
        {
          ...player,
          cards: {
            ...player.cards,
            discard,
            hand
          }
        },
        ...state.slice(playerIndex + 1)
      ];
    case "END_TURN":
      playerIndex = state.findIndex(player => player.id === action.id);
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
      playerIndex = state.findIndex(player => player.id === action.id);
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
      playerIndex = state.findIndex(player => player.id === action.id);
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
    case "GAIN_CARDS":
      playerIndex = state.findIndex(player => player.id === action.id);
      player = state[playerIndex];
      deck = [...player.cards.deck];
      discard = [...player.cards.discard];

      if (action.location === "DISCARD") {
        discard.push(...Array(action.gainAmount).fill(action.cardName));
      } else if (action.location === "DECK") {
        deck = [...Array(action.gainAmount).fill(action.cardName), ...deck];
      }

      return [
        ...state.slice(0, playerIndex),
        {
          ...player,
          cards: {
            ...player.cards,
            deck,
            discard
          }
        },
        ...state.slice(playerIndex + 1)
      ];
    case "TRASH_CARDS":
      playerIndex = state.findIndex(player => player.id === action.id);
      player = state[playerIndex];
      hand = [];

      count = 0;
      for (let card of player.cards.hand) {
        if (card === action.cardName) {
          count++;
        }
        if (card !== action.cardName) {
          hand.push(card);
        }

        if (card === action.cardName && count > action.trashAmount) {
          hand.push(card);
        }
      }

      return [
        ...state.slice(0, playerIndex),
        {
          ...player,
          cards: {
            ...player.cards,
            hand
          }
        },
        ...state.slice(playerIndex + 1)
      ];
    case "PLACE_IN_DECK":
      playerIndex = state.findIndex(player => player.id === action.id);
      player = state[playerIndex];

      return [
        ...state.slice(0, playerIndex),
        {
          ...player,
          cards: {
            ...player.cards,
            deck: [action.cardName, ...player.cards.deck],
            hand: [
              ...player.cards.hand.slice(0, action.cardIndex),
              ...player.cards.hand.slice(action.cardIndex + 1)
            ]
          }
        },
        ...state.slice(playerIndex + 1)
      ];
    case "PLACE_SELECTED_CARDS_IN_DECK":
      playerIndex = state.findIndex(player => player.id === action.id);
      player = state[playerIndex];

      return [
        ...state.slice(0, playerIndex),
        {
          ...player,
          cards: {
            ...player.cards,
            deck: [
              ...player.cards.hand.filter((card, index) =>
                action.cardIndexes.includes(index)
              ),
              ...player.cards.deck
            ],
            hand: player.cards.hand.filter(
              (card, index) => !action.cardIndexes.includes(index)
            )
          }
        },
        ...state.slice(playerIndex + 1)
      ];
    case "TRASH_SELECTED_CARDS":
      playerIndex = state.findIndex(player => player.id === action.id);
      player = state[playerIndex];

      return [
        ...state.slice(0, playerIndex),
        {
          ...player,
          cards: {
            ...player.cards,
            hand: player.cards.hand.filter(
              (card, index) => !action.cardIndexes.includes(index)
            )
          }
        },
        ...state.slice(playerIndex + 1)
      ];
    case "DISCARD_CARDS":
      playerIndex = state.findIndex(player => player.id === action.id);
      player = state[playerIndex];

      return [
        ...state.slice(0, playerIndex),
        {
          ...player,
          cards: {
            ...player.cards,
            hand: player.cards.hand.filter(
              (card, index) => !action.cardIndexes.includes(index)
            ),
            discard: [
              ...player.cards.discard,
              ...player.cards.hand.filter((card, index) =>
                action.cardIndexes.includes(index)
              )
            ]
          }
        },
        ...state.slice(playerIndex + 1)
      ];
    case "DRAW_FROM_DISCARD":
      playerIndex = state.findIndex(player => player.id === action.id);
      player = state[playerIndex];
      discard = [...player.cards.discard];
      hand = [...player.cards.hand, discard.pop()];

      return [
        ...state.slice(0, playerIndex),
        {
          ...player,
          cards: {
            ...player.cards,
            hand,
            discard
          }
        },
        ...state.slice(playerIndex + 1)
      ];
    case "MOVE_FROM_DISCARD_TO_DECK":
      playerIndex = state.findIndex(player => player.id === action.id);
      player = state[playerIndex];
      cardIndex = player.cards.discard.indexOf(action.cardName);

      return [
        ...state.slice(0, playerIndex),
        {
          ...player,
          cards: {
            ...player.cards,
            deck: [action.cardName, ...player.cards.deck],
            discard: [
              ...player.cards.discard.slice(0, cardIndex),
              ...player.cards.discard.slice(cardIndex + 1)
            ]
          }
        },
        ...state.slice(playerIndex + 1)
      ];
    case "MOVE_FROM_DECK_TO_LIMBO":
      playerIndex = state.findIndex(player => player.id === action.id);
      player = state[playerIndex];
      deck = [...player.cards.deck];
      discard = [...player.cards.discard];

      if (deck.length < action.drawAmount) {
        deck = [...deck, ...shuffle(discard)];
        discard = [];
      }

      return [
        ...state.slice(0, playerIndex),
        {
          ...player,
          cards: {
            ...player.cards,
            deck: deck.slice(action.drawAmount),
            discard,
            limbo: deck.slice(0, action.drawAmount)
          }
        },
        ...state.slice(playerIndex + 1)
      ];
    case "TRASH_CARDS_IN_LIMBO":
      playerIndex = state.findIndex(player => player.id === action.id);
      player = state[playerIndex];

      return [
        ...state.slice(0, playerIndex),
        {
          ...player,
          cards: {
            ...player.cards,
            limbo: player.cards.limbo.filter(
              (card, index) => !action.cardIndexes.includes(index)
            )
          }
        },
        ...state.slice(playerIndex + 1)
      ];
    case "DISCARD_CARDS_IN_LIMBO":
      playerIndex = state.findIndex(player => player.id === action.id);
      player = state[playerIndex];

      return [
        ...state.slice(0, playerIndex),
        {
          ...player,
          cards: {
            ...player.cards,
            discard: [
              ...player.cards.discard,
              ...player.cards.limbo.filter((card, index) =>
                action.cardIndexes.includes(index)
              )
            ],
            limbo: player.cards.limbo.filter(
              (card, index) => !action.cardIndexes.includes(index)
            )
          }
        },
        ...state.slice(playerIndex + 1)
      ];
    case "MOVE_FROM_LIMBO_TO_DECK":
      playerIndex = state.findIndex(player => player.id === action.id);
      player = state[playerIndex];

      return [
        ...state.slice(0, playerIndex),
        {
          ...player,
          cards: {
            ...player.cards,
            deck: [
              ...player.cards.limbo.filter((card, index) =>
                action.cardIndexes.includes(index)
              ),
              ...player.cards.deck
            ],
            limbo: player.cards.limbo.filter(
              (card, index) => !action.cardIndexes.includes(index)
            )
          }
        },
        ...state.slice(playerIndex + 1)
      ];
    default:
      return state;
  }
};

export default players;
