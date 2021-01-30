mport { put, takeEvery, select } from "redux-saga/effects";
import {
  discardCards,
  drawCards,
  gainActions,
  gainFloatingGold,
  playAction
} from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlayOasis() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Oasis",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(drawCards({ drawAmount: 1, id: player.id }));
  yield put(discardCards({ actionAmount: 1, id: player.id }));
  yield put(gainFloatingGold({ floatingGoldAmount: 1 }));
}

const oasisSagas = [takeEvery("ASYNC_PLAY_OASIS", asyncPlayOasis)];

export default oasisSagas;
