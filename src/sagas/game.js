import { put, takeEvery, select } from "redux-saga/effects";
import {
  currentPlayerIdSelector,
  currentPlayerSelector,
  gameSupplySelector,
  gamePlayerSelector,
  gamePlayersSelector
} from "../selectors";
import { buyCard, endTurn, playTreasure } from "../actions";
import cardPrices from "../utils/cardPrices";

export function* asyncBuyCard({ id, name: cardName }) {
  const currentPlayer = yield select(currentPlayerSelector);
  const supply = yield select(gameSupplySelector);
  const players = yield select(gamePlayersSelector);
  const currentPlayerUsername = players.find(p => p.id === id).username;
  const cardCount = supply.find(c => c.name === cardName).count;
  if (
    currentPlayer.id !== id ||
    currentPlayer.buys <= 0 ||
    cardCount <= 0 ||
    currentPlayer.gold < cardPrices[cardName]
  ) {
    return;
  }

  yield put(buyCard({ id, cardName, username: currentPlayerUsername }));
}

export function* asyncEndTurn({ id }) {
  const currentPlayerId = yield select(currentPlayerIdSelector);
  if (currentPlayerId !== id) {
    return;
  }

  const players = yield select(gamePlayersSelector);
  const currentPlayerIndex = players.findIndex(p => p.id === currentPlayerId);
  const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
  const nextPlayer = players[nextPlayerIndex];
  yield put(
    endTurn({
      currentPlayerId,
      nextPlayerId: nextPlayer.id,
      nextPlayerUsername: nextPlayer.username
    })
  );
}

export function* asyncPlayCard({ id, name: cardName }) {
  const currentPlayerId = yield select(currentPlayerIdSelector);
  const players = yield select(gamePlayersSelector);
  const currentPlayerUsername = players.find(p => p.id === id).username;
  if (currentPlayerId !== id) {
    return;
  }

  if (["Estate", "Duchy", "Province", "Gardens"].includes(cardName)) {
    return;
  }

  if (["Copper", "Silver", "Gold"].includes(cardName)) {
    yield put(playTreasure({ cardName, id, username: currentPlayerUsername }));
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

const gameSagas = [
  takeEvery("ASYNC_BUY_CARD", asyncBuyCard),
  takeEvery("ASYNC_END_TURN", asyncEndTurn),
  takeEvery("ASYNC_PLAY_CARD", asyncPlayCard),
  takeEvery("ASYNC_PLAY_ALL_TREASURES", asyncPlayAllTreasures)
];

export default gameSagas;
