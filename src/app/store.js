import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import friendListReducer from "../features/friendList/friendListSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    friendList: friendListReducer,
  },
});
