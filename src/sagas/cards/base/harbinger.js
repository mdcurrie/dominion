import { put, takeEvery, select } from "redux-saga/effects";
import {
  drawCards,
  gainActions,
  moveFromDiscardToDeck,
  playAction,
  selectOptions
} from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlayHarbinger() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Harbinger",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(drawCards({ drawAmount: 1, id: player.id }));
  yield put(gainActions({ actionAmount: 1, id: player.id }));
  if (player.cards.discard.length > 0) {
    yield put(
      selectOptions({
        id: player.id,
        options: [
          { text: "Do nothing" },
          ...player.cards.discard.map(cardName => ({
            next: {
              type: "ASYNC_PLAY_VASSAL_MOVE_FROM_DISCARD_TO_DECK",
              cardName
            },
            text: cardName
          }))
        ],
        text:
          "Here are the cards in your discard pile, please choose an option."
      })
    );
  }
}

export function* asyncPlayHarbingerMoveFromDiscardToDeck({ cardName }) {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    moveFromDiscardToDeck({
      cardName,
      logIds: playerIds,
      id: player.id,
      username: player.username
    })
  );
}

const harbingerSagas = [
  takeEvery("ASYNC_PLAY_HARBINGER", asyncPlayHarbinger),
  takeEvery(
    "ASYNC_PLAY_VASSAL_MOVE_FROM_DISCARD_TO_DECK",
    asyncPlayHarbingerMoveFromDiscardToDeck
  )
];

export default harbingerSagas;
