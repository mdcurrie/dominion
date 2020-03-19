import { put, takeEvery, select } from "redux-saga/effects";
import {
  blockAttack,
  discardCards,
  drawCards,
  playAction,
  revealCards,
  trashSelectedCards
} from "../../../actions";
import { asyncGainCards } from "../../game";
import {
  gameOtherPlayersIdsSelector,
  gamePlayerFromIdSelector,
  gamePlayerIdsSelector,
  gamePlayerSelector
} from "../../../selectors";

export function* asyncPlayBandit() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Bandit",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield asyncGainCards({
    cardName: "Gold",
    gainAmount: 1,
    id: player.id,
    location: "DISCARD"
  });
  yield asyncPlayBanditReveal();
}

export function* asyncPlayBanditReveal() {
  const otherPlayersIds = yield select(gameOtherPlayersIdsSelector);
  const playerIds = yield select(gamePlayerIdsSelector);
  for (let id of otherPlayersIds) {
    let otherPlayer = yield select(gamePlayerFromIdSelector, id);
    if (otherPlayer.cards.hand.includes("Moat")) {
      yield put(
        blockAttack({ logIds: playerIds, username: otherPlayer.username })
      );
      continue;
    }

    const handCount = otherPlayer.cards.hand.length;
    yield put(drawCards({ drawAmount: 2, id: otherPlayer.id }));
    otherPlayer = yield select(gamePlayerFromIdSelector, id);
    let revealedCards = otherPlayer.cards.hand.slice(handCount);
    yield put(
      revealCards({
        cards: revealedCards,
        logIds: playerIds,
        username: otherPlayer.username
      })
    );

    let trashIndex = -1;
    if (revealedCards.includes("Silver")) {
      trashIndex = revealedCards.indexOf("Silver");
    } else if (revealedCards.includes("Gold")) {
      trashIndex = revealedCards.indexOf("Gold");
    }

    if (trashIndex !== -1) {
      yield put(
        trashSelectedCards({
          cards: [otherPlayer.cards.hand[trashIndex + handCount]],
          cardIndexes: [trashIndex + handCount],
          id: otherPlayer.id,
          logIds: playerIds,
          username: otherPlayer.username
        })
      );
      otherPlayer = yield select(gamePlayerFromIdSelector, id);
      revealedCards = otherPlayer.cards.hand.slice(handCount);
    }

    yield put(
      discardCards({
        cards: revealedCards,
        cardIndexes: revealedCards.map((c, i) => i + handCount),
        id: otherPlayer.id,
        logIds: playerIds,
        username: otherPlayer.username
      })
    );
  }
}

const banditSagas = [takeEvery("ASYNC_PLAY_BANDIT", asyncPlayBandit)];

export default banditSagas;
