import { all } from "redux-saga/effects";
import baseSetSagas from "./cards/base";
import connectionSagas from "./connections";
import gameSagas from "./game";

export default function* rootSaga() {
  yield all([...baseSetSagas, ...connectionSagas, ...gameSagas]);
}
