import { put, takeEvery, select } from "redux-saga/effects";
import { updateStatus } from "../actions/status";
import { startGame } from "../actions/game";
import { numberOfPlayersSelector } from "../selectors";

export function* asyncStartGame() {
  const numberOfPlayers = yield select(numberOfPlayersSelector);
  yield put(
    startGame({
      supply: [
        {
          name: "Copper",
          count: 30
        },
        {
          name: "Silver",
          count: 30
        },
        {
          name: "Gold",
          count: 30
        }
      ],
      players: [],
      currentPlayerId: null
    })
  );
  yield put(updateStatus("IN_PROGRESS"));
}

export const gameSagas = [takeEvery("ASYNC_START_GAME", asyncStartGame)];
