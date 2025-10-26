import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home';

vi.mock('../../components/Search/Search.tsx', () => ({
  __esModule: true,
  default: () => <div data-testid="search-component" />,
}));

describe('Home Component', () => {
  it('Home Snapshot', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });

  it('Renders Home title', () => {
    render(<Home />);
    expect(screen.getByText('Best recipes')).toBeInTheDocument();
  });

  it('Renders Search component', () => {
    render(<Home />);
    expect(screen.getByTestId('search-component')).toBeInTheDocument();
  });
});
