import { createSlice } from "@reduxjs/toolkit";

export const friendListSlice = createSlice({
  name: "friendList",
  initialState: [
    { name: "Sushmita Pandey", isStarred: true },
    { name: "John Doe", isStarred: false },
    { name: "Alexis Rose", isStarred: false },
    { name: "David Rose", isStarred: true },
    { name: "Johnny Rose", isStarred: false },
    { name: "Moira Rose", isStarred: false },
  ],

  reducers: {
    addFriend: (state, action) => {
      state.push(action.payload);
    },
    deleteFriend: (state, action) => {
      return state.filter((item) => item.name !== action.payload);
    },
    starFriend: (state, action) => {
      let index = -1;
      // eslint-disable-next-line array-callback-return
      state.map((item, i) => {
        if (item.name === action.payload) index = i;
      });
      state[index].isStarred = !state[index].isStarred;
    },
  },
});

export const { addFriend, deleteFriend, starFriend } = friendListSlice.actions;

export default friendListSlice.reducer;
