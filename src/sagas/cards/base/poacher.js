import { put, takeEvery, select } from "redux-saga/effects";
import {
  discardCards,
  drawCards,
  gainActions,
  gainFloatingGold,
  playAction,
  selectCardsInHand
} from "../../../actions";
import {
  gamePlayerIdsSelector,
  gamePlayerSelector,
  gameSupplySelector
} from "../../../selectors";

export function* asyncPlayPoacher() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Poacher",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(drawCards({ drawAmount: 1, id: player.id }));
  yield put(gainActions({ actionAmount: 1, id: player.id }));
  yield put(gainFloatingGold({ floatingGoldAmount: 1 }));
  yield asyncPoacherSelectCards();
}

export function* asyncPoacherSelectCards() {
  const player = yield select(gamePlayerSelector);
  const gameSupply = yield select(gameSupplySelector);
  const emptySupplyCount = gameSupply.filter(s => s.count === 0).length;
  if (emptySupplyCount == 0) {
    return;
  }

  yield put(
    selectCardsInHand({
      id: player.id,
      logIds: player.id,
      minSelectAmount: Math.min(player.cards.hand.length, emptySupplyCount),
      maxSelectAmount: Math.min(player.cards.hand.length, emptySupplyCount),
      next: { type: "ASYNC_PLAY_POACHER_DISCARD_CARDS" }
    })
  );
}

export function* asyncPoacherDiscardCards({ cards, cardIndexes }) {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    discardCards({
      cards,
      cardIndexes,
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
}

const poacherSagas = [
  takeEvery("ASYNC_PLAY_POACHER", asyncPlayPoacher),
  takeEvery("ASYNC_PLAY_POACHER_DISCARD_CARDS", asyncPoacherDiscardCards)
];

export default poacherSagas;
