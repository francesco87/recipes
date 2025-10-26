import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import Header from './Header';

const mockNavigate = vi.fn();

vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

describe('Header Component', () => {
  it('Render Go results list Button', () => {
    render(<Header />);
    const button = screen.getByText('Go results list');
    expect(button).toBeInTheDocument();
  });

  it('Go back when click on button', () => {
    render(<Header />);
    const button = screen.getByText('Go results list');
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('Header Snapshot', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
