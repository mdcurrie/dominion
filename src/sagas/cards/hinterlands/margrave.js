import { put, takeEvery, select } from "redux-saga/effects";
import {
  blockAttack,
  discardCards,
  drawCards,
  gainBuys,
  playAction,
  selectCardsInHand
} from "../../../actions";
import {
  gameOtherPlayersIdsSelector,
  gamePlayerFromIdSelector,
  gamePlayerIdsSelector,
  gamePlayerSelector
} from "../../../selectors";

export function* asyncPlayMargrave() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);
  const otherPlayersIds = yield select(gameOtherPlayersIdsSelector);

  yield put(
    playAction({
      cardName: "Margrave",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(drawCards({ drawAmount: 3, id: player.id }));
  yield put(gainBuys({ buyAmount: 1, id: player.id }));
  if (otherPlayersIds.length > 0) {
    yield asyncPlayMargraveSelectCards({ id: otherPlayersIds[0] });
  }
}

export function* asyncPlayMargraveSelectCards({ id }) {
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
        next: { type: "ASYNC_PLAY_MARGRAVE_DISCARD_CARDS", id: nextId }
      })
    );
  }
}

export function* asyncPlayMargraveDiscardCards({ cards, cardIndexes, id }) {
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
    yield asyncPlayMargraveSelectCards({ id: nextId });
  }
}

const margraveSagas = [
  takeEvery("ASYNC_PLAY_MARGRAVE", asyncPlayMargrave),
  takeEvery("ASYNC_PLAY_MARGRAVE_SELECT_CARDS", asyncPlayMargraveSelectCards),
  takeEvery("ASYNC_PLAY_MARGRAVE_DISCARD_CARDS", asyncPlayMargraveDiscardCards)
];

export default margraveSagas;
