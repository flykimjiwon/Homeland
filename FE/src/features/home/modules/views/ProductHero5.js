import * as React from 'react';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout2';
import mg from './liar.png'
// import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import { Container,Row, Col } from "react-bootstrap";
import './ProductHero.css'



export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        // backgroundImage: `url(${mg})`,
        backgroundColor: 'rgb(247,235,239)', // Average color of the background image.
        backgroundPosition: 'left',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      {/* <img
        style={{ display: 'none' }}
        src={mg}
        alt="increase priority"
      /> */}
      
      {/* <Typography
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
      </Typography> */}
      <Container>
 
 <Row>
   <Col>
     <Typography
       color="black"
       align="left"
       variant="h3"
       sx={{ mb: 1, mt: { sx: 2, sm: 5 } }}
     >
        <img src="https://line.me/static/16b422b92ad19d0696b896ca95276ac2/bd486/61912b3a659c6234bfe90ed46d683d14.png" width="600vw"></img>
     </Typography>
     </Col>
   <Col>
   <Typography
       color="black"
       align="center"
       variant="h3"
       sx={{ mb: 2, mt: { sx: 4, sm: 10 } }}
     >
      다 함께 짠 하기   
     </Typography>
   <Typography
       color="black"
       align="center"
      //  variant="h6"
       sx={{ mb: 1, mt: { sx: 2, sm: 5 } }}
     >
       <h5>
       오프라인 술자리의 묘미는 다 같이 술잔을 부딪히며 ‘짠’하는 건데 온라인에서는 못해서 아쉬우셨죠? HomeLanD에서는 그런 아쉬움을 날리기 위해 짠 효과 기능이 있답니다!  건배 버튼을 누르고 맥주 이모티콘과 함께 다 같이 술잔을 모니터에 가까이 대며 짠~ 크게 외쳐보아요     

       </h5>
     </Typography></Col>
 </Row>
</Container>
      
      
    </ProductHeroLayout>
  );
}
