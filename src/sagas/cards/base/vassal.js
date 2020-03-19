import { put, takeEvery, select } from "redux-saga/effects";
import {
  discardCards,
  drawCards,
  gainFloatingGold,
  playAction
} from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlayVassal() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Vassal",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(gainFloatingGold({ floatingGoldAmount: 2 }));
  yield asyncPlayVassalDiscard();
}

export function* asyncPlayVassalDiscard() {
  let player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);
  const handCount = player.cards.hand.length;
  yield put(drawCards({ drawAmount: 1, id: player.id }));
  player = yield select(gamePlayerSelector);
  if (handCount == player.cards.hand.length) {
    return;
  }

  yield put(
    discardCards({
      cards: player.cards.hand.slice(handCount),
      cardIndexes: [handCount],
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
}

const vassalSagas = [takeEvery("ASYNC_PLAY_VASSAL", asyncPlayVassal)];

export default vassalSagas;
