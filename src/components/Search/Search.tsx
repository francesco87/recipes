import { useQuery } from '@tanstack/react-query';
import { getRecipesByIngredient } from '../../api/api.ts';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import RecipeBox from '../RecipeBox/RecipeBox.tsx';
import { useSearchParams } from 'react-router';
import Modal from '../Modal/Modal.tsx';
import Typography from '@mui/material/Typography';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ingredient, setIngredient] = useState(searchParams.get('search'));
  const [touched, setTouched] = useState(false);
  const { data, isFetching, refetch, error } = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getRecipesByIngredient(ingredient),
    enabled: false,
  });
  const [showModal, setShowModal] = useState(false);
  const recipes = data?.meals || [];
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    setShowModal(!!error);
  }, [error]);

  const NoResults = () => {
    if (data?.meals === null) {
      return (
        <Typography sx={{ textAlign: 'center' }} variant="subtitle1" gutterBottom>
          No recipes found
        </Typography>
      );
    }
    return <></>;
  };

  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (ingredient) {
            setSearchParams({ search: ingredient || '' });
            refetch();
          }
        }}
      >
        <Grid container spacing={1} sx={{ marginBottom: 4 }}>
          <Grid size={{ xs: 12, md: 9 }}>
            <TextField
              placeholder="Type a meal or an ingredient"
              fullWidth
              size="small"
              label="Search recipes"
              variant="outlined"
              onChange={(e) => {
                setTouched(true);
                setIngredient(e.target.value);
              }}
              value={ingredient || ''}
              disabled={isFetching}
              error={touched && !ingredient}
              helperText={touched && !ingredient ? 'Required' : ''}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              loading={isFetching}
              loadingPosition="end"
              disableElevation
              endIcon={<SearchIcon />}
              type="submit"
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
      <Grid container spacing={1}>
        {recipes?.map((recipe) => (
          <Grid size={{ xs: 12, md: 4 }} key={recipe.idMeal}>
            <RecipeBox recipe={recipe} />
          </Grid>
        ))}
      </Grid>
      <NoResults />
      <Modal
        title="Error"
        message={error?.message}
        showModal={showModal}
        handleClose={closeModal}
      />
    </Box>
  );
};

export default Search;
