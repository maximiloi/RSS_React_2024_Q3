import { ToastContainer } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../component/Header';
import Main from '../../component/Main';

import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`content ${theme === 'blue' ? 'theme-blue' : 'theme-green'}`}
    >
      <Header />
      <Main />
      <ToastContainer />
    </div>
  );
};

export default App;
