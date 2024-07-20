import { useTheme } from '../../context/ThemeContext';
import Header from '../../component/Header';
import Main from '../../component/Main';

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`content ${theme === 'blue' ? 'theme-blue' : 'theme-green'}`}
    >
      <Header />
      <Main />
    </div>
  );
};

export default App;
