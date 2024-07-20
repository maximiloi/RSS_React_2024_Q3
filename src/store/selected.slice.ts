import { createSlice } from '@reduxjs/toolkit';

const initialState: string[] = [];

export const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    toggleSelected: (state, { payload: movieId }) => {
      const existingIndex = state.findIndex((id) => id === movieId);

      if (existingIndex !== -1) {
        state.splice(existingIndex, 1);
      } else {
        state.push(movieId);
      }
    },
  },
});

export const { actions, reducer } = selectedSlice;
