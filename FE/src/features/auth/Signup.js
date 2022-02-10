/* eslint-disable */
import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { Form, Button, InputGroup } from "react-bootstrap";
import "./Signup.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function Sign() {
=======
import { Form, InputGroup, FormControl } from "react-bootstrap";
import "./Signup.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import backEndUrl from "../setup/hld_url";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { FormHelperText } from "@mui/material/";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function Sign() {
  const BEUrl = backEndUrl;
>>>>>>> dev
  const history = useHistory();
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
<<<<<<< HEAD
=======
  const [emailError, setEmailError] = useState("");
>>>>>>> dev

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
<<<<<<< HEAD
    axios({
      url: "http://localhost:8080/api/v1/users",
      method: "post",
      data: {
        id: id,
        nickname: nickname,
        password: password,
        email: email,
      },
    }).then(() => {
      history.push("/login");
    });
  };

  return (
    <div>
      <h1 className="mt-3">회원가입</h1>
      <Form className="container signup-form">
        <Form.Group className="mb-3" controlId="formGroupID">
          <Form.Label>아이디</Form.Label>
          <Form.Control
            value={id}
            onChange={handleId}
            type="text"
            placeholder="아이디 입력"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupNickname">
          <Form.Label>닉네임</Form.Label>
          <Form.Control
            value={nickname}
            onChange={handleNickname}
            type="text"
            placeholder="닉네임 입력"
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
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>e-mail</Form.Label>
          <Form.Control
            value={email}
            onChange={handleEmail}
            type="email"
            placeholder="e-mail 입력"
          />
        </Form.Group>
        <Form.Group className="d-flex justify-content-center mt-3">
          <Button type="submit" onClick={onSubmit}>
            가입하기
          </Button>
        </Form.Group>
      </Form>
    </div>
=======
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
    } else {
      setEmailError("");
    }
    if (emailRegex.test(email) && password && password === passwordConfirm) {
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
    } else {
      alert("뭔가 잘못됨");
    }
  };
  // 아이디 중복확인
  const onCheckId = (event) => {
    event.preventDefault();
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
          alert("중복된 ID입니다!");
        }
      });
  };
  // 닉네임 중복확인
  const onCheckNickname = (event) => {
    event.preventDefault();
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
          alert("중복된 닉네임입니다!");
        }
      });
  };
  // 이메일 중복확인
  const onCheckEmail = (event) => {
    event.preventDefault();
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
          alert("중복된 E-mail입니다!");
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={id || ""}
                  onChange={handleId}
                  name="id"
                  required
                  fullWidth
                  id="id"
                  label="ID"
                  autoFocus
                />
                <div className="d-flex justify-content-end">
                  <Button onClick={onCheckId}>ID 중복확인</Button>
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={nickname || ""}
                  onChange={handleNickname}
                  required
                  fullWidth
                  id="lastName"
                  label="닉네임"
                  name="lastName"
                />
                <div className="d-flex justify-content-end">
                  <Button onClick={onCheckNickname}>닉네임 중복확인</Button>
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  value={email || ""}
                  required
                  fullWidth
                  onChange={handleEmail}
                  id="email"
                  label="E-mail"
                  name="email"
                  error={emailError !== "" || false}
                />
                <div className="d-flex justify-content-between">
                  <FormHelperText sx={{ color: "red" }}>
                    {emailError}
                  </FormHelperText>
                  <Button onClick={onCheckEmail}>E-mail 중복확인</Button>
                </div>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  value={password || ""}
                  onChange={handlePassword}
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={passwordConfirm || ""}
                  onChange={handlePasswordConfirm}
                  required
                  fullWidth
                  name="password-confirm"
                  label="비밀번호 확인"
                  type="password"
                  id="password-confirm"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              회원가입
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  계정이 있으신가요? 로그인
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
>>>>>>> dev
  );
}

export default Sign;
