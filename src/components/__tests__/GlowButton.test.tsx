import { render, screen } from '@testing-library/react';
import GlowButton from '../GlowButton';

describe('GlowButton', () => {
  it('renders children and link', () => {
    render(<GlowButton href="#test">Click me</GlowButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '#test');
  });
});
