import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import Pagination from '../../src/components/Pagination';

vi.mock('../../hooks/useActions', () => () => ({
  updatePage: vi.fn(),
}));

describe('Pagination Component', () => {
  const renderComponent = (store: EnhancedStore) => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination />
        </MemoryRouter>
      </Provider>
    );
  };

  it('should render correct page numbers', () => {
    const store = configureStore({
      reducer: {
        search: () => ({
          totalResults: '50',
          activePage: 1,
        }),
      },
    });

    renderComponent(store);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should change active page when a button is clicked', () => {
    const store = configureStore({
      reducer: {
        search: () => ({
          totalResults: '50',
          activePage: 1,
        }),
      },
    });

    renderComponent(store);

    const page2Button = screen.getByText('2');
    fireEvent.click(page2Button);

    expect(page2Button).toHaveClass('active');
  });
});
