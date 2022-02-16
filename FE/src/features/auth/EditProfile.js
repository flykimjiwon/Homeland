/* eslint-disable */
import { Button, Form, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./EditProfile.css";
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
      url: `${BEUrl}/api/v1/users/me`,
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
    <div style={{ paddingTop: "100px" }}>
      <h1 className="mt-3" style={{ color: "#353f71", fontSize: "50px" }}>
        회원정보 수정
      </h1>
      <Container style={{ width: "500px", marginTop: "50px" }}>
        <Form className="edit-profile-form">
          <Form.Group className="mb-3">
            <Form.Label className="edit-profile-font-size">
              닉네임 변경
            </Form.Label>
            <Form.Control
              value={newNickname}
              onChange={handleNewNickname}
              type="text"
              placeholder="새 닉네임을 입력하세요."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="edit-profile-font-size">
              E-mail 변경
            </Form.Label>
            <Form.Control
              value={newEmail}
              onChange={handleNewEmail}
              type="email"
              placeholder="새 E-mail을 입력하세요."
            />
          </Form.Group>
          <Form.Group className="d-flex justify-content-center mb-3">
            <button className="btn btn-color" type="submit" onClick={onEdit}>
              수정하기
            </button>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Link to="/check-password">
              <p>비밀번호 변경</p>
            </Link>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default EditProfile;
