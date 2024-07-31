import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import { reducer } from '../../src/store/search.slice';
import MovieCard from '../../src/components/MovieCard';
import mockMovieData from '../mock/movieData';

describe('MovieCard', () => {
  const store = configureStore({ reducer });

  it('should render no movie card when array movies empty', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MovieCard movieData={[]} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/no movies/i)).toBeInTheDocument();
  });

  it('should render movie card of movie', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MovieCard movieData={mockMovieData} />
        </MemoryRouter>
      </Provider>
    );

    mockMovieData.forEach((movie) => {
      const heading = screen.getByRole('heading', { name: movie.Title });
      expect(heading).toBeInTheDocument();
    });
  });
});
