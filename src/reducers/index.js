import { combineReducers } from "redux";
import connections from "./connections";
import game from "./game";
import status from "./status";

export default combineReducers({
  connections,
  game,
  status
});
