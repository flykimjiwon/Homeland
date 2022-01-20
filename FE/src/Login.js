import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { useHistory,useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Button,Navbar,Container,Nav,NavDropdown,Carousel,Form,Col,Row } from 'react-bootstrap';
import {CSSTransition} from "react-transition-group"
import './Login.css'

function Login(){

  return(
    <div>
      <h1>로그인 페이지 입니다.</h1>
      
      <Row>
    <Col></Col>
    <Col xs={2}>
    <div className='login'>
    <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</div>
    </Col>
    <Col></Col>
  </Row>
      
      

    </div>
  )
}




export default Login