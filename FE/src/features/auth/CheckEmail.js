import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
<<<<<<< HEAD

function CheckEmail() {
=======
import backEndUrl from "../setup/hld_url";

function CheckEmail() {
  const BEUrl = backEndUrl;
>>>>>>> dev
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const handleId = (event) => {
    event.preventDefault();
    setId(event.target.value);
  };
  const handleEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };
  const onCheckEmail = (event) => {
    event.preventDefault();
    axios({
<<<<<<< HEAD
      url: "http://localhost:8080/api/v1/users/find-password",
=======
      url: `${BEUrl}/api/v1/users/find-password`,
>>>>>>> dev
      method: "post",
      data: {
        id: id,
        email: email,
      },
    })
      .then(() => {
        setId("");
        setEmail("");
        alert("E-mail 인증 요청이 완료되었습니다. E-Mail을 확인해주세요.");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1 className="mt-3">비밀번호 찾기 전 아이디&이메일 체크</h1>
      <Form className="container mypage-form">
        <Form.Group className="mb-3" controlId="FormCheckID">
          <Form.Label>ID</Form.Label>
          <Form.Control
            value={id}
            onChange={handleId}
            type="text"
            placeholder="ID를 입력하세요."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="FormCheckEmail">
          <Form.Label>E-Mail</Form.Label>
          <Form.Control
            value={email}
            onChange={handleEmail}
            type="email"
            placeholder="E-Mail을 입력하세요."
          />
        </Form.Group>
        <Form.Group className="d-flex justify-content-center mt-3">
          <Button type="submit" onClick={onCheckEmail}>
            이메일 인증 요청
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default CheckEmail;
