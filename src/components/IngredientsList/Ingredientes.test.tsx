import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import IngredientsList from './IngredientsList';

const mockIngredients: [string, string][] = [
  ['id1', 'Tomato'],
  ['id2', 'Onion'],
];

const mockQuantities: [string, string][] = [
  ['q1', '2 pcs'],
  ['q2', '1 pc'],
];

describe('IngredientsList Component', () => {
  it('Render IngredientsList component', () => {
    render(<IngredientsList ingredients={mockIngredients} quantities={mockQuantities} />);
    mockIngredients.forEach((ingredient, index) => {
      const text = `${ingredient[1]}: ${mockQuantities[index][1]}`;
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('IngredientsList Snapshot', () => {
    const { container } = render(
      <IngredientsList ingredients={mockIngredients} quantities={mockQuantities} />
    );
    expect(container).toMatchSnapshot();
  });
});
