
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  password: '',
  
};

export const userSlice = createSlice({
  name: 'user', // este es el nombre de este slice, puedo crear varios
  initialState,
  reducers: {
    
    addUser: (state, action) => {
      const { username, password } = action.payload;
      state.username = username;
      state.password = password;
      
    },
 
  },
});

export const { addUser} =
  userSlice.actions;

export default userSlice.reducer;