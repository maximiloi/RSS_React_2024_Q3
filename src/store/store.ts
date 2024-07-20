import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as selectedReducer } from './selected.slice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const reducers = combineReducers({ selected: selectedReducer });

export const store = configureStore({
  reducer: reducers,
  devTools: true,
});
