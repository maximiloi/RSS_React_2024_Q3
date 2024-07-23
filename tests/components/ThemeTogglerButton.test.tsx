import { render, screen } from '@testing-library/react';

import ThemeContext, { ThemeContextType } from '../../src/context/ThemeContext';
import ThemeTogglerButton from '../../src/components/ThemeTogglerButton';

const theme = 'blue';
const mockContextValue: ThemeContextType = { theme, toggleTheme: () => {} };

describe('ThemeTogglerButton', () => {
  it('should render toggle theme button', () => {
    render(
      <ThemeContext.Provider value={mockContextValue}>
        <ThemeTogglerButton />
      </ThemeContext.Provider>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/toggle theme/i);
  });
});
