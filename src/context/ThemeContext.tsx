import {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  FC,
} from 'react';

type Theme = 'blue' | 'green';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('Error useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('blue');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'blue' ? 'green' : 'blue'));
  };

  const memoizedValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={memoizedValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
