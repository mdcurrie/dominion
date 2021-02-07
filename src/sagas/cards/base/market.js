import noop from "lodash/noop";
import { put, takeEvery, select } from "redux-saga/effects";
import {
  drawCards,
  gainActions,
  gainBuys,
  gainFloatingGold,
  playAction
} from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export const Market = {
  name: "Market",
  cost: 5,
  type: ["Action"],

  onPlay: function*() {
    const player = yield select(gamePlayerSelector);
    const playerIds = yield select(gamePlayerIdsSelector);

    yield put(
      playAction({
        cardName: "Market",
        id: player.id,
        logIds: playerIds,
        username: player.username
      })
    );
    yield put(drawCards({ drawAmount: 1, id: player.id }));
    yield put(gainActions({ actionAmount: 1, id: player.id }));
    yield put(gainBuys({ buyAmount: 1, id: player.id }));
    yield put(gainFloatingGold({ floatingGoldAmount: 1 }));
  },

  onDiscard: noop,
  onGain: noop,
  onTrash: noop
};

const marketSagas = [takeEvery("ASYNC_PLAY_MARKET", Market.onPlay)];

export default marketSagas;
