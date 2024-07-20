import { useTheme } from '../../context/ThemeContext';

const ThemeTogglerButton: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} type="button" className="button">
      Toggle Theme
    </button>
  );
};

export default ThemeTogglerButton;
