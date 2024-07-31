import { render, screen, fireEvent, renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider, useTheme } from '../../src/context/ThemeContext';

const TestComponent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button type="button" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

describe('Context ThemeProvider', () => {
  it('must be initialized with the theme “blue”', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeElement = screen.getByTestId('theme');
    expect(themeElement.textContent).toBe('blue');
  });

  it('should switch the theme to “green”', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByText('Toggle Theme');
    fireEvent.click(button);

    const themeElement = screen.getByTestId('theme');
    expect(themeElement.textContent).toBe('green');
  });

  it('should switch the theme back to “blue”', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByText('Toggle Theme');
    fireEvent.click(button);
    fireEvent.click(button);

    const themeElement = screen.getByTestId('theme');
    expect(themeElement.textContent).toBe('blue');
  });
});

describe('Context useTheme', () => {
  it('must return the correct value inside ThemeProvider', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeElement = screen.getByTestId('theme');
    expect(themeElement.textContent).toBe('blue');
  });

  it('should throw an error if it is used outside ThemeProvider', () => {
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    try {
      renderHook(() => useTheme(), { wrapper });
    } catch (error) {
      expect(error).toEqual(
        new Error('Error useTheme must be used within a ThemeProvider')
      );
    }
  });

  it('must return the correct value inside ThemeProvider', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    expect(result.current.theme).toBe('blue');
  });
});
