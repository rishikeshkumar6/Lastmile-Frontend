import { combineReducers } from "redux";
import userSlice from "./userSlice.js";
import { api } from "./Action.js";
import orderSlice from "./exportOrderSlice.js";

const appReducer = combineReducers({
  userSlice,
  orderSlice,
});

const rootReducer = (state, action) => {
  if (action.type === "user/logout") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const logout = () => {
  return { type: "user/logout" };
};

export default rootReducer;
