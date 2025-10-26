import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';
import type { RecipeType } from '../RecipeBox/RecipeBox.tsx'; // ✅ path corretto

vi.mock('../../api/api.ts', () => ({
  getRecipesByIngredient: vi.fn(),
}));

// ✅ Mock React Query
const mockRefetch = vi.fn();
let mockQueryData: { meals: { idMeal: string; strMeal: string }[] } | null = null;
let mockError: { message: string } | null = null;
let mockIsFetching = false;

vi.mock('@tanstack/react-query', () => ({
  useQuery: () => ({
    data: mockQueryData,
    error: mockError,
    isFetching: mockIsFetching,
    refetch: mockRefetch,
  }),
}));

// ✅ Mock TanStack Router search params
const mockSetSearchParams = vi.fn();
vi.mock('react-router', () => ({
  useSearchParams: () => [new URLSearchParams({ search: 'pasta' }), mockSetSearchParams],
}));

// ✅ Mock RecipeBox
vi.mock('../RecipeBox/RecipeBox.tsx', () => ({
  __esModule: true,
  default: ({ recipe }: { recipe: RecipeType }) => (
    <div data-testid="recipe-box">{recipe.strMeal}</div>
  ),
}));

// ✅ Mock Modal to check if it is visible
vi.mock('../Modal/Modal.tsx', () => ({
  __esModule: true,
  default: ({ showModal }: { showModal: boolean }) =>
    showModal ? <div data-testid="modal">Error</div> : null,
}));

beforeEach(() => {
  mockRefetch.mockClear();
  mockSetSearchParams.mockClear();
  mockQueryData = null;
  mockError = null;
  mockIsFetching = false;
});

describe('Search Component', () => {
  it('Search Component Snapshot', () => {
    const { container } = render(<Search />);
    expect(container).toMatchSnapshot();
  });

  it('Shows validation error when input is empty', () => {
    render(<Search />);

    const input = screen.getByLabelText(/Search recipes/i);
    fireEvent.change(input, { target: { value: '' } });

    const button = screen.getByRole('button', { name: /Search/i });
    fireEvent.click(button);

    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('Renders recipes when api returns meals', () => {
    mockQueryData = {
      meals: [
        { idMeal: '1', strMeal: 'Pizza' },
        { idMeal: '2', strMeal: 'Pasta' },
      ],
    };

    render(<Search />);
    expect(screen.getAllByTestId('recipe-box')).toHaveLength(2);
  });

  it('Renders modal if api return an errors', () => {
    mockError = new Error('Network error');

    render(<Search />);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });
});
