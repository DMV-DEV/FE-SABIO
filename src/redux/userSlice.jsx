import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  id: '',
  accessToken: '',
  refreshToken: '',
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { name, email, id, accessToken, refreshToken } = action.payload;
      state.name = name;
      state.email = email;
      state.id = id;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
    },
    removeUser: (state) => {
      state.name = '';
      state.email = '';
      state.id = '';
      state.accessToken = '';
      state.refreshToken = '';
      state.isAuthenticated = false;
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    updateUser: (state, action) => {
      const { name, email, profileImage } = action.payload;
      state.name = name;
      state.email = email;
      state.profileImage = profileImage; 
    },
  },
});

export const { addUser, removeUser, updateAccessToken, updateUser } = userSlice.actions;

export default userSlice.reducer;