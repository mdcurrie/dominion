import { put, takeEvery, select } from "redux-saga/effects";
import {
  playAction,
  selectCardsInHand,
  trashSelectedCards
} from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlayChapel() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Chapel",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(
    selectCardsInHand({
      id: player.id,
      logIds: player.id,
      minSelectAmount: 0,
      maxSelectAmount: 4,
      next: { type: "ASYNC_PLAY_CHAPEL_TRASH_CARDS" }
    })
  );
}

export function* asyncPlayChapelTrashCards({ cards, cardIndexes }) {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    trashSelectedCards({
      cards,
      cardIndexes,
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
}

const chapelSagas = [
  takeEvery("ASYNC_PLAY_CHAPEL", asyncPlayChapel),
  takeEvery("ASYNC_PLAY_CHAPEL_TRASH_CARDS", asyncPlayChapelTrashCards)
];

export default chapelSagas;
