import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
<<<<<<< HEAD

function FindPassword() {
=======
import backEndUrl from "../setup/hld_url";

function FindPassword() {
  const BEUrl = backEndUrl;
>>>>>>> dev
  const history = useHistory();
  const { key } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const handleNewPassword = (event) => {
    event.preventDefault();
    setNewPassword(event.target.value);
  };
  const handleConfirmNewPassword = (event) => {
    event.preventDefault();
    setConfirmNewPassword(event.target.value);
  };
  const onChangePassword = (event) => {
    event.preventDefault();
    if (newPassword && newPassword === confirmNewPassword) {
      axios({
<<<<<<< HEAD
        url: `http://localhost:8080/api/v1/users/password/${key}`,
=======
        url: `${BEUrl}/api/v1/users/password/${key}`,
>>>>>>> dev
        method: "put",
        data: {
          password: newPassword,
        },
      })
        .then(() => {
          history.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("비밀번호와 비밀번호 확인이 다릅니다.");
    }
  };
  return (
    <div>
      <h1 className="mt-3">비밀번호 변경</h1>
      <Form className="container mypage-form">
        <Form.Group className="mb-3" controlId="formNewPassword">
          <Form.Label>새 비밀번호</Form.Label>
          <Form.Control
            value={newPassword}
            onChange={handleNewPassword}
            type="password"
            placeholder="새 비밀번호를 입력하세요."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formConfirmNewPassword">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            value={confirmNewPassword}
            onChange={handleConfirmNewPassword}
            type="password"
            placeholder="새 비밀번호를 다시 한번 입력하세요."
          />
        </Form.Group>
        <Form.Group className="d-flex justify-content-center mt-3">
          <Button type="submit" onClick={onChangePassword}>
            변경하기
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default FindPassword;
