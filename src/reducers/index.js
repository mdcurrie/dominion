import { combineReducers } from "redux";
import connections from "./connections";
import status from "./status";

export default combineReducers({
  status,
  connections
});
