import { combineReducers } from "redux";
import connections from "./connections";
import status from "./status";
import game from "./game";

export default combineReducers({
  connections,
  game,
  status
});
