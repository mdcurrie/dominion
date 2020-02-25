import { put, takeEvery, select } from "redux-saga/effects";
import { addConnection, removeConnection } from "../actions/connections";
import { updateStatus } from "../actions/status";
import { numberOfPlayersSelector } from "../selectors";

export function* asyncAddConnection({ connection }) {
  const numberOfPlayers = yield select(numberOfPlayersSelector);
  if (numberOfPlayers < 4) {
    yield put(addConnection(connection));
  }
}

export function* asyncRemoveConnection({ connectionId }) {
  yield put(removeConnection(connectionId));
  const numberOfPlayers = yield select(numberOfPlayersSelector);
  if (numberOfPlayers === 0) {
    yield put(updateStatus("NOT_IN_PROGRESS"));
  }
}

export const connectionSagas = [
  takeEvery("ASYNC_ADD_CONNECTION", asyncAddConnection),
  takeEvery("ASYNC_REMOVE_CONNECTION", asyncRemoveConnection)
];
