import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('classesState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('classesState', serializedState);
  } catch (err) {
    message.error('Could not save state', err);
  }
};

const initialState = {
  nombre: '',
  id: '',
};

export const classesSlice = createSlice({
  name: 'classes',
  initialState: loadState() || initialState,
  reducers: {
    addClasses: (state, action) => {
      const { nombre, id} = action.payload;
      state.nombre = nombre;
      state.id = id;
      saveState(state);
    },
    removeClasses: (state) => {
      state.nombre = '';
      state.id = '';
      saveState(state);
    },
  },
});

export const { addClasses, removeClass } = classesSlice.actions;

export default classesSlice.reducer;