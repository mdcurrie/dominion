import { all } from "redux-saga/effects";
import { connectionSagas } from "./connections";

export default function* rootSaga() {
  yield all([...connectionSagas]);
}
