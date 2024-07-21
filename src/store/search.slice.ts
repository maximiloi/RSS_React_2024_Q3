import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  page: string;
  searchWord: string;
  totalResults: string;
}

const initialState: SearchState = {
  page: '1',
  searchWord: '',
  totalResults: '0',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updatePage(state, action: PayloadAction<string>) {
      return { ...state, page: action.payload };
    },
    updateSearchWord(state, action: PayloadAction<string>) {
      return { ...state, searchWord: action.payload };
    },
    updateTotalResults(state, action: PayloadAction<string>) {
      return { ...state, totalResults: action.payload };
    },
  },
});

export const { actions, reducer } = searchSlice;
