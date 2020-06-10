import { put, takeEvery, select } from "redux-saga/effects";
import {
  discardCardsInLimbo,
  drawCards,
  gainActions,
  moveFromDeckToLimbo,
  moveFromLimboToDeck,
  playAction,
  selectOptions,
  trashCardsInLimbo
} from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";
import { FLAVOR_IMAGES } from "../../../utils/constants";

export function* asyncPlaySentry() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Sentry",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(drawCards({ drawAmount: 1, id: player.id }));
  yield put(gainActions({ actionAmount: 1, id: player.id }));
  yield asyncPlaySentrySelectOptionsTrash();
}

export function* asyncPlaySentrySelectOptionsTrash() {
  let player = yield select(gamePlayerSelector);
  yield put(moveFromDeckToLimbo({ drawAmount: 2, id: player.id }));

  player = yield select(gamePlayerSelector);
  const options = [
    {
      next: { type: "ASYNC_PLAY_SENTRY_SELECT_OPTIONS_DISCARD" },
      text: "Do not trash"
    },
    ...player.cards.limbo.map((cardName, index) => ({
      next: {
        type: "ASYNC_PLAY_SENTRY_TRASH_SELECTED_CARDS",
        cardIndexes: [index]
      },
      text: `Trash ${cardName}`
    }))
  ];
  if (player.cards.limbo.length == 2) {
    options.push({
      next: {
        type: "ASYNC_PLAY_SENTRY_TRASH_SELECTED_CARDS",
        cardIndexes: [0, 1]
      },
      text: "Trash both cards"
    });
  }
  if (player.cards.limbo.length >= 1) {
    yield put(
      selectOptions({
        id: player.id,
        options,
        text:
          player.cards.limbo.length == 1
            ? `The top card of your deck is ${player.cards.limbo[0]}, please choose an option.`
            : `The top cards of your deck are ${player.cards.limbo[0]} and ${player.cards.limbo[1]}, please choose an option.`,
        flavorImage: FLAVOR_IMAGES.PoutineCat
      })
    );
  }
}

export function* asyncPlaySentryTrashSelectedCards({ cardIndexes }) {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);
  yield put(
    trashCardsInLimbo({
      cards: player.cards.limbo.filter((cardName, index) =>
        cardIndexes.includes(index)
      ),
      cardIndexes,
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield asyncPlaySentrySelectOptionsDiscard();
}

export function* asyncPlaySentrySelectOptionsDiscard() {
  const player = yield select(gamePlayerSelector);
  const options = [
    {
      next: { type: "ASYNC_PLAY_SENTRY_SELECT_OPTIONS_PLACE_IN_DECK" },
      text: "Do not discard"
    },
    ...player.cards.limbo.map((cardName, index) => ({
      next: {
        type: "ASYNC_PLAY_SENTRY_DISCARD_SELECTED_CARDS",
        cardIndexes: [index]
      },
      text: `Discard ${cardName}`
    }))
  ];
  if (player.cards.limbo.length == 2) {
    options.push({
      next: {
        type: "ASYNC_PLAY_SENTRY_DISCARD_SELECTED_CARDS",
        cardIndexes: [0, 1]
      },
      text: "Discard both cards"
    });
  }
  if (player.cards.limbo.length >= 1) {
    yield put(
      selectOptions({
        id: player.id,
        options,
        text: "Please choose an option.",
        flavorImage: FLAVOR_IMAGES.PoutineCat
      })
    );
  }
}

export function* asyncPlaySentryDiscardSelectedCards({ cardIndexes }) {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);
  yield put(
    discardCardsInLimbo({
      cards: player.cards.limbo.filter((cardName, index) =>
        cardIndexes.includes(index)
      ),
      cardIndexes,
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
}

export function* asyncPlaySentrySelectOptionsPlaceInDeck() {
  const player = yield select(gamePlayerSelector);
  if (player.cards.limbo.length == 0) {
    return;
  }

  yield put(
    selectOptions({
      id: player.id,
      options: [
        ...player.cards.limbo.map((cardName, index) => ({
          next: {
            type: "ASYNC_PLAY_SENTRY_PLACE_IN_DECK",
            cardIndexes: [index]
          },
          text: cardName
        }))
      ],
      text: "Select cards to place them on top of your deck.",
      flavorImage: FLAVOR_IMAGES.PoutineCat
    })
  );
}

export function* asyncPlaySentryPlaceInDeck({ cardIndexes }) {
  let player = yield select(gamePlayerSelector);
  yield put(moveFromLimboToDeck({ cardIndexes, id: player.id }));

  player = yield select(gamePlayerSelector);
  if (player.cards.limbo.length >= 1) {
    yield asyncPlaySentrySelectOptionsPlaceInDeck();
  }
}

const sentrySagas = [
  takeEvery("ASYNC_PLAY_SENTRY", asyncPlaySentry),
  takeEvery(
    "ASYNC_PLAY_SENTRY_TRASH_SELECTED_CARDS",
    asyncPlaySentryTrashSelectedCards
  ),
  takeEvery(
    "ASYNC_PLAY_SENTRY_SELECT_OPTIONS_DISCARD",
    asyncPlaySentrySelectOptionsDiscard
  ),
  takeEvery(
    "ASYNC_PLAY_SENTRY_DISCARD_SELECTED_CARDS",
    asyncPlaySentryDiscardSelectedCards
  ),
  takeEvery(
    "ASYNC_PLAY_SENTRY_SELECT_OPTIONS_PLACE_IN_DECK",
    asyncPlaySentrySelectOptionsPlaceInDeck
  ),
  takeEvery("ASYNC_PLAY_SENTRY_PLACE_IN_DECK", asyncPlaySentryPlaceInDeck)
];

export default sentrySagas;
