import { combineReducers } from "redux";
import cardSelection from "./cardSelection";
import connections from "./connections";
import game from "./game";
import status from "./status";

export default combineReducers({
  cardSelection,
  connections,
  game,
  status
});
