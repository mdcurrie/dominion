import { put, takeEvery, select } from "redux-saga/effects";
import {
  drawCards,
  gainActions,
  gainFloatingGold,
  playAction
} from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlayBazaar() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Bazaar",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(drawCards({ drawAmount: 1, id: player.id }));
  yield put(gainActions({ actionAmount: 2, id: player.id }));
  yield put(gainFloatingGold({ floatingGoldAmount: 1 }));
}

const bazaarSagas = [takeEvery("ASYNC_PLAY_BAZAAR", asyncPlayBazaar)];

export default bazaarSagas;
