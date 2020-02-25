import { put, takeEvery, select } from "redux-saga/effects";
import { updateStatus } from "../actions/status";
import { startGame, startTurn } from "../actions/game";
import gameRandomizer from "../utils/randomizer";
import { connectionsSelector } from "../selectors";

export function* asyncStartGame() {
  const connections = yield select(connectionsSelector);
  yield put(startGame(gameRandomizer({ connections })));
  yield put(updateStatus("IN_PROGRESS"));
  yield put(startTurn());
}

export function* asyncBuyCard({ id, name }) {
  console.log("1111", id, name);
}

export const gameSagas = [
  takeEvery("ASYNC_START_GAME", asyncStartGame),
  takeEvery("ASYNC_BUY_CARD", asyncBuyCard)
];
