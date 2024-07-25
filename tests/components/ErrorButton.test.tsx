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
    expect(() => {
      render(<ErrorButton />);
      fireEvent.click(screen.getByText('throw an error'));
    }).toThrow('Something went wrong');
  });
});
