import { fireEvent, render, screen } from '@testing-library/react';

import ErrorButton from '../../src/components/ErrorButton';

describe('ErrorButton', () => {
  it('should Render ErrorButton component', () => {
    render(<ErrorButton />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/throw an error/i);
  });

  it('should throws an error when the button is clicked', () => {
    render(<ErrorButton />);

    expect(() => {
      const button = screen.getByRole('button');
      fireEvent.click(button);
    }).toThrow(/Something went wrong/i);
  });
});
