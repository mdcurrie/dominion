import { put, takeEvery, select } from "redux-saga/effects";
import {
  discardCards,
  drawCards,
  drawFromDiscard,
  gainActions,
  gainFloatingGold,
  playAction,
  selectOptions
} from "../../../actions";
import { asyncPlayCard } from "../../game";
import { isActionCard } from "../../../utils/cards";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlayVassal() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Vassal",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(gainFloatingGold({ floatingGoldAmount: 2 }));
  yield asyncPlayVassalDiscardAndSelectOptions();
}

export function* asyncPlayVassalDiscardAndSelectOptions() {
  let player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);
  const handCount = player.cards.hand.length;
  yield put(drawCards({ drawAmount: 1, id: player.id }));
  player = yield select(gamePlayerSelector);
  const cardName = player.cards.hand[handCount];
  if (handCount == player.cards.hand.length) {
    return;
  }

  yield put(
    discardCards({
      cards: player.cards.hand.slice(handCount),
      cardIndexes: [handCount],
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );

  player = yield select(gamePlayerSelector);
  if (isActionCard(player.cards.discard[player.cards.discard.length - 1])) {
    yield put(
      selectOptions({
        id: player.id,
        options: [
          { text: "Do nothing" },
          {
            next: { type: "ASYNC_PLAY_VASSAL_PLAY_DISCARDED_CARD" },
            text: `Play ${cardName}`
          }
        ],
        text: `You discarded a ${cardName}, please choose an option.`
      })
    );
  }
}

export function* asyncPlayVassalPlayDiscardedCard() {
  let player = yield select(gamePlayerSelector);
  yield put(drawFromDiscard({ id: player.id }));
  player = yield select(gamePlayerSelector);
  const cardName = player.cards.hand[player.cards.hand.length - 1];
  yield put(gainActions({ actionAmount: 1, id: player.id }));
  yield asyncPlayCard({ id: player.id, name: cardName });
}

const vassalSagas = [
  takeEvery("ASYNC_PLAY_VASSAL", asyncPlayVassal),
  takeEvery(
    "ASYNC_PLAY_VASSAL_PLAY_DISCARDED_CARD",
    asyncPlayVassalPlayDiscardedCard
  )
];

export default vassalSagas;
