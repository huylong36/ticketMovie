import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../screen/login/loginSlice";
const rootReducers = {
  user: userReducer,
};
const store = configureStore({
  reducer: rootReducers,
});
export default store;
