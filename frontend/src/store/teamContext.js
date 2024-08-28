import { createSlice } from "@reduxjs/toolkit";

export const teamSlice = createSlice({
  name: "team",
  initialState: {
    members: [],
  },
  reducers: {
    addMember: (state, action) => {
      state.members.push(action.payload);
    },
    removeMember: (state, action) => {
      state.members = state.members.filter(
        (member) => member.id !== action.payload
      );
    },
    clearAll: (state) => {
      state.members = [];
    },
  },
});

export const { addMember, removeMember, clearAll } = teamSlice.actions;

export default teamSlice.reducer;
