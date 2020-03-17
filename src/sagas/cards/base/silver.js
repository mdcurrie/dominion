import { put, takeEvery, select } from "redux-saga/effects";
import { playTreasure } from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlaySilver() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playTreasure({
      cardName: "Silver",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
}

const silverSagas = [takeEvery("ASYNC_PLAY_SILVER", asyncPlaySilver)];

export default silverSagas;
