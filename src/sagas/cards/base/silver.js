import { put, takeEvery, select } from "redux-saga/effects";
import { gainFloatingGold, playTreasure } from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlaySilver({ cardIndex }) {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  if (
    player.cards.inplay.includes("Merchant") &&
    !player.cards.inplay.includes("Silver")
  ) {
    yield put(gainFloatingGold({ floatingGoldAmount: 1 }));
  }

  yield put(
    playTreasure({
      cardName: "Silver",
      cardIndex: cardIndex,
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
}

const silverSagas = [takeEvery("ASYNC_PLAY_SILVER", asyncPlaySilver)];

export default silverSagas;
