import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as selectedReducer } from './selected.slice';
import api from './api';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const reducers = combineReducers({
  selected: selectedReducer,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
