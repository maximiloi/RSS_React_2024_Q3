import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
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

      toast.info(`Select ${state.length} movies`, {
        theme: 'colored',
        autoClose: 2000,
      });
    },
  },
});

export const { actions, reducer } = selectedSlice;
