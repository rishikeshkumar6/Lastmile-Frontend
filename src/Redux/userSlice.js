import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    token: "",
    userRegisterId: "",
    forgotPasswordId: "",
  },
  reducers: {
    userManageState: (state, action) => {
      console.log(action);
      switch (action.payload.type) {
        case "userid":
          return { ...state, userRegisterId: action.payload.userId };
        case "forgotpassword_id":
          return {
            ...state,
            forgotPasswordId: action.payload.forgotPasswordId,
          };
        case "token":
          return {
            ...state,
            token: action.payload.token,
          };
      }
    },
  },
});

export default userSlice.reducer;
export const { userManageState } = userSlice.actions;
