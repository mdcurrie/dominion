import { put, takeEvery, select } from "redux-saga/effects";
import {
  blockAttack,
  placeInDeck,
  playAction,
  revealCards
} from "../../../actions";
import { asyncGainCards } from "../../game";
import {
  gameOtherPlayersIdsSelector,
  gamePlayerFromIdSelector,
  gamePlayerIdsSelector,
  gamePlayerSelector
} from "../../../selectors";
import { VICTORY_CARDS } from "../../../utils/constants";

export function* asyncPlayBureaucrat() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Bureaucrat",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield asyncGainCards({
    cardName: "Silver",
    gainAmount: 1,
    id: player.id,
    location: "DECK"
  });
  yield asyncPlayBureaucratReveal();
}

export function* asyncPlayBureaucratReveal() {
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

    const cardIndex = otherPlayer.cards.hand.findIndex(c =>
      VICTORY_CARDS.includes(c)
    );
    if (cardIndex === -1) {
      yield put(
        revealCards({
          cards: otherPlayer.cards.hand,
          logIds: playerIds,
          username: otherPlayer.username
        })
      );
    } else {
      yield put(
        placeInDeck({
          cardIndex,
          cardName: otherPlayer.cards.hand[cardIndex],
          logIds: playerIds,
          id: otherPlayer.id,
          username: otherPlayer.username
        })
      );
    }
  }
}

const bureaucratSagas = [
  takeEvery("ASYNC_PLAY_BUREAUCRAT", asyncPlayBureaucrat)
];

export default bureaucratSagas;
