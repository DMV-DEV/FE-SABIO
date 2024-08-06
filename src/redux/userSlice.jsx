import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('userState');
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
    localStorage.setItem('userState', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

const initialState = {
  name: '',
  email: '',
  id: '',
  accessToken: '',
  refreshToken: '',
  isAuthenticated: false,
  first_name: '',
  last_name: '',
  profesion: '',
  fecha_nacimiento: '',
  sexo: '',
  tipo_usuario: '',
  has_temporary_password: false,
  foto: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: loadState() || initialState,
  reducers: {
    addUser: (state, action) => {
      const {
        name,
        email,
        id,
        accessToken,
        refreshToken,
        first_name,
        last_name,
        profesion,
        fecha_nacimiento,
        sexo,
        tipo_usuario,
        has_temporary_password,
        foto,
        username
      } = action.payload;
      state.name = name;
      state.email = email;
      state.id = id;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      state.first_name = first_name;
      state.last_name = last_name;
      state.profesion = profesion;
      state.fecha_nacimiento = fecha_nacimiento;
      state.sexo = sexo;
      state.tipo_usuario = tipo_usuario;
      state.has_temporary_password = has_temporary_password;
      state.foto = foto;
      state.username = username
      saveState(state);
    },
    removeUser: (state) => {
      state.name = '';
      state.email = '';
      state.id = '';
      state.accessToken = '';
      state.refreshToken = '';
      state.isAuthenticated = false;
      state.first_name = '';
      state.last_name = '';
      state.profesion = '';
      state.fecha_nacimiento = '';
      state.sexo = '';
      state.tipo_usuario = '';
      state.has_temporary_password = false;
      state.foto = '';
      saveState(state);
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
      saveState(state);
    },
    updateUser: (state, action) => {
      const { name, email, profileImage } = action.payload;
      state.name = name;
      state.email = email;
      state.profileImage = profileImage;
      saveState(state);
    },
  },
});

export const { addUser, removeUser, updateAccessToken, updateUser } = userSlice.actions;

export default userSlice.reducer;