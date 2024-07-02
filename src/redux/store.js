import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';




export const store = configureStore({
  reducer: {
    user: userSlice,
    
    
  },
  // middleware: (gDM) => gDM().concat(turnSlices.middleware,companySlices.middleware),
});