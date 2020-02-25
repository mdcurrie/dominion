import { put, takeEvery, select } from "redux-saga/effects";
import { updateStatus } from "../actions/status";
import { startGame } from "../actions/game";
import gameRandomizer from "../utils/randomizer";
import { connectionsSelector } from "../selectors";

export function* asyncStartGame() {
  const connections = yield select(connectionsSelector);
  yield put(startGame(gameRandomizer({ connections })));
  yield put(updateStatus("IN_PROGRESS"));
}

export const gameSagas = [takeEvery("ASYNC_START_GAME", asyncStartGame)];
