import { all } from "redux-saga/effects";
import { connectionSagas } from "./connections";
import { gameSagas } from "./game";

export default function* rootSaga() {
  yield all([...connectionSagas, ...gameSagas]);
}
