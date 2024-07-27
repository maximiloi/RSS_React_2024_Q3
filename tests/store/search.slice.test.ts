import { describe, it, expect } from 'vitest';

import { reducer, actions } from '../../src/store/search.slice';

describe('searchSlice', () => {
  const initialState = {
    activePage: 1,
    page: '1',
    searchWord: 'star wars',
    totalResults: '0',
  };

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should update active page', () => {
    const newActivePage = 3;
    const state = reducer(
      initialState,
      actions.updateActivePage(newActivePage)
    );
    expect(state.activePage).toEqual(newActivePage);
    expect(state.page).toEqual(initialState.page);
  });

  it('should update page', () => {
    const newPage = '2';
    const state = reducer(initialState, actions.updatePage(newPage));
    expect(state.page).toEqual(newPage);
    expect(state.activePage).toEqual(initialState.activePage);
  });

  it('should update search word', () => {
    const newSearchWord = 'the mandalorian';
    const state = reducer(
      initialState,
      actions.updateSearchWord(newSearchWord)
    );
    expect(state.searchWord).toEqual(newSearchWord);
    expect(state.activePage).toEqual(initialState.activePage);
  });

  it('should update total results', () => {
    const newTotalResults = '666';
    const state = reducer(
      initialState,
      actions.updateTotalResults(newTotalResults)
    );
    expect(state.totalResults).toEqual(newTotalResults);
    expect(state.activePage).toEqual(initialState.activePage);
  });
});
