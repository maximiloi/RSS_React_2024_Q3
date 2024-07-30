import { describe, it, expect, vi } from 'vitest';

import { reducer, actions } from '../../src/store/selected.slice';
import { Movie } from '../../src/utils/apiResponseType';

vi.mock('react-toastify', () => ({
  toast: {
    info: vi.fn(),
  },
}));

describe('selectedSlice', () => {
  it('should handle initial state', () => {
    const initialState: [] = [];
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should toggle selected movie', () => {
    const initialState: [] = [];
    const movie = {
      Title: 'Saw',
      Year: '2004',
      imdbID: 'tt0387564',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BM2M1MzI1MWYtYmM2ZC00OWY3LTk0ZGMtNmRkNzU1NzEzMWE5XkEyXkFqcGdeQXVyODUwOTkwODk@._V1_SX300.jpg',
    };

    const stateAfterAdd = reducer(initialState, actions.toggleSelected(movie));
    expect(stateAfterAdd).toEqual([movie]);

    const stateAfterRemove = reducer(
      stateAfterAdd,
      actions.toggleSelected(movie)
    );
    expect(stateAfterRemove).toEqual([]);
  });

  it('should handle multiple movies', () => {
    const initialState: [] = [];
    const movie1 = {
      Title: 'Saw',
      Year: '2004',
      imdbID: 'tt0387564',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BM2M1MzI1MWYtYmM2ZC00OWY3LTk0ZGMtNmRkNzU1NzEzMWE5XkEyXkFqcGdeQXVyODUwOTkwODk@._V1_SX300.jpg',
    };
    const movie2 = {
      Title: 'Saw II',
      Year: '2005',
      imdbID: 'tt0432348',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjY4Mjg4YTgtZWU2MC00MzVlLTg3MDgtYzUyYzU1NGMyMmU5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    };

    let state = reducer(initialState, actions.toggleSelected(movie1));
    expect(state).toEqual([movie1]);

    state = reducer(state, actions.toggleSelected(movie2));
    expect(state).toEqual([movie1, movie2]);

    state = reducer(state, actions.toggleSelected(movie1));
    expect(state).toEqual([movie2]);
  });

  it('should remove all selected movies', () => {
    const initialState: Movie[] = [
      {
        Title: 'Saw',
        Year: '2004',
        imdbID: 'tt0387564',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BM2M1MzI1MWYtYmM2ZC00OWY3LTk0ZGMtNmRkNzU1NzEzMWE5XkEyXkFqcGdeQXVyODUwOTkwODk@._V1_SX300.jpg',
      },
      {
        Title: 'Saw II',
        Year: '2005',
        imdbID: 'tt0432348',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BMjY4Mjg4YTgtZWU2MC00MzVlLTg3MDgtYzUyYzU1NGMyMmU5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
      },
    ];

    const expectedState: Movie[] = [];

    const newState = reducer(initialState, actions.deleteSelected());

    expect(newState).toEqual(expectedState);
  });

  it('should return an empty array when state is already empty', () => {
    const initialState: Movie[] = [];

    const expectedState: Movie[] = [];

    const newState = reducer(initialState, actions.deleteSelected());

    expect(newState).toEqual(expectedState);
  });
});
