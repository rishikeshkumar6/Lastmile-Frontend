import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    walletInfo: null,
    forgotPasswordId: "",
    isLoggedin: false,
    userId: null,
  },
  reducers: {
    userManageState: (state, action) => {
      console.log("-----action type----", action);
      switch (action.type) {
        case "userSlice/userManageState":
          return {
            ...state,
            walletInfo: action.payload,
          };
        case "forgotpassword_id":
          return {
            ...state,
            forgotPasswordId: action.payload.forgotPasswordId,
          };
      }
    },
    isLoggedin: (state, action) => {
      return { ...state, isLoggedin: action.payload };
    },
    userManageId: (state, action) => {
      console.log(action);
      return {
        ...state,
        userId: action.payload.userId,
      };
    },
  },
});

export default userSlice.reducer;
export const { userManageState, isLoggedin, userManageId } = userSlice.actions;
