import { put, takeEvery, select } from "redux-saga/effects";
import {
  updateStatus,
  startGame,
  startTurn,
  endTurn,
  moveToNextPlayer
} from "../actions";
import gameRandomizer from "../utils/randomizer";
import { connectionsSelector } from "../selectors";

export function* asyncStartGame() {
  const connections = yield select(connectionsSelector);
  yield put(startGame(gameRandomizer({ connections })));
  yield put(updateStatus("IN_PROGRESS"));
  yield put(startTurn());
}

export function* asyncEndTurn() {
  yield put(endTurn());
  yield put(moveToNextPlayer());
  yield put(startTurn());
}

export function* asyncPlayCard() {}

const gameSagas = [
  takeEvery("ASYNC_START_GAME", asyncStartGame),
  takeEvery("ASYNC_END_TURN", asyncEndTurn),
  takeEvery("ASYNC_PLAY_CARD", asyncPlayCard)
];

export default gameSagas;
