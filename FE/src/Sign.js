// import axios from 'axios';
// import React,{useEffect, useState} from 'react';
// import { useHistory,useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Form, Button, InputGroup } from 'react-bootstrap';
import './Sign.css'
// import {CSSTransition} from "react-transition-group"

function Sign() {
  return(
    <div>
      <h1>회원가입페이지 입니다.</h1>
      <Form className="container signup-form">
        <Form.Group className="mb-3" controlId="formGroupID">
          <Form.Label>아이디</Form.Label>
          <Form.Control type="text" placeholder="아이디 입력" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupNickname">
          <Form.Label>닉네임</Form.Label>
          <Form.Control type="text" placeholder="닉네임 입력" />
        </Form.Group>        
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" placeholder="비밀번호 입력" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupCheckPassword">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control type="password" placeholder="비밀번호 확인" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control type="email" placeholder="이메일 입력" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupCheckEmail">
          <Form.Label>인증코드 입력</Form.Label>
          <InputGroup>
            <Form.Control type="email" placeholder="인증번호 입력" />
            <Button>인증하기</Button>
          </InputGroup>
          <Form.Text className="text-muted">
            가입 이후 이메일 인증을 통해 비밀번호를 찾을 수 있습니다.
          </Form.Text>
        </Form.Group>
        <Form.Group className="d-flex justify-content-between">
          <Form.Text>이메일이 도착하지 않았나요?</Form.Text>
          <Button>다시 보내기</Button>
        </Form.Group>
        <Form.Group className="d-flex justify-content-center">
          <Button type="submit">가입하기</Button>
        </Form.Group>        
      </Form>
    </div>
  )
}

export default Sign