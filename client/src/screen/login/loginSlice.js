import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    actionLoginSuccess: (state, action) => {
      state.user = action.payload;
    },
  },
});
const { reducer, actions } = userSlice;
export const { actionLoginSuccess } = actions;
export default reducer;
