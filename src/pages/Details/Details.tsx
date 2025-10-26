import type { RecipeType } from '../../components/RecipeBox/RecipeBox.tsx';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getRecipeById } from '../../api/api.ts';
import { useEffect, useMemo, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IngredientsList from '../../components/IngredientsList/IngredientsList.tsx';
import Favorite from '../../components/Favorite/Favorite.tsx';
import Header from '../../components/Header/Header.tsx';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState<RecipeType | undefined>(
    JSON.parse(localStorage.getItem('currentRecipe') || '{}')
  );
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['recipes', id],
    queryFn: () => getRecipeById(id),
    enabled: false,
  });

  const getIngredients = useMemo(() => {
    if (recipeData) {
      return Object.entries(recipeData).filter(([key, value]) => {
        return key.includes('strIngredient') && value;
      }) as [string, string][];
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeData?.idMeal]);

  const getQuantities = useMemo(() => {
    if (recipeData) {
      return Object.entries(recipeData).filter(([key, value]) => {
        return key.includes('strMeasure') && value;
      }) as [string, string][];
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeData?.idMeal]);

  useEffect(() => {
    if (!id) {
      navigate('/');
    }
    if (id && !recipeData?.idMeal) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, recipeData?.idMeal]);

  useEffect(() => {
    setRecipeData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.idMeal]);

  if (!recipeData) {
    return <h1>Error</h1>;
  }

  if (isFetching) {
    return <h1>Loading...</h1>;
  }

  return (
    <Box>
      <Header />
      <Typography variant="h2" gutterBottom>
        {recipeData.strMeal}
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{
              width: '100%',
              height: 350,
              marginBottom: 2,
              backgroundImage: `url(${recipeData.strMealThumb})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              position: 'relative',
            }}
          >
            <Favorite id={recipeData?.idMeal} />
          </Box>

          <Grid size={{ md: 4 }} display={{ xs: 'block', sm: 'block', md: 'none' }}>
            <IngredientsList ingredients={getIngredients} quantities={getQuantities} />
          </Grid>

          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            PREPARATIONS:
          </Typography>
          <Typography variant="body2">{recipeData.strInstructions}</Typography>
        </Grid>
        <Grid size={{ md: 4 }} display={{ xs: 'none', sm: 'none', md: 'block' }}>
          <IngredientsList ingredients={getIngredients} quantities={getQuantities} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Details;
