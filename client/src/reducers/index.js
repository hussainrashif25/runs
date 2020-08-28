import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import gamesReducer from "./gamesReducer";
import tasksReducer from "./tasksReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  games: gamesReducer,
  tasks: tasksReducer
});
