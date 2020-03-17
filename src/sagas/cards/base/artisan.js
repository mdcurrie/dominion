import { put, takeEvery, select } from "redux-saga/effects";
import {
  choiceGainCards,
  placeSelectedCardsInDeck,
  playAction,
  selectCardsInHand
} from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlayArtisan() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Artisan",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(
    choiceGainCards({
      gainAmount: 1,
      id: player.id,
      location: "HAND",
      maxCost: 5,
      next: { type: "ASYNC_PLAY_ARTISAN_SELECT_CARDS" }
    })
  );
}

export function* asyncPlayArtisanSelectCards() {
  const player = yield select(gamePlayerSelector);
  yield put(
    selectCardsInHand({
      id: player.id,
      logIds: player.id,
      minSelectAmount: 1,
      maxSelectAmount: 1,
      next: { type: "ASYNC_PLAY_ARTISAN_PLACE_SELECTED_IN_DECK" }
    })
  );
}

export function* asyncPlayArtisanPlaceSelectedInDeck({ cardIndexes }) {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    placeSelectedCardsInDeck({
      cardIndexes,
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
}

const artisanSagas = [
  takeEvery("ASYNC_PLAY_ARTISAN", asyncPlayArtisan),
  takeEvery("ASYNC_PLAY_ARTISAN_SELECT_CARDS", asyncPlayArtisanSelectCards),
  takeEvery(
    "ASYNC_PLAY_ARTISAN_PLACE_SELECTED_IN_DECK",
    asyncPlayArtisanPlaceSelectedInDeck
  )
];

export default artisanSagas;
