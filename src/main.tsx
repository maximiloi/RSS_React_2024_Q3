import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './component/ErrorBoundary';

import App from './App';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>
);
