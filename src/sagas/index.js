import { all } from "redux-saga/effects";
import baseSetSagas from "./cards/base";
import seasideSetSagas from "./cards/seaside";
import gameSagas from "./game";

export default function* rootSaga() {
  yield all([...baseSetSagas, ...seasideSetSagas, ...gameSagas]);
}
