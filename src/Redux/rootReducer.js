import { combineReducers } from "redux";
import userSlice from "./userSlice.js";
import orderSlice from "./exportOrderSlice.js";

const rootReducer = combineReducers({
  userSlice,
  orderSlice,
});

export default rootReducer;
