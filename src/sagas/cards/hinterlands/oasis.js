import { put, takeEvery, select } from "redux-saga/effects";
import {
  discardCards,
  drawCards,
  gainActions,
  gainFloatingGold,
  playAction
} from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlayOasis() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Oasis",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(drawCards({ drawAmount: 1, id: player.id }));
  yield put(gainActions({ actionAmount: 1, id: player.id }));
  yield put(gainFloatingGold({ floatingGoldAmount: 1 }));
  yield put(
    selectCardsInHand({
      id: player.id,
      logIds: player.id,
      minSelectAmount: 1,
      maxSelectAmount: 1,
      next: { type: "ASYNC_PLAY_OASIS_DISCARD" }
    })
  );
}

export function* asyncPlayOasisDiscard({ cards, cardIndexes }) {
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

const oasisSagas = [
  takeEvery("ASYNC_PLAY_OASIS", asyncPlayOasis),
  takeEvery("ASYNC_PLAY_OASIS_DISCARD", asyncPlayOasisDiscard)
];

export default oasisSagas;
