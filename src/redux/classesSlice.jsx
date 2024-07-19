import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nombre: '',
  id: '',
};

export const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    addClass: (state, action) => {
      const { name, id} = action.payload;
      state.nombre = name;
      state.id = id;
    },
    removeClass: (state) => {
      state.nombre = '';
      state.id = '';
    },
  },
});

export const { addClass, removeClass } = classesSlice.actions;

export default classesSlice.reducer;