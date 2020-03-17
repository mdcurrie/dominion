import { put, takeEvery, select } from "redux-saga/effects";
import { choiceGainCards, playAction } from "../../../actions";
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
  yield put(
    choiceGainCards({
      gainAmount: 1,
      id: player.id,
      location: "DISCARD",
      maxCost: 4
    })
  );
}

const workshopSagas = [takeEvery("ASYNC_PLAY_WORKSHOP", asyncPlayWorkshop)];

export default workshopSagas;
