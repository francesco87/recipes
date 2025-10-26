import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import Favorite from '../Favorite/Favorite.tsx';

export type RecipeType = {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
};

type Props = {
  recipe: RecipeType;
};

const RecipeBox = ({ recipe }: Props) => {
  const navigate = useNavigate();

  const onClick = () => {
    localStorage.setItem('currentRecipe', JSON.stringify(recipe));
    navigate(`/recipe/${recipe.idMeal}`);
  };

  return (
    <Card sx={{ width: '100%', position: 'relative' }}>
      <CardMedia component="img" alt={recipe.strMeal} height="180" image={recipe.strMealThumb} />
      <CardContent>
        <Favorite id={recipe.idMeal} />
        <Typography
          variant="h6"
          component="div"
          sx={{
            height: '65px',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
          }}
        >
          {recipe.strMeal}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
          }}
        >
          {recipe.strInstructions}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onClick}>
          See details...
        </Button>
      </CardActions>
    </Card>
  );
};

export default RecipeBox;
