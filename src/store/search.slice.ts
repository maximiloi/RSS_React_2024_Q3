import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  activePage: number;
  page: string;
  searchWord: string;
  totalResults: string;
}

const initialState: SearchState = {
  activePage: 1,
  page: '1',
  searchWord: 'star wars',
  totalResults: '0',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateActivePage(state, action: PayloadAction<number>) {
      return { ...state, activePage: action.payload };
    },
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
