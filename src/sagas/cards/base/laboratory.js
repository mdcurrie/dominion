import { put, takeEvery, select } from "redux-saga/effects";
import { drawCards, gainActions, playAction } from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlayLaboratory() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Laboratory",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(drawCards({ drawAmount: 2, id: player.id }));
  yield put(gainActions({ actionAmount: 1, id: player.id }));
}

const laboratorySagas = [
  takeEvery("ASYNC_PLAY_LABORATORY", asyncPlayLaboratory)
];

export default laboratorySagas;
