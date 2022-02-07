import * as React from 'react';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import mg from './liar.png'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${mg})`,
        backgroundColor: 'white', // Average color of the background image.
        backgroundPosition: 'left',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={mg}
        alt="increase priority"
      />
      
      <Typography
        color="black"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        <Container maxWidth="sm">
        <Box sx={{ bgcolor: '', height: '30vh',width:'30vw' }} >
<h1>누구나 쉽게 어울릴 수 있는 곳</h1>
<h5>모처럼 한가하다면 술게임을 진행해 보세요. 같은방에 있는 친구들과 함께할 수 있답니다.</h5>
</Box>
      </Container>
      </Typography>
      
      
    </ProductHeroLayout>
  );
}
