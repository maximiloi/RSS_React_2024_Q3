import { render, screen } from '@testing-library/react';

import ErrorButton from '../../src/components/ErrorButton';

describe('ErrorButton', () => {
  it('should Render ErrorButton component', () => {
    render(<ErrorButton />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/throw an error/i);
  });
});
