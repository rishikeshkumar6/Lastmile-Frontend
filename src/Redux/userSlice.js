import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    token: "",
    userRegisterId: "",
    forgotPasswordId: "",
    isLoggedin: false,
  },
  reducers: {
    userManageState: (state, action) => {
      console.log(action);
      switch (action.type) {
        case "userSlice/userManageState":
          return { ...state, userRegisterId: action.payload.userId };
        case "forgotpassword_id":
          return {
            ...state,
            forgotPasswordId: action.payload.forgotPasswordId,
          };
        case "userSlice/userManageState":
          return {
            ...state,
            token: action.payload.token,
          };
      }
    },
    isLoggedin: (state, action) => {
      return { ...state, isLoggedin: action.payload };
    },
  },
});

export default userSlice.reducer;
export const { userManageState, isLoggedin } = userSlice.actions;
