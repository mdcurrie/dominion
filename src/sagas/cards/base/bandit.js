import { put, takeEvery, select } from "redux-saga/effects";
import { blockAttack, playAction } from "../../../actions";
import { asyncGainCards } from "../../game";
import {
  gameOtherPlayersIdsSelector,
  gamePlayerFromIdSelector,
  gamePlayerIdsSelector,
  gamePlayerSelector
} from "../../../selectors";

export function* asyncPlayBandit() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Bandit",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield asyncGainCards({
    cardName: "Gold",
    gainAmount: 1,
    id: player.id,
    location: "DISCARD"
  });
  yield asyncPlayBanditReveal();
}

export function* asyncPlayBanditReveal() {
  const otherPlayersIds = yield select(gameOtherPlayersIdsSelector);
  const playerIds = yield select(gamePlayerIdsSelector);
  for (let id of otherPlayersIds) {
    let otherPlayer = yield select(gamePlayerFromIdSelector, id);
    if (otherPlayer.cards.hand.includes("Moat")) {
      yield put(
        blockAttack({ logIds: playerIds, username: otherPlayer.username })
      );
      continue;
    }
  }
}

const banditSagas = [takeEvery("ASYNC_PLAY_BANDIT", asyncPlayBandit)];

export default banditSagas;
