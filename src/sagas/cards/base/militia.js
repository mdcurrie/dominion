import { put, takeEvery, select } from "redux-saga/effects";
import {
  blockAttack,
  discardCards,
  gainFloatingGold,
  playAction,
  selectCardsInHand
} from "../../../actions";
import {
  gameOtherPlayersIdsSelector,
  gamePlayerFromIdSelector,
  gamePlayerIdsSelector,
  gamePlayerSelector
} from "../../../selectors";

export function* asyncPlayMilitia() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);
  const otherPlayersIds = yield select(gameOtherPlayersIdsSelector);

  yield put(
    playAction({
      cardName: "Militia",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(gainFloatingGold({ floatingGoldAmount: 2 }));
  if (otherPlayersIds.length > 0) {
    yield asyncPlayMilitiaSelectCards({ id: otherPlayersIds[0] });
  }
}

export function* asyncPlayMilitiaSelectCards({ id }) {
  const playerIds = yield select(gamePlayerIdsSelector);
  const otherPlayersIds = yield select(gameOtherPlayersIdsSelector);
  const otherPlayer = yield select(gamePlayerFromIdSelector, id);
  const idIndex = otherPlayersIds.indexOf(id);
  const nextId =
    idIndex !== otherPlayersIds.length - 1
      ? otherPlayersIds[idIndex + 1]
      : null;

  if (otherPlayer.cards.hand.includes("Moat")) {
    yield put(
      blockAttack({ logIds: playerIds, username: otherPlayer.username })
    );
    if (nextId) {
      yield asyncPlayMilitiaSelectCards({ id: nextId });
    }
  } else {
    yield put(
      selectCardsInHand({
        id: otherPlayer.id,
        logIds: otherPlayer.id,
        minSelectAmount: Math.max(0, otherPlayer.cards.hand.length - 3),
        maxSelectAmount: Math.max(0, otherPlayer.cards.hand.length - 3),
        next: { type: "ASYNC_PLAY_MILITIA_DISCARD_CARDS", id: nextId }
      })
    );
  }
}

export function* asyncPlayMilitiaDiscardCards({ cards, cardIndexes, id }) {
  const playerIds = yield select(gamePlayerIdsSelector);
  const otherPlayer = yield select(gamePlayerFromIdSelector, id);
  const otherPlayersIds = yield select(gameOtherPlayersIdsSelector);
  const idIndex = otherPlayersIds.indexOf(id);
  const nextId =
    idIndex !== otherPlayersIds.length - 1
      ? otherPlayersIds[idIndex + 1]
      : null;

  yield put(
    discardCards({
      cards,
      cardIndexes,
      id: otherPlayer.id,
      logIds: playerIds,
      username: otherPlayer.username
    })
  );
  if (nextId) {
    yield asyncPlayMilitiaSelectCards({ id: nextId });
  }
}

const militiaSagas = [
  takeEvery("ASYNC_PLAY_MILITIA", asyncPlayMilitia),
  takeEvery("ASYNC_PLAY_MILITIA_SELECT_CARDS", asyncPlayMilitiaSelectCards),
  takeEvery("ASYNC_PLAY_MILITIA_DISCARD_CARDS", asyncPlayMilitiaDiscardCards)
];

export default militiaSagas;
