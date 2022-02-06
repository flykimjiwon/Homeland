import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import TextField from '@mui/material/TextField';
import mg from './stayhome.png'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${mg})`,
        backgroundColor: '#e8eaf6', // Average color of the background image.
        backgroundPosition: 'right',
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
<h1>나와 친구를 위한 술게임 공간을 만들어보세요</h1>
<h5>Home Lan Drink 각자의 방을 제공합니다. 방번호를 공유하고, 편하게 이야기를 나눌 수 있어요.</h5>
</Box>
      </Container>
      </Typography>
      
      
    </ProductHeroLayout>
  );
}
