import { configureStore } from '@reduxjs/toolkit';

import AuthSliceReducer from './slices/AuthSlice';
import TicketSliceReducer from './slices/TicketSlice';

export const store = configureStore({
  reducer: {
    auth: AuthSliceReducer,
    tickets: TicketSliceReducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;