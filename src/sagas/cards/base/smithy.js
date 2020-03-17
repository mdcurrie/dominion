import { put, takeEvery, select } from "redux-saga/effects";
import { drawCards, playAction } from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlaySmithy() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Smithy",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(drawCards({ drawAmount: 3, id: player.id }));
}

const smithySagas = [takeEvery("ASYNC_PLAY_SMITHY", asyncPlaySmithy)];

export default smithySagas;
