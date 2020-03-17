import { put, takeEvery, select } from "redux-saga/effects";
import {
  gainActions,
  gainBuys,
  gainFloatingGold,
  playAction
} from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlayFestival() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Festival",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(gainActions({ actionAmount: 2, id: player.id }));
  yield put(gainBuys({ buyAmount: 1, id: player.id }));
  yield put(gainFloatingGold({ floatingGoldAmount: 2 }));
}

const festivalSagas = [takeEvery("ASYNC_PLAY_FESTIVAL", asyncPlayFestival)];

export default festivalSagas;
