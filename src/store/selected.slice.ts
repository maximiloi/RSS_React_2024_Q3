import { createSlice } from '@reduxjs/toolkit';
import { Movie } from '../utils/apiResponseType';

const initialState: Movie[] = [];

export const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    toggleSelected: (state, actions) => {
      const movie = actions.payload;
      const existingIndex = state.findIndex((item) => {
        return item.imdbID === movie.imdbID;
      });

      if (existingIndex !== -1) {
        state.splice(existingIndex, 1);
      } else {
        state.push(movie);
      }
    },
    deleteSelected: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const { actions, reducer } = selectedSlice;
