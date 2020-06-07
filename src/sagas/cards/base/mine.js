import { put, takeEvery, select } from "redux-saga/effects";
import {
  choiceGainCards,
  playAction,
  selectCardsInHand,
  trashSelectedCards
} from "../../../actions";
import { CARDS } from "../../../utils/cards";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlayMine() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Mine",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(
    selectCardsInHand({
      cardType: "TREASURE",
      id: player.id,
      logIds: player.id,
      minSelectAmount: 1,
      maxSelectAmount: 1,
      next: { type: "ASYNC_PLAY_MINE_TRASH_AND_CHOICE_GAIN_CARDS" }
    })
  );
}

export function* asyncPlayMineTrashAndChoiceGainCards({ cards, cardIndexes }) {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);
  const maxCost = CARDS[player.cards.hand[cardIndexes[0]]].cost + 3;

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
      cardType: "TREASURE",
      gainAmount: 1,
      id: player.id,
      location: "HAND",
      maxCost
    })
  );
}

const mineSagas = [
  takeEvery("ASYNC_PLAY_MINE", asyncPlayMine),
  takeEvery(
    "ASYNC_PLAY_MINE_TRASH_AND_CHOICE_GAIN_CARDS",
    asyncPlayMineTrashAndChoiceGainCards
  )
];

export default mineSagas;
