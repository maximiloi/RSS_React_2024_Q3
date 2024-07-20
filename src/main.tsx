import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import ErrorBoundary from './component/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';

import App from './pages/App';
import ErrorPage from './pages/ErrorPage';
import Movie, { movieLoader } from './pages/Movie';

import './index.css';
import { store } from './store/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'movie/:id',
        element: <Movie />,
        loader: movieLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <Provider store={store}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  </ThemeProvider>
);
