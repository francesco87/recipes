import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Details from './pages/Details/Details.tsx';
import Home from './pages/Home/Home.tsx';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const queryClient = new QueryClient();

const Wrapper = styled(Box)({
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 2rem',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Wrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="recipe/:id" element={<Details />} />
          </Routes>
        </BrowserRouter>
      </Wrapper>
    </QueryClientProvider>
  </StrictMode>
);
