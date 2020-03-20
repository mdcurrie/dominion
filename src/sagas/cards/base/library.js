import { put, takeEvery, select } from "redux-saga/effects";
import {
  discardCards,
  drawCards,
  playAction,
  selectOptions
} from "../../../actions";
import { ACTION_CARDS } from "../../../utils/constants";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlayLibrary() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Library",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield asyncPlayLibraryDrawCards();
}

export function* asyncPlayLibraryDrawCards() {
  let player = yield select(gamePlayerSelector);
  const handCount = player.cards.hand.length;
  if (
    player.cards.hand.length >= 7 ||
    (player.cards.discard.length == 0 && player.cards.deck.length == 0)
  ) {
    return;
  }

  yield put(drawCards({ drawAmount: 1, id: player.id }));
  player = yield select(gamePlayerSelector);
  const cardName = player.cards.hand[handCount];
  if (ACTION_CARDS.includes(cardName)) {
    yield put(
      selectOptions({
        id: player.id,
        options: [
          {
            next: { type: "ASYNC_PLAY_LIBRARY_DISCARD_CARDS" },
            text: `Discard ${cardName}`
          },
          {
            next: { type: "ASYNC_PLAY_LIBRARY_DRAW_CARDS" },
            text: `Keep ${cardName}`
          }
        ],
        text: `You drew a ${cardName}, please choose an option.`
      })
    );
  } else {
    yield asyncPlayLibraryDrawCards();
  }
}

export function* asyncPlayLibraryDiscardCards() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);
  yield put(
    discardCards({
      cards: player.cards.hand.slice(player.cards.hand.length - 1),
      cardIndexes: [player.cards.hand.length - 1],
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield asyncPlayLibraryDrawCards();
}

const librarySagas = [
  takeEvery("ASYNC_PLAY_LIBRARY", asyncPlayLibrary),
  takeEvery("ASYNC_PLAY_LIBRARY_DRAW_CARDS", asyncPlayLibraryDrawCards),
  takeEvery("ASYNC_PLAY_LIBRARY_DISCARD_CARDS", asyncPlayLibraryDiscardCards)
];

export default librarySagas;
