/* eslint-disable */
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import backEndUrl from "../setup/hld_url";

function EditProfile() {
  const BEUrl = backEndUrl;
  const history = useHistory();
  const [newNickname, setNewNickname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const handleNewNickname = (event) => {
    event.preventDefault();
    setNewNickname(event.target.value);
  };
  const handleNewEmail = (event) => {
    event.preventDefault();
    setNewEmail(event.target.value);
  };
  const onEdit = (event) => {
    event.preventDefault();
    axios({
      url: `${BEUrl}/api/v1/users/edit`,
      method: "put",
      headers: setToken(),
      data: {
        nickname: newNickname,
        email: newEmail,
      },
    })
      .then(() => {
        history.push("/mypage");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getProfile = () => {
    axios({
      url: `${BEUrl}:8080/api/v1/users/me`,
      method: "get",
      headers: setToken(),
    }).then((res) => {
      setNewNickname(res.data.nickname);
      setNewEmail(res.data.email);
    });
  };
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h1 className="mt-3">회원정보 수정</h1>
      <Form className="container mypage-form">
        <Form.Group className="mb-3" controlId="formGroupChangeNickname">
          <Form.Label>닉네임 변경</Form.Label>
          <Form.Control
            value={newNickname}
            onChange={handleNewNickname}
            type="text"
            placeholder="변경할 닉네임을 입력하세요."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupNewEmail">
          <Form.Label>e-mail 변경</Form.Label>
          <Form.Control
            value={newEmail}
            onChange={handleNewEmail}
            type="email"
            placeholder="변경할 E-mail을 입력하세요."
          />
        </Form.Group>

        <Form.Group className="d-flex justify-content-center mt-3">
          <Button type="submit" onClick={onEdit}>
            수정하기
          </Button>
          <Link to="/check-password">
            <div>비밀번호 변경</div>
          </Link>
        </Form.Group>
      </Form>
    </div>
  );
}

export default EditProfile;
