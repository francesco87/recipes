import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useState } from 'react';

type Props = {
  id: string;
};

const Favorite = ({ id }: Props) => {
  const stored = localStorage.getItem('favorites');
  const [favoritesList, setFavoritesList] = useState<string[]>(stored ? JSON.parse(stored) : []);

  const onAdd = () => {
    const fav = [...JSON.parse(localStorage.getItem('favorites') as string), id];
    localStorage.setItem('favorites', JSON.stringify(fav));
    setFavoritesList(fav);
  };

  const onRemove = () => {
    const fav = JSON.parse(localStorage.getItem('favorites') as string).filter(
      (item: string) => item !== id
    );
    localStorage.setItem('favorites', JSON.stringify(fav));
    setFavoritesList(fav);
  };

  if (favoritesList.find((item) => item === id)) {
    return (
      <StarIcon
        data-testid="StarIcon"
        sx={{
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '100%',
          padding: '5px',
          fontSize: 26,
          cursor: 'pointer',
          position: 'absolute',
          top: 5,
          right: 5,
          color: '#000',
        }}
        onClick={onRemove}
      />
    );
  }

  return (
    <StarOutlineIcon
      data-testid="StarOutlineIcon"
      sx={{
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '100%',
        padding: '5px',
        fontSize: 26,
        cursor: 'pointer',
        position: 'absolute',
        top: 5,
        right: 5,
        color: '#000',
      }}
      onClick={onAdd}
    />
  );
};

export default Favorite;
