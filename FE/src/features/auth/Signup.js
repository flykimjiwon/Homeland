/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import "./Signup.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import backEndUrl from "../setup/hld_url";

function Sign() {
  const BEUrl = backEndUrl;
  const history = useHistory();
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");

  const handleId = (event) => {
    event.preventDefault();
    setId(event.target.value);
  };
  const handleNickname = (event) => {
    event.preventDefault();
    setNickname(event.target.value);
  };
  const handlePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };
  const handlePasswordConfirm = (event) => {
    event.preventDefault();
    setPasswordConfirm(event.target.value);
  };
  const handleEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios({
      url: `${BEUrl}/api/v1/users`,
      method: "post",
      data: {
        id: id,
        nickname: nickname,
        password: password,
        email: email,
      },
    })
      .then(() => {
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1 className="mt-3">회원가입</h1>
      <Form className="container signup-form">
        <Form.Label>아이디</Form.Label>
        <InputGroup className="mb-3">
          <FormControl
            value={id}
            onChange={handleId}
            type="text"
            placeholder="아이디 입력"
          />
          <Button id="button-addon2">중복확인</Button>
        </InputGroup>

        <Form.Group className="mb-3" controlId="formGroupNickname">
          <Form.Label>닉네임</Form.Label>
          <Form.Control
            value={nickname}
            onChange={handleNickname}
            type="text"
            placeholder="닉네임 입력"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>e-mail</Form.Label>
          <Form.Control
            value={email}
            onChange={handleEmail}
            type="email"
            placeholder="e-mail 입력"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            value={password}
            onChange={handlePassword}
            type="password"
            placeholder="비밀번호 입력"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupCheckPassword">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            value={passwordConfirm}
            onChange={handlePasswordConfirm}
            type="password"
            placeholder="비밀번호 확인"
          />
        </Form.Group>

        <Form.Group className="d-flex justify-content-center mt-3">
          <Button type="submit" onClick={onSubmit}>
            가입하기
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Sign;
