import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import { reducer } from '../../src/store/search.slice';
import ThemeContext, { ThemeContextType } from '../../src/context/ThemeContext';

import Header from '../../src/components/Header';

const theme = 'blue';
const mockContextValue: ThemeContextType = { theme, toggleTheme: () => {} };

vi.mock('../../src/components/Search', () => ({
  default: () => {
    return <div>Search Component</div>;
  },
}));

vi.mock('../../src/components/ErrorButton', () => ({
  default: () => {
    return <div>Error Button Component</div>;
  },
}));

vi.mock('../../src/components/ThemeTogglerButton', () => ({
  default: () => {
    return <div>Theme Toggler Button Component</div>;
  },
}));

describe('Header', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeContext.Provider value={mockContextValue}>
            <Header />
          </ThemeContext.Provider>
        </MemoryRouter>
      </Provider>
    );
  });

  it('should render header title', () => {
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Hello, RSS React student/i);
  });

  it('should renders Search, ErrorButton and ThemeTogglerButton', () => {
    expect(screen.getByText('Search Component')).toBeInTheDocument();
    expect(screen.getByText('Error Button Component')).toBeInTheDocument();
    expect(
      screen.getByText('Theme Toggler Button Component')
    ).toBeInTheDocument();
  });
});
