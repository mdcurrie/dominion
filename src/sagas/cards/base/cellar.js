import { put, takeEvery, select } from "redux-saga/effects";
import {
  discardCards,
  drawCards,
  gainActions,
  playAction,
  selectCardsInHand
} from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlayCellar() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Cellar",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(gainActions({ actionAmount: 1, id: player.id }));
  yield put(
    selectCardsInHand({
      id: player.id,
      logIds: player.id,
      minSelectAmount: 0,
      maxSelectAmount: null,
      next: { type: "ASYNC_PLAY_CELLAR_DISCARD_AND_DRAW" }
    })
  );
}

export function* asyncPlayCellarDiscardAndDraw({ cards, cardIndexes }) {
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
  yield put(drawCards({ drawAmount: cards.length, id: player.id }));
}

const cellarSagas = [
  takeEvery("ASYNC_PLAY_CELLAR", asyncPlayCellar),
  takeEvery("ASYNC_PLAY_CELLAR_DISCARD_AND_DRAW", asyncPlayCellarDiscardAndDraw)
];

export default cellarSagas;
