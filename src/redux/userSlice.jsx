
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timeSlot: '',
  name: '',
  surName: '',
  identificationNumber: '',
  customerEmail: '',
  date: '',
};

export const userSlice = createSlice({
  name: 'user', // este es el nombre de este slice, puedo crear varios
  initialState,
  reducers: {
    addIdentificationNumer: (state, action) => {
      const { identificationNumber } = action.payload;
      state.identificationNumber = identificationNumber;
    },
    addUser: (state, action) => {
      const { name, surName, customerEmail } = action.payload;
      state.name = name;
      state.surName = surName;
      state.customerEmail = customerEmail;
    },
    addTimeSlot: (state, action) => {
      const { timeSlot } = action.payload;
      state.timeSlot = timeSlot;
    },
    addDate: (state, action) => {
      const {date} = action.payload;
      state.date = date;
    }
  },
});

export const { addIdentificationNumer, addUser, addTimeSlot, addDate } =
  userSlice.actions;

export default userSlice.reducer;