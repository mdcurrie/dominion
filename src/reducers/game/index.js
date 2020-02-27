import { combineReducers } from "redux";
import currentPlayer from "./currentPlayer";
import log from "./log";
import players from "./players";
import supply from "./supply";
import trash from "./trash";

export default combineReducers({
  currentPlayer,
  log,
  players,
  supply,
  trash
});
