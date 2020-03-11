import { put, takeEvery, select } from "redux-saga/effects";
import {
  currentPlayerIdSelector,
  currentPlayerSelector,
  gameIsOverSelector,
  gameSupplyCardCountSelector,
  gameNextPlayerSelector,
  gameOtherPlayersIdsSelector,
  gamePlayerFromIdSelector,
  gamePlayerRequestSelector,
  gamePlayerSelector,
  gamePlayersSelector
} from "../selectors";
import {
  blockAttack,
  buyCard,
  completeChoiceGainCards,
  drawCards,
  endTurn,
  gainCards,
  gainFloatingGold,
  placeInDeck,
  playAction,
  playTreasure,
  revealCards,
  trashCards,
  updateScore
} from "../actions";
import cardPrices from "../utils/cardPrices";
import cardActions from "../utils/cardActions";

export function* asyncBuyCard({ id, name: cardName }) {
  let currentPlayer = yield select(currentPlayerSelector);
  const cardCount = yield select(gameSupplyCardCountSelector, cardName);
  const playerRequest = yield select(gamePlayerRequestSelector);
  if (
    currentPlayer.id !== id ||
    currentPlayer.buys <= 0 ||
    cardCount <= 0 ||
    currentPlayer.gold < cardPrices[cardName] ||
    playerRequest
  ) {
    return;
  }

  const player = yield select(gamePlayerSelector);
  yield put(buyCard({ id, cardName, username: player.username }));

  currentPlayer = yield select(currentPlayerSelector);
  if (currentPlayer.buys === 0) {
    yield asyncEndTurn({ id });
  }
}

export function* asyncEndTurn({ id }) {
  const currentPlayerId = yield select(currentPlayerIdSelector);
  if (currentPlayerId !== id) {
    return;
  }

  if (yield select(gameIsOverSelector)) {
    yield put(updateScore({ players: yield select(gamePlayersSelector) }));
    return;
  }

  const nextPlayer = yield select(gameNextPlayerSelector);
  yield put(
    endTurn({
      id,
      nextId: nextPlayer.id,
      nextUsername: nextPlayer.username
    })
  );
}

export function* asyncPlayCard({ id, name: cardName }) {
  const currentPlayer = yield select(currentPlayerSelector);
  const player = yield select(gamePlayerSelector);
  const playerRequest = yield select(gamePlayerRequestSelector);
  if (player.id !== id || playerRequest) {
    return;
  }

  if (["Estate", "Duchy", "Province", "Gardens", "Curse"].includes(cardName)) {
    return;
  }

  if (["Copper", "Silver", "Gold"].includes(cardName)) {
    if (
      player.cards.inplay.includes("Merchant") &&
      !player.cards.inplay.includes("Silver") &&
      cardName === "Silver"
    ) {
      yield put(gainFloatingGold({ floatingGoldAmount: 1 }));
    }
    yield put(playTreasure({ cardName, id, username: player.username }));
    return;
  }

  if (
    ["Copper", "Silver", "Gold"].some(c => player.cards.inplay.includes(c)) ||
    currentPlayer.actions <= 0
  ) {
    return;
  }

  yield put(playAction({ cardName, id, username: player.username }));
  for (let cardAction of cardActions[cardName]) {
    let { type, data } = cardAction;
    yield put({ type, id, ...data });
  }
}

export function* asyncPlayAllTreasures({ id }) {
  const currentPlayerId = yield select(currentPlayerIdSelector);
  const players = yield select(gamePlayersSelector);
  const currentPlayerUsername = players.find(p => p.id === id).username;
  const playerRequest = yield select(gamePlayerRequestSelector);
  if (currentPlayerId !== id || playerRequest) {
    return;
  }

  while ((yield select(gamePlayerSelector)).cards.hand.includes("Gold")) {
    yield put(
      playTreasure({
        cardName: "Gold",
        id: currentPlayerId,
        username: currentPlayerUsername
      })
    );
  }

  while ((yield select(gamePlayerSelector)).cards.hand.includes("Silver")) {
    yield put(
      playTreasure({
        cardName: "Silver",
        id: currentPlayerId,
        username: currentPlayerUsername
      })
    );
  }

  while ((yield select(gamePlayerSelector)).cards.hand.includes("Copper")) {
    yield put(
      playTreasure({
        cardName: "Copper",
        id: currentPlayerId,
        username: currentPlayerUsername
      })
    );
  }
}

