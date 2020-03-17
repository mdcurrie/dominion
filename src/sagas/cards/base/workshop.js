import { put, takeEvery, select } from "redux-saga/effects";
import { playAction } from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlayWorkshop() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Workshop",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
}

const workshopSagas = [takeEvery("ASYNC_PLAY_WORKSHOP", asyncPlayWorkshop)];

export default workshopSagas;
