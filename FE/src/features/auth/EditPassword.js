/* eslint-disable */
import { Button, Form, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
<<<<<<< HEAD

function EditPassword() {
=======
import backEndUrl from "../setup/hld_url";

function EditPassword() {
  const BEUrl = backEndUrl;
>>>>>>> dev
  const history = useHistory();
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };

  const [newPassword, setNewPassword] = useState("");
  const [checkNewPassword, setCheckNewPassword] = useState("");
  const handleNewPassword = (event) => {
    event.preventDefault();
    setNewPassword(event.target.value);
  };
  const handleCheckNewPassword = (event) => {
    event.preventDefault();
    setCheckNewPassword(event.target.value);
  };
  const onEditPassword = (event) => {
    event.preventDefault();
    axios({
<<<<<<< HEAD
      url: "http://localhost:8080/api/v1/users/edit-password",
=======
      url: `${BEUrl}/api/v1/users/edit-password`,
>>>>>>> dev
      method: "put",
      headers: setToken(),
      data: {
        password: newPassword,
      },
    })
      .then(() => {
        history.push("/mypage");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1 className="mt-3">비밀번호 변경</h1>
      <Form className="container mypage-form">
        <Form.Group className="mb-3" controlId="formGroupChangeNewPassword">
          <Form.Label>새 비밀번호</Form.Label>
          <Form.Control
            value={newPassword}
            onChange={handleNewPassword}
            type="password"
            placeholder="변경할 비밀번호를 입력하세요."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupCheckNewPassword">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            value={checkNewPassword}
            onChange={handleCheckNewPassword}
            type="password"
            placeholder="비밀번호를 다시 입력해 주세요."
          />
        </Form.Group>

        <Form.Group className="d-flex justify-content-center mt-3">
          <Button type="submit" onClick={onEditPassword}>
            비밀번호 변경
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default EditPassword;
