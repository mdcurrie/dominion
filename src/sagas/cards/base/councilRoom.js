import { put, takeEvery, select } from "redux-saga/effects";
import { drawCards, playAction } from "../../../actions";
import {
  gameOtherPlayersIdsSelector,
  gamePlayerIdsSelector,
  gamePlayerSelector
} from "../../../selectors";

export function* asyncPlayCouncilRoom() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Council Room",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(drawCards({ drawAmount: 4, id: player.id }));
  yield asyncPlayCouncilRoomOthersDraw();
}

export function* asyncPlayCouncilRoomOthersDraw() {
  const otherPlayersIds = yield select(gameOtherPlayersIdsSelector);
  for (let id of otherPlayersIds) {
    yield put(drawCards({ drawAmount: 1, id }));
  }
}

const councilRoomSagas = [
  takeEvery("ASYNC_PLAY_COUNCIL_ROOM", asyncPlayCouncilRoom)
];

export default councilRoomSagas;
