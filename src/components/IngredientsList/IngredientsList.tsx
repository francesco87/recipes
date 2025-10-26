import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from 'react';

type Item = [string, string];

type Props = {
  ingredients: Item[];
  quantities: Item[];
};

const IngredientsListComponent = ({ ingredients, quantities }: Props) => {
  return (
    <Box sx={{ marginBottom: 3 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        INGREDIENTS:
      </Typography>
      <Grid container spacing={1}>
        {ingredients.map((ingredient, index) => (
          <Grid size={6} key={index}>
            <Typography variant="body2" gutterBottom>
              {ingredient[1]}: {quantities[index][1]}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const IngredientsList = React.memo(IngredientsListComponent);

export default IngredientsList;
