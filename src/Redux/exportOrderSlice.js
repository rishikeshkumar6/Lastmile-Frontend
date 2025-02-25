import { createSlice } from "@reduxjs/toolkit";

const exportOrderSlice = createSlice({
  name: "order",
  initialState: {
    exportOrder: [],
  },
  reducers: {
    order: (state, action) => {
      return { ...state, exportOrder: action.payload.bulkOrder };
    },
    filterOrder: (state, action) => {
      const newState = { ...state };
      newState["exportOrder"] = newState["exportOrder"].filter(
        (elem) => elem.id !== action.payload
      );
      return newState;
    },
    insertSingleOrder: (state, action) => {
      state["exportOrder"].push(action.payload);
    },
  },
});
export default exportOrderSlice.reducer;
export const { order, filterOrder, insertSingleOrder } =
  exportOrderSlice.actions;