export function* asyncOtherPlayersDrawCards({ drawAmount }) {
  const otherPlayersIds = yield select(gameOtherPlayersIdsSelector);
  for (let id of otherPlayersIds) {
    yield put(drawCards({ drawAmount, id }));
  }
}

export function* asyncOtherPlayersGainCards({
  blockable,
  cardName,
  gainAmount,
  location
}) {
  const otherPlayersIds = yield select(gameOtherPlayersIdsSelector);
  for (let id of otherPlayersIds) {
    let otherPlayer = yield select(gamePlayerFromIdSelector, id);
    if (blockable && otherPlayer.cards.hand.includes("Moat")) {
      yield put(blockAttack({ username: otherPlayer.username }));
      continue;
    }

    let cardCount = yield select(gameSupplyCardCountSelector, cardName);
    yield put(
      gainCards({
        cardName,
        gainAmount: Math.min(gainAmount, cardCount),
        id,
        location
      })
    );
  }
}

export function* asyncTrashCards({ cardName, id, onTrash, trashAmount }) {
  const player = yield select(gamePlayerSelector);
  const inHandAmount = player.cards.hand.filter(c => c === cardName).length;

  yield put(
    trashCards({
      cardName,
      id,
      trashAmount: Math.min(trashAmount, inHandAmount)
    })
  );

  if (inHandAmount >= trashAmount) {
    const { type, data } = onTrash;
    yield put({ type, ...data });
  }
}

export function* asyncGainCards({ cardName, gainAmount, id, location }) {
  const cardCount = yield select(gameSupplyCardCountSelector, cardName);
  yield put(
    gainCards({
      cardName,
      gainAmount: Math.min(gainAmount, cardCount),
      id,
      location
    })
  );
}

export function* asyncOtherPlayersRevealVictory({ blockable, onReveal }) {
  const otherPlayersIds = yield select(gameOtherPlayersIdsSelector);
  for (let id of otherPlayersIds) {
    let otherPlayer = yield select(gamePlayerFromIdSelector, id);
    if (blockable && otherPlayer.cards.hand.includes("Moat")) {
      yield put(blockAttack({ username: otherPlayer.username }));
      continue;
    }

    const cardIndex = otherPlayer.cards.hand.findIndex(c =>
      ["Estate", "Duchy", "Province", "Gardens"].includes(c)
    );
    if (cardIndex === -1) {
      yield put(
        revealCards({
          cards: otherPlayer.cards.hand,
          username: otherPlayer.username
        })
      );
    } else {
      if (onReveal && onReveal.type === "PLACE_IN_DECK") {
        yield put(
          placeInDeck({
            cardIndex,
            cardName: otherPlayer.cards.hand[cardIndex],
            id: otherPlayer.id,
            username: otherPlayer.username
          })
        );
      }
    }
  }
}

export function* asyncCompleteChoiceGainCards({ id, name: cardName }) {
  const cardCount = yield select(gameSupplyCardCountSelector, cardName);
  const playerRequest = yield select(gamePlayerRequestSelector);
  const player = yield select(gamePlayerSelector);
  if (
    cardCount <= 0 ||
    playerRequest == null ||
    playerRequest.id !== id ||
    playerRequest.type !== "CHOICE_GAIN_CARDS" ||
    playerRequest.gainAmount <= 0 ||
    playerRequest.maxCost < cardPrices[cardName]
  ) {
    return;
  }

  yield put(
    completeChoiceGainCards({ id, cardName, username: player.username })
  );
}

const gameSagas = [
  takeEvery("ASYNC_BUY_CARD", asyncBuyCard),
  takeEvery("ASYNC_GAIN_CARDS", asyncGainCards),
  takeEvery("ASYNC_END_TURN", asyncEndTurn),
  takeEvery("ASYNC_PLAY_CARD", asyncPlayCard),
  takeEvery("ASYNC_OTHER_PLAYERS_DRAW_CARDS", asyncOtherPlayersDrawCards),
  takeEvery("ASYNC_OTHER_PLAYERS_GAIN_CARDS", asyncOtherPlayersGainCards),
  takeEvery(
    "ASYNC_OTHER_PLAYERS_REVEAL_VICTORY",
    asyncOtherPlayersRevealVictory
  ),
  takeEvery("ASYNC_PLAY_ALL_TREASURES", asyncPlayAllTreasures),
  takeEvery("ASYNC_TRASH_CARDS", asyncTrashCards),
  takeEvery("ASYNC_COMPLETE_CHOICE_GAIN_CARDS", asyncCompleteChoiceGainCards)
];

export default gameSagas;
