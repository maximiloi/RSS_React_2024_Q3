import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../src/context/ThemeContext';
import ErrorBoundary from '../src/components/ErrorBoundary';
import App from '../src/pages/App';
import ErrorPage from '../src/pages/ErrorPage';
import Movie from '../src/pages/Movie';
import { store } from '../src/store/store';

describe('App', () => {
  it('should render App component', () => {
    render(
      <ThemeProvider>
        <Provider store={store}>
          <ErrorBoundary>
            <MemoryRouter>
              <App />
            </MemoryRouter>
          </ErrorBoundary>
        </Provider>
      </ThemeProvider>
    );
    expect(screen.getByText('Hello, RSS React student')).toBeDefined();
  });
});

describe('ErrorPage', () => {
  it('should render ErrorPage component', () => {
    render(
      <ThemeProvider>
        <Provider store={store}>
          <ErrorBoundary>
            <MemoryRouter>
              <ErrorPage />
            </MemoryRouter>
          </ErrorBoundary>
        </Provider>
      </ThemeProvider>
    );
    expect(screen.getByText('Something went wrong.')).toBeDefined();
  });
});

describe('Movie', () => {
  it('should render Movie component', () => {
    render(
      <ThemeProvider>
        <Provider store={store}>
          <ErrorBoundary>
            <MemoryRouter initialEntries={['/movie/tt1234567']}>
              <Movie />
            </MemoryRouter>
          </ErrorBoundary>
        </Provider>
      </ThemeProvider>
    );

    const movieDescDiv = document.querySelector('.spinner');
    expect(movieDescDiv).toBeInTheDocument();
  });
});
