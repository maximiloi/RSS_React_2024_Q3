import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

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

      toast.info(`Select ${state.length} movies`, { theme: 'colored' });
    },
  },
});

export const { actions, reducer } = selectedSlice;
