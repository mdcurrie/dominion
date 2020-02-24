import { put, takeEvery, select } from "redux-saga/effects";
import { updateStatus } from "../actions/status";
import { startGame } from "../actions/game";
import gameRandomizer from "../utils/randomizer";
import { numberOfPlayersSelector } from "../selectors";

export function* asyncStartGame() {
  const numberOfPlayers = yield select(numberOfPlayersSelector);
  yield put(startGame(gameRandomizer(numberOfPlayers)));
  yield put(updateStatus("IN_PROGRESS"));
}

export const gameSagas = [takeEvery("ASYNC_START_GAME", asyncStartGame)];
