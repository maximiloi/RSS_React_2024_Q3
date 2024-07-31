import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HttpResponse, http } from 'msw';
import server from '../mock/server';
import { store } from '../../src/store/store';
import Movie from '../../src/pages/Movie';

describe('Movie', () => {
  test('renders movie details', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movie/tt1234567']}>
          <Routes>
            <Route path="/movie/:imdbID" element={<Movie />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    server.use(
      http.get('/movie/tt1234567', () => {
        return new HttpResponse(null, { status: 401 });
      })
    );

    expect(await screen.findByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByAltText('Test Movie')).toHaveAttribute(
      'src',
      'https://example.com/poster.jpg'
    );
    expect(screen.getByText('Director: John Doe')).toBeInTheDocument();
    expect(screen.getByText('Genre: Action')).toBeInTheDocument();
    expect(screen.getByText('Awards: 2 Oscars')).toBeInTheDocument();
    expect(
      await screen.findByText((content) =>
        content.includes('This is a test movie plot.')
      )
    ).toBeInTheDocument();
  });
});
