import { put, takeEvery, select } from "redux-saga/effects";
import { drawCards, gainActions, playAction } from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlayVillage() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Village",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(drawCards({ drawAmount: 1, id: player.id }));
  yield put(gainActions({ actionAmount: 2, id: player.id }));
}

const villageSagas = [takeEvery("ASYNC_PLAY_VILLAGE", asyncPlayVillage)];

export default villageSagas;
