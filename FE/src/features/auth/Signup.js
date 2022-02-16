/* eslint-disable */
import React, { useEffect, useState } from "react";
import "./Signup.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import backEndUrl from "../setup/hld_url";
import { Form, Container } from "react-bootstrap";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function Sign() {
  const BEUrl = backEndUrl;
  const history = useHistory();
  const [id, setId] = useState("");
  const [idError, setIdError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleId = (event) => {
    event.preventDefault();
    setIdError(false);
    setId(event.target.value);
  };
  const handleNickname = (event) => {
    event.preventDefault();
    setNicknameError(false);
    setNickname(event.target.value);
  };
  const handlePassword = (event) => {
    event.preventDefault();
    setPasswordError(false);
    setPassword(event.target.value);
  };
  const handlePasswordConfirm = (event) => {
    event.preventDefault();
    setPasswordConfirmError(false);
    setPasswordConfirm(event.target.value);
  };
  const handleEmail = (event) => {
    event.preventDefault();
    setEmailError("");
    setEmail(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (email && !emailRegex.test(email)) {
      setEmailError(true);
      alert("이메일 형식을 확인해주세요");
    }
    if (!id) {
      setIdError(true);
      alert("ID를 입력해주세요");
    }
    if (!nickname) {
      setNicknameError(true);
      alert("닉네임을 입력해주세요.");
    }
    if (!email) {
      setEmailError(true);
      alert("E-mail을 입력해주세요.");
    }
    if (!password) {
      setPasswordError(true);
      alert("비밀번호를 입력해주세요.");
    }
    if (!passwordConfirm) {
      setPasswordConfirmError(true);
      alert("비밀번호를 다시 한번 입력해주세요.");
    }
    if (password && passwordConfirm && password !== passwordConfirm) {
      setPasswordConfirmError(true);
      alert("비밀번호와 비밀번호 확인이 일치해야 합니다.");
    }
    if (
      !idError &&
      !nicknameError &&
      !emailError &&
      !passwordError &&
      !passwordConfirmError &&
      password === passwordConfirm
    ) {
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
    }
  };
  // 아이디 중복확인
  const onCheckId = (event) => {
    event.preventDefault();
    if (!id) {
      alert("ID를 입력해주세요.");
      setIdError(true);
    } else {
      axios({
        url: `${BEUrl}/api/v1/users/duplicate-check-id`,
        method: "post",
        data: {
          id: id,
        },
      })
        .then(() => {
          alert("사용 가능한 ID입니다!");
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setIdError(true);
            alert("중복된 ID입니다!");
          }
        });
    }
  };
  // 닉네임 중복확인
  const onCheckNickname = (event) => {
    event.preventDefault();
    if (!nickname) {
      setNicknameError(true);
      alert("닉네임을 입력해주세요");
    } else {
      axios({
        url: `${BEUrl}/api/v1/users/duplicate-check-nickname`,
        method: "post",
        data: {
          nickname: nickname,
        },
      })
        .then(() => {
          alert("사용 가능한 닉네임입니다!");
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setNicknameError(true);
            alert("중복된 닉네임입니다!");
          }
        });
    }
  };
  // 이메일 중복확인
  const onCheckEmail = (event) => {
    event.preventDefault();
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (email && !emailRegex.test(email)) {
      setEmailError(true);
      alert("올바른 이메일 형식이 아닙니다.");
    } else if (!email) {
      setEmailError(true);
      alert("이메일을 입력해주세요.");
    } else {
      axios({
        url: `${BEUrl}/api/v1/users/duplicate-check-email`,
        method: "post",
        data: {
          email: email,
        },
      })
        .then(() => {
          alert("사용 가능한 E-mail입니다!");
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setEmailError(true);
            alert("중복된 E-mail입니다!");
          }
        });
    }
  };

  return (
    <div>
      <div
        className="d-flex flex-column align-center"
        style={{ marginTop: "100px" }}
      >
        <h1
          className="mt-3"
          style={{ color: "#353f71", fontSize: "50px", fontWeight: "600" }}
        >
          회원가입
        </h1>
        <Container style={{ width: "500px", marginTop: "50px" }}>
          <Form className="signup-form">
            <Form.Group>
              <Form.Label className="signup-font-size">ID</Form.Label>
              <Form.Control
                value={id || ""}
                onChange={handleId}
                type="text"
                placeholder="ID를 입력하세요."
              />
              <div className="d-flex justify-content-end">
                <Button onClick={onCheckId}>ID 중복확인</Button>
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label className="signup-font-size">닉네임</Form.Label>
              <Form.Control
                value={nickname}
                onChange={handleNickname}
                type="text"
                placeholder="닉네임을 입력하세요."
              />
              <div className="d-flex justify-content-end">
                <Button onClick={onCheckNickname}>닉네임 중복확인</Button>
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label className="signup-font-size">E-mail</Form.Label>
              <Form.Control
                value={email}
                onChange={handleEmail}
                type="email"
                placeholder="E-mail을 입력하세요."
              />
              <div className="d-flex justify-content-end">
                <Button onClick={onCheckEmail}>E-mail 중복확인</Button>
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="signup-font-size">비밀번호</Form.Label>
              <Form.Control
                value={password}
                onChange={handlePassword}
                type="password"
                placeholder="비밀번호를 입력하세요."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="signup-font-size">
                비밀번호 확인
              </Form.Label>
              <Form.Control
                value={passwordConfirm}
                onChange={handlePasswordConfirm}
                type="password"
                placeholder="비밀번호를 다시 입력하세요."
              />
            </Form.Group>
            <Form.Group className="d-flex justify-content-center mb-3">
              <button
                className="btn btn-color"
                type="submit"
                onClick={onSubmit}
              >
                회원가입
              </button>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Link to="/login" variant="body2">
                계정이 있으신가요? 로그인
              </Link>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default Sign;
