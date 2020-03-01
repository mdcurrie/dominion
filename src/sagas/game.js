import { put, takeEvery, select } from "redux-saga/effects";
import {
  currentPlayerIdSelector,
  currentPlayerSelector,
  gameSupplyCardCountSelector,
  gameNextPlayerSelector,
  gameOtherPlayersIdsSelector,
  gamePlayerSelector,
  gamePlayersSelector
} from "../selectors";
import {
  buyCard,
  drawCards,
  endTurn,
  gainCards,
  gainFloatingGold,
  playAction,
  playTreasure
} from "../actions";
import cardPrices from "../utils/cardPrices";
import cardActions from "../utils/cardActions";

export function* asyncBuyCard({ id, name: cardName }) {
  let currentPlayer = yield select(currentPlayerSelector);
  const cardCount = yield select(gameSupplyCardCountSelector, cardName);
  if (
    currentPlayer.id !== id ||
    currentPlayer.buys <= 0 ||
    cardCount <= 0 ||
    currentPlayer.gold < cardPrices[cardName]
  ) {
    return;
  }

  const player = yield select(gamePlayerSelector);
  yield put(buyCard({ id, cardName, username: player.username }));

  currentPlayer = yield select(currentPlayerSelector);
  if (currentPlayer.buys === 0) {
    const nextPlayer = yield select(gameNextPlayerSelector);
    yield put(
      endTurn({
        id,
        nextId: nextPlayer.id,
        nextUsername: nextPlayer.username
      })
    );
  }
}

export function* asyncEndTurn({ id }) {
  const currentPlayerId = yield select(currentPlayerIdSelector);
  if (currentPlayerId !== id) {
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
  if (player.id !== id) {
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
  if (currentPlayerId !== id) {
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

export function* asyncOtherPlayersGainCards({ cardName, gainAmount }) {
  const otherPlayersIds = yield select(gameOtherPlayersIdsSelector);
  for (let id of otherPlayersIds) {
    let cardCount = yield select(gameSupplyCardCountSelector, cardName);
    yield put(
      gainCards({ cardName, gainAmount: Math.min(gainAmount, cardCount), id })
    );
  }
}

const gameSagas = [
  takeEvery("ASYNC_BUY_CARD", asyncBuyCard),
  takeEvery("ASYNC_END_TURN", asyncEndTurn),
  takeEvery("ASYNC_PLAY_CARD", asyncPlayCard),
  takeEvery("ASYNC_OTHER_PLAYERS_DRAW_CARDS", asyncOtherPlayersDrawCards),
  takeEvery("ASYNC_OTHER_PLAYERS_GAIN_CARDS", asyncOtherPlayersGainCards),
  takeEvery("ASYNC_PLAY_ALL_TREASURES", asyncPlayAllTreasures)
];

export default gameSagas;
