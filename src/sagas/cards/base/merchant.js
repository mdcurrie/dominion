import { put, takeEvery, select } from "redux-saga/effects";
import { drawCards, gainActions, playAction } from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlayMerchant() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Merchant",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(drawCards({ drawAmount: 1, id: player.id }));
  yield put(gainActions({ actionAmount: 1, id: player.id }));
}

const merchantSagas = [takeEvery("ASYNC_PLAY_MERCHANT", asyncPlayMerchant)];

export default merchantSagas;
