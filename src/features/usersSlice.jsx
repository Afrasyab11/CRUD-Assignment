import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  selectedUser: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
    
      if (Array.isArray(action.payload)) {
        state.users = [...state.users, ...action.payload];
      } else {
        state.users = [...state.users, action.payload];
      }
    },
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    updateUser: (state, action) => {
      console.log("action payload", action.payload);
      state.users = state.users.map((user) =>
        user?.id === action?.payload?.id
          ? {
              ...user,
              first_name: action.payload.first_name,
              last_name: action.payload.last_name,
              email: action.payload.email,
            }
          : user
      );
    },
  },
});

export const { setUsers, selectUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
