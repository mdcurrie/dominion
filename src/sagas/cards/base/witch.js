import { put, takeEvery, select } from "redux-saga/effects";
import { blockAttack, drawCards, playAction } from "../../../actions";
import { asyncGainCards } from "../../game";
import {
  gameOtherPlayersIdsSelector,
  gamePlayerFromIdSelector,
  gamePlayerIdsSelector,
  gamePlayerSelector
} from "../../../selectors";

export function* asyncPlayWitch() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Witch",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(drawCards({ drawAmount: 2, id: player.id }));
  yield asyncPlayWitchGainCurse();
}

export function* asyncPlayWitchGainCurse() {
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

    yield asyncGainCards({
      cardName: "Curse",
      gainAmount: 1,
      id: otherPlayer.id,
      location: "DISCARD"
    });
  }
}

const witchSagas = [takeEvery("ASYNC_PLAY_WITCH", asyncPlayWitch)];

export default witchSagas;
