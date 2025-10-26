import { useNavigate } from 'react-router';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Header = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        paddingBottom: 4,
      }}
    >
      <Box>
        <Button onClick={() => navigate(-1)} startIcon={<ChevronLeftIcon />}>
          Go results list
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
