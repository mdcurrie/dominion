import { put, takeEvery, select } from "redux-saga/effects";
import { playTreasure } from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlayCopper() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playTreasure({
      cardName: "Copper",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
}

const copperSagas = [takeEvery("ASYNC_PLAY_COPPER", asyncPlayCopper)];

export default copperSagas;
