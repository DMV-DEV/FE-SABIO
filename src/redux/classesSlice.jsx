import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nombre: '',
  id: '',
};

export const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    addClasses: (state, action) => {
      console.log(state);
      const { nombre, id} = action.payload;
      state.nombre = nombre;
      state.id = id;
    },
    removeClasses: (state) => {
      state.nombre = '';
      state.id = '';
    },
  },
});

export const { addClasses, removeClass } = classesSlice.actions;

export default classesSlice.reducer;