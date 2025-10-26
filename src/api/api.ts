import axios from 'axios';
import type { RecipeType } from '../components/RecipeBox/RecipeBox.tsx';
const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const getRecipesByIngredient = async (
  keyword?: string | null
): Promise<{ meals: RecipeType[] }> => {
  const res = await axios.get(`${apiUrl}/${apiKey}/search.php?s=${keyword}`);
  return res.data;
};

export const getRecipeById = async (id?: string): Promise<RecipeType> => {
  const res = await axios.get(`${apiUrl}/${apiKey}/lookup.php?i=${id}`);
  return res.data.meals[0];
};
