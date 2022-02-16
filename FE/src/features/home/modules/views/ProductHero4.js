import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout2';
import TextField from '@mui/material/TextField';
import mg from './stayhome.png'
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
        backgroundPosition: 'right',
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
        <div className='dbox'>hihi</div>
        
        <h1>여기내용</h1>
</Box>
      </Container>
      </Typography> */}




<Container>
 
  <Row>

    <Col>
    
    <Typography
        color="black"
        align="center"
        variant="h3"
        sx={{ mb: 2, mt: { sx: 4, sm: 10 } }}
      >
       스냅샷 찍고 추억 남기기   
      </Typography>
      <Typography
        color="black"
        align="center"
        // variant="h6"
        sx={{ mb: 1, mt: { sx: 2, sm: 5 } }}
      >
<h5>
오프라인에서 다같이 셀카를 남기듯이 온라인 술자리에서도 추억 남기기가 빠질 수 없죠! 사진찍기 버튼을 누르면 3,2,1 카운트 다운 후 ‘찰칵’ 스냅샷이 찍혀요. 사진이 마음에 들면 자신 컴퓨터에 저장을 할 수 있고 마음에 들지 않으면 저장하지 않기를 누르고 다시 한번 찍어요~ 이렇게 추억 한 장 남기기 오늘도 성공!

</h5>
      </Typography>
    
      </Col>
    
    <Col>
    
    <Typography
        color="black"
        align="center"
        variant="h3"
        sx={{ mb: 1, mt: { sx: 2, sm: 5 } }}
      >
       {/* 여기다 이미지박아용 */}
       <img src="https://line.me/static/5a383cb3cc7f3d63e2483c96eb3ec114/bd486/e75d07a92e15fff9c7a1a9ed0cddc3f9.png" width="600vw"></img>
      
      </Typography></Col>
  </Row>
</Container>
      
      
    </ProductHeroLayout>
  );
}
