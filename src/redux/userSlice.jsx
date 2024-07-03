
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  password: '',
  id:'',
  
};

export const userSlice = createSlice({
  name: 'user', // este es el nombre de este slice, puedo crear varios
  initialState,
  reducers: {
    
    addUser: (state, action) => {
      const { name, email,  password } = action.payload;
      state.name = name;
      state.email = email
      state.password = password;
      },

    changePassword : (state, action) => {
      state.password = action.payload;
    },
 
  },
});

export const { addUser, changePassword} =
  userSlice.actions;

export default userSlice.reducer;