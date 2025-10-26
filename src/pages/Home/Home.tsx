import Search from '../../components/Search/Search.tsx';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';

const Home = () => {
  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Best recipes
      </Typography>
      <Search />
    </Box>
  );
};

export default Home;
