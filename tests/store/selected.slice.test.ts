import { describe, it, expect, vi } from 'vitest';
import { toast } from 'react-toastify';

import { reducer, actions } from '../../src/store/selected.slice';

vi.mock('react-toastify', () => ({
  toast: {
    info: vi.fn(),
  },
}));

describe('selectedSlice', () => {
  const initialState: string[] = [];

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should toggle selected movie ID', () => {
    const movieId = 'movie1';

    const stateAfterAdd = reducer(
      initialState,
      actions.toggleSelected(movieId)
    );
    expect(stateAfterAdd).toEqual([movieId]);
    expect(toast.info).toHaveBeenCalledWith('Select 1 movies', {
      theme: 'colored',
      autoClose: 2000,
    });

    const stateAfterRemove = reducer(
      stateAfterAdd,
      actions.toggleSelected(movieId)
    );
    expect(stateAfterRemove).toEqual([]);
    expect(toast.info).toHaveBeenCalledWith('Select 0 movies', {
      theme: 'colored',
      autoClose: 2000,
    });
  });

  it('should handle multiple movie IDs', () => {
    const movieId1 = 'movie1';
    const movieId2 = 'movie2';

    let state = reducer(initialState, actions.toggleSelected(movieId1));
    expect(state).toEqual([movieId1]);

    state = reducer(state, actions.toggleSelected(movieId2));
    expect(state).toEqual([movieId1, movieId2]);
    expect(toast.info).toHaveBeenCalledWith('Select 2 movies', {
      theme: 'colored',
      autoClose: 2000,
    });

    state = reducer(state, actions.toggleSelected(movieId1));
    expect(state).toEqual([movieId2]);
    expect(toast.info).toHaveBeenCalledWith('Select 1 movies', {
      theme: 'colored',
      autoClose: 2000,
    });
  });
});
