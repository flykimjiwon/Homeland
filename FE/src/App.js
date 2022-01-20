/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import Room from './Room.js'
import Notice from './Notice.js'
import Login from './Login'
import Logout from './Logout';
import Sign from './Sign';
import Mypage from './Mypage';
import IMG from './img/a.png'
import React,{useContext, useState,lazy,Suspense} from 'react';
import { Button,Navbar,Container,Nav,NavDropdown,Carousel,Row,Col } from 'react-bootstrap';
import {Link, Route, Switch} from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function App() {
  
  let [Tab, TabChange] = useState(0);
  let [Switch,SwitchChange] = useState(false)
  
  return (
    <div className="App">
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand eventKey="link-0" onClick = {()=>{ SwitchChange(false);TabChange(0)}} href="#">HomeLanDrink</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link eventKey="link-1" onClick = {()=>{ SwitchChange(false);TabChange(1)}}>공지사항</Nav.Link>
      <Nav.Link eventKey="link-2" onClick = {()=>{ SwitchChange(false);TabChange(2)}}>참가</Nav.Link>

  
    </Nav>
    <Nav>
      <Nav.Link eventKey="link-3" onClick = {()=>{ SwitchChange(false);TabChange(3)}} href="#">로그인</Nav.Link>
      <Nav.Link eventKey="link-4" onClick = {()=>{ SwitchChange(false);TabChange(4)}} href="#">로그아웃</Nav.Link>
      <Nav.Link eventKey="link-5" onClick = {()=>{ SwitchChange(false);TabChange(5)}} href="#">회원가입</Nav.Link>
      <Nav.Link eventKey="link-6" onClick = {()=>{ SwitchChange(false);TabChange(6)}} href="#">마이페이지</Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
<TabContent Tab = {Tab} SwitchChange = {SwitchChange}></TabContent>

{/* <Route exact path="/">
  <Main></Main>
</Route>
<Route path="/room">
<Room></Room>
</Route>
<Route path="/notice">
<Notice></Notice>
</Route> */}



    </div>
  );
}

function TabContent(props){

  if(props.Tab === 0){
    return <div><Main></Main></div>
  } else if(props.Tab === 1){
    return <div><Notice></Notice></div>
  }else if(props.Tab === 2){
    return <div><Room></Room></div>
  }else if(props.Tab === 3){
    return <div><Login></Login></div>
  }
  else if(props.Tab === 4){
    return <div><Logout></Logout></div>
  }
  else if(props.Tab === 5){
    return <div><Sign></Sign></div>
  }else if(props.Tab === 6){
    return <div><Mypage></Mypage></div>
  }

}

function Main(){
  return (
    <div>
<Container>
  <Row>
    <Col></Col>
    <Col xs={6}>
      
      <h1>밖에서 술 드시기 힘드시죠?</h1>
      <p>이런 공간이 있다면 어떨까요...
...온라인 술자리도 오프라인 술자리 처럼 느낄 수 있는 공간. 소중한 단짝 친구들과 바로 옆에 있는 듯한 느낌을 주는 우리만의 공간. 더 쉽게, 매일 어울리고 즐겁게 술 마실 수 있는 그런 공간 말이에요.</p>
    </Col>
    <Col></Col>
  </Row>
  <Row>
    <Col></Col>
    <Col xs={6}>

      <h1>방개설하기 // 코드입력란</h1>
      <h1>최근 업데이트 내역 삽입</h1>
      <h2>서비스에 대해 설명하는창...</h2>

    </Col>
    <Col></Col>
  </Row>

</Container>
    </div>
  )
}

export default App;
