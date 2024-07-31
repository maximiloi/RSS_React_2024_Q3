import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Spinner from '../../src/components/Spinner';

describe('Spinner component', () => {
  it('should render the spinner image', () => {
    render(<Spinner />);

    const spinnerImg = screen.getByAltText('loading...');
    expect(spinnerImg).toBeInTheDocument();
    expect(spinnerImg).toHaveAttribute('src', '/src/assets/cinema.png');
  });

  it('should have the correct class names', () => {
    render(<Spinner />);

    const spinnerElement = screen.getByRole('img');
    expect(spinnerElement).toHaveClass('spinner__img');
    expect(spinnerElement.parentElement).toHaveClass('spinner');
  });
});
