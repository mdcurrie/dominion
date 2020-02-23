import { put, takeEvery, select } from "redux-saga/effects";
import { addConnection, removeConnection } from "../actions/connections";
import { updateStatus } from "../actions/status";

const numberOfPlayersSelector = state => state.connections.length;

export function* sagaAddConnection(data) {
  const numberOfPlayers = yield select(numberOfPlayersSelector);
  if (numberOfPlayers < 4) {
    yield put(addConnection(data.connection));
  }
}

export function* sagaRemoveConnection(data) {
  yield put(removeConnection(data.connection));
  const numberOfPlayers = yield select(numberOfPlayersSelector);
  if (numberOfPlayers === 0) {
    yield put(updateStatus("NOT_IN_PROGRESS"));
  }
}

export const connectionSagas = [
  takeEvery("SAGA/ADD_CONNECTION", sagaAddConnection),
  takeEvery("SAGA/REMOVE_CONNECTION", sagaRemoveConnection)
];
