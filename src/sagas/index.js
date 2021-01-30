import { all } from "redux-saga/effects";
import baseSetSagas from "./cards/base";
import hinterlandsSagas from "./cards/hinterlands";
import intrigueSagas from "./cards/intrigue";
import seasideSetSagas from "./cards/seaside";
import gameSagas from "./game";

export default function* rootSaga() {
  yield all([
    ...baseSetSagas,
    ...hinterlandsSagas,
    ...intrigueSagas,
    ...seasideSetSagas,
    ...gameSagas
  ]);
}
