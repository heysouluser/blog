import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogIn: false,
  user: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn(state, action) {
      state.isLogIn = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    updateUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { logIn, setUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
