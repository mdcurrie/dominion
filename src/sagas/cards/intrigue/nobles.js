import { put, takeEvery, select } from "redux-saga/effects";
import {
  drawCards,
  gainActions,
  selectOptions,
  playAction,
  logMessage
} from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";
import { FLAVOR_IMAGES } from "../../../utils/constants";

export function* asyncPlayNobles() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Nobles",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );

  const options = [
    {
      next: { type: "ASYNC_PLAY_NOBLES_DRAW_CARDS" },
      text: "+3 Cards"
    },
    {
      next: { type: "ASYNC_PLAY_NOBLES_ADD_ACTIONS" },
      text: "+2 Actions"
    }
  ];

  yield put(
    selectOptions({
      id: player.id,
      options,
      text: "Choose One:",
      flavorImage: FLAVOR_IMAGES.PoutineCat
    })
  );
}

export function* asyncPlayNoblesAddActions() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    logMessage({
      logIds: playerIds,
      message: `${player.username} selected +2 Actions.`
    })
  );
  yield put(gainActions({ actionAmount: 2, id: player.id }));
}

export function* asyncPlayNoblesDrawCards() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    logMessage({
      logIds: playerIds,
      message: `${player.username} selected +3 Cards`
    })
  );
  yield put(drawCards({ drawAmount: 3, id: player.id }));
}

const noblesSagas = [
  takeEvery("ASYNC_PLAY_NOBLES", asyncPlayNobles),
  takeEvery("ASYNC_PLAY_NOBLES_DRAW_CARDS", asyncPlayNoblesDrawCards),
  takeEvery("ASYNC_PLAY_NOBLES_ADD_ACTIONS", asyncPlayNoblesAddActions)
];

export default noblesSagas;
