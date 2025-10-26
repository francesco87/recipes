import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import Favorite from './Favorite';

describe('Favorite Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Show icon StarOutlineIcon if recipe is not in favorites', () => {
    render(<Favorite id="1" />);
    expect(screen.getByTestId('StarOutlineIcon')).toBeInTheDocument();
  });

  it('Show StarIcon if recipe is in favorites', () => {
    localStorage.setItem('favorites', JSON.stringify(['1']));
    render(<Favorite id="1" />);
    expect(screen.getByTestId('StarIcon')).toBeInTheDocument();
  });

  it('Remove recipe from favorites on click', () => {
    localStorage.setItem('favorites', JSON.stringify(['1']));
    render(<Favorite id="1" />);
    const starIcon = screen.getByTestId('StarIcon');
    fireEvent.click(starIcon);

    const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
    expect(stored).not.toContain('1');
    expect(screen.getByTestId('StarOutlineIcon')).toBeInTheDocument();
  });

  it('Add recipe to favorite', () => {
    localStorage.setItem('favorites', JSON.stringify(['1']));
    render(<Favorite id="2" />);
    const outlineIcon = screen.getByTestId('StarOutlineIcon');
    fireEvent.click(outlineIcon);

    const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
    expect(stored).toContain('1');
    expect(stored).toContain('2');
    expect(stored.length).toBe(2);
  });
});
