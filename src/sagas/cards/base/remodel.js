import { put, takeEvery, select } from "redux-saga/effects";
import {
  choiceGainCards,
  playAction,
  selectCardsInHand,
  trashSelectedCards
} from "../../../actions";
import { CARD_COSTS } from "../../../utils/constants";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlayRemodel() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Remodel",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(
    selectCardsInHand({
      id: player.id,
      logIds: player.id,
      minSelectAmount: 1,
      maxSelectAmount: 1,
      next: { type: "ASYNC_PLAY_REMODEL_TRASH_AND_CHOICE_GAIN_CARDS" }
    })
  );
}

export function* asyncPlayRemodelTrashAndChoiceGainCards({
  cards,
  cardIndexes
}) {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);
  const maxCost = CARD_COSTS[player.cards.hand[cardIndexes[0]]] + 2;

  yield put(
    trashSelectedCards({
      cards,
      cardIndexes,
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(
    choiceGainCards({
      gainAmount: 1,
      id: player.id,
      location: "DISCARD",
      maxCost
    })
  );
}

const remodelSagas = [
  takeEvery("ASYNC_PLAY_REMODEL", asyncPlayRemodel),
  takeEvery(
    "ASYNC_PLAY_REMODEL_TRASH_AND_CHOICE_GAIN_CARDS",
    asyncPlayRemodelTrashAndChoiceGainCards
  )
];

export default remodelSagas;
