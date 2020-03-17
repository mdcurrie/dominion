import { put, takeEvery, select } from "redux-saga/effects";
import { drawCards, playAction } from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlayMoat() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Moat",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(drawCards({ drawAmount: 2, id: player.id }));
}

const moatSagas = [takeEvery("ASYNC_PLAY_MOAT", asyncPlayMoat)];

export default moatSagas;
