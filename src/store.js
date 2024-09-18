import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './features/usersApi';  
import usersReducer from './features/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [usersApi.reducerPath]: usersApi.reducer,  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});
