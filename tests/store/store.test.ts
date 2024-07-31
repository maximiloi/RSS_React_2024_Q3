import { store } from '../../src/store/store';
import { actions as selectedActions } from '../../src/store/selected.slice';
import { actions as searchActions } from '../../src/store/search.slice';
import api from '../../src/store/api';

describe('Redux Store', () => {
  it('should have initial state', () => {
    const state = store.getState();

    expect(state.selected).toEqual([]);
    expect(state.search).toEqual({
      activePage: 1,
      page: '1',
      searchWord: 'star wars',
      totalResults: '0',
    });
    expect(state[api.reducerPath]).toBeDefined();
  });

  it('should handle selected actions', () => {
    store.dispatch(selectedActions.toggleSelected('movie1'));
    let state = store.getState();
    expect(state.selected).toContain('movie1');

    store.dispatch(selectedActions.toggleSelected('movie1'));
    state = store.getState();
    expect(state.selected).not.toContain('movie1');
  });

  it('should handle search actions', () => {
    store.dispatch(searchActions.updateSearchWord('the mandalorian'));
    let state = store.getState();
    expect(state.search.searchWord).toEqual('the mandalorian');

    store.dispatch(searchActions.updateActivePage(2));
    state = store.getState();
    expect(state.search.activePage).toEqual(2);
  });
});
