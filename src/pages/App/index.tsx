import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/Header';
import Main from '../../components/Main';
import Modal from '../../components/Modal';

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`content ${theme === 'blue' ? 'theme-blue' : 'theme-green'}`}
    >
      <Header />
      <Main />
      <Modal />
    </div>
  );
};

export default App;
