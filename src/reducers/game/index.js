import { combineReducers } from "redux";
import currentPlayer from "./currentPlayer";
import log from "./log";
import playerRequest from "./playerRequest";
import players from "./players";
import score from "./score";
import supply from "./supply";
import trash from "./trash";

export default combineReducers({
  currentPlayer,
  log,
  playerRequest,
  players,
  score,
  supply,
  trash
});
