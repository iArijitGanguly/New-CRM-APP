import { configureStore } from '@reduxjs/toolkit';

import AuthSliceReducer from './slices/AuthSlice';

export const store = configureStore({
  reducer: {
    auth: AuthSliceReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;