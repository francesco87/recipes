import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import RecipeBox from './RecipeBox';
import { BrowserRouter } from 'react-router';
import recipeMock from '../../api/mock/RecipeMock.ts';

const mockNavigate = vi.fn();

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('../Favorite/Favorite.tsx', () => ({
  default: ({ id }: { id: string }) => <div data-testid="favorite-mock">Favorite Mock {id}</div>,
}));

// Setup localStorage mock
beforeEach(() => {
  mockNavigate.mockClear();
  vi.stubGlobal('localStorage', {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  });
});

describe('RecipeBox Component', () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <RecipeBox recipe={recipeMock} />
      </BrowserRouter>
    );

  it('Show recipe title and description', () => {
    renderComponent();
    expect(screen.getByText('Pizza Margherita')).toBeInTheDocument();
    expect(screen.getByText('Bake it in the oven.')).toBeInTheDocument();
  });

  it('Show recipe image', () => {
    renderComponent();
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img).toHaveAttribute('src', recipeMock.strMealThumb);
    expect(img).toHaveAttribute('alt', recipeMock.strMeal);
  });

  it('Show favorite recipe', () => {
    renderComponent();
    expect(screen.getByTestId('favorite-mock')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-mock')).toHaveTextContent('12345');
  });

  it('RecipeBox Snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
