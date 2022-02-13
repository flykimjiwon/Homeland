/* eslint-disable */
import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import backEndUrl from "../setup/hld_url";

function CheckPassword() {
  const BEUrl = backEndUrl;
  const history = useHistory();
  const [password, setPassword] = useState("");
  const handleCheckPassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };
  const onCheckPasswordSubmit = (event) => {
    event.preventDefault();
    axios({
      url: `${BEUrl}/api/v1/auth/check-password`,
      method: "post",
      headers: setToken(),
      data: {
        password: password,
      },
    })
      .then(() => {
        history.push("/edit-password");
      })
      .catch(() => {
        alert("비밀번호가 틀렸습니다.");
      });
  };
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  return (
    <div style={{ paddingTop: "100px" }}>
      <h1>비밀번호 체크</h1>
      <Form className="container mypage-form">
        <Form.Group className="mb-3" controlId="formCheckPassword">
          <Form.Label>비밀번호 입력</Form.Label>
          <Form.Control
            value={password}
            onChange={handleCheckPassword}
            type="password"
            placeholder="비밀번호를 입력해 주세요."
          />
        </Form.Group>
        <Form.Group className="d-flex justify-content-center mt-3">
          <Button type="submit" onClick={onCheckPasswordSubmit}>
            확인
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default CheckPassword;
