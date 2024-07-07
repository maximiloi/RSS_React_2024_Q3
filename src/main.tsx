import ReactDOM from 'react-dom/client';

import App from './App';
import ErrorBoundary from './component/ErrorBoundary';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
