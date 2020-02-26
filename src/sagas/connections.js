import { put, takeEvery, select } from "redux-saga/effects";
import { removeConnection, updateStatus } from "../actions";
import { numberOfPlayersSelector } from "../selectors";

export function* asyncRemoveConnection({ connectionId }) {
  yield put(removeConnection(connectionId));
  const numberOfPlayers = yield select(numberOfPlayersSelector);
  if (numberOfPlayers === 0) {
    yield put(updateStatus("NOT_IN_PROGRESS"));
  }
}

const connectionSagas = [
  takeEvery("ASYNC_REMOVE_CONNECTION", asyncRemoveConnection)
];

export default connectionSagas;
