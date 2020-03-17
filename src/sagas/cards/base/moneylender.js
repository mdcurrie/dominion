import { put, takeEvery, select } from "redux-saga/effects";
import { gainFloatingGold, playAction, trashCards } from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlayMoneylender() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Moneylender",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield asyncPlayMoneylenderTrash();
}

export function* asyncPlayMoneylenderTrash() {
  const player = yield select(gamePlayerSelector);
  const copperCount = player.cards.hand.filter(c => c === "Copper").length;
  if (copperCount >= 1) {
    yield put(
      trashCards({
        cardName: "Copper",
        id: player.id,
        trashAmount: 1
      })
    );
    yield put(gainFloatingGold({ floatingGoldAmount: 3 }));
  }
}

const moneylenderSagas = [
  takeEvery("ASYNC_PLAY_MONEYLENDER", asyncPlayMoneylender)
];

export default moneylenderSagas;
