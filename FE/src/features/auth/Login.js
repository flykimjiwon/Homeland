/* eslint-disable */
import axios from "axios";
<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import "./Login.css";

function Login() {
=======
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import "./Login.css";
import backEndUrl from "../setup/hld_url";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function Login() {
  const BEUrl = backEndUrl;
>>>>>>> dev
  const history = useHistory();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const handleId = (event) => {
    event.preventDefault();
    setId(event.target.value);
  };
  const handlePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const onLogin = (event) => {
    event.preventDefault();
    axios({
<<<<<<< HEAD
      url: "http://localhost:8080/api/v1/auth/login",
=======
      url: `${BEUrl}/api/v1/auth/login`,
>>>>>>> dev
      method: "post",
      data: {
        id: id,
        password: password,
      },
    })
      .then((res) => {
<<<<<<< HEAD
        // console.log(res);
=======
>>>>>>> dev
        localStorage.setItem("jwt", res.data.accessToken);
        history.push("/");
      })
      .catch((err) => {
<<<<<<< HEAD
        if (err.response.status === 500) {
=======
        if (err.response.status === 404) {
>>>>>>> dev
          alert("존재하지 않는 아이디입니다.");
        } else if (err.response.status === 401) {
          alert("비밀번호가 틀렸습니다.");
        }
      });
  };

  return (
<<<<<<< HEAD
    <div>
      <h1 className="mt-3">로그인 페이지 입니다.</h1>
      <Container className="loginForm">
        <Form>
          <Form.Group className="mb-3" controlId="FormID">
            <Form.Label>ID</Form.Label>
            <Form.Control
              value={id}
              onChange={handleId}
              type="text"
              placeholder="ID를 입력하세요."
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              value={password}
              onChange={handlePassword}
              type="password"
              placeholder="비밀번호를 입력하세요."
            />
          </Form.Group>
          <Form.Group className="d-flex justify-content-center">
            <Button variant="primary" type="submit" onClick={onLogin}>
              로그인
            </Button>
          </Form.Group>
          <Link to="/check-email">
            <p>비밀번호 찾기</p>
          </Link>
        </Form>
      </Container>
    </div>
=======
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
            로그인
          </Typography>
          <Box component="form" onSubmit={onLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={id || ""}
              onChange={handleId}
              id="id"
              label="아이디"
              name="id"
              autoComplete="id"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={password}
              onChange={handlePassword}
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
            <div className="d-flex justify-content-between">
              <div>
                <Link to="/check-email" variant="body2">
                  비밀번호 찾기
                </Link>
              </div>
              <div>
                <Link to="/signup" variant="body2">
                  회원가입
                </Link>
              </div>
            </div>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>

    // <Container className="loginForm">
    //   <Form>
    //     <Form.Group className="mb-3" controlId="FormID">
    //       <Form.Label>ID</Form.Label>
    //       <Form.Control
    //         value={id}
    //         onChange={handleId}
    //         type="text"
    //         placeholder="ID를 입력하세요."
    //       />
    //     </Form.Group>

    //     <Form.Group className="mb-3" controlId="formBasicPassword">
    //       <Form.Label>비밀번호</Form.Label>
    //       <Form.Control
    //         value={password}
    //         onChange={handlePassword}
    //         type="password"
    //         placeholder="비밀번호를 입력하세요."
    //       />
    //     </Form.Group>
    //     <Form.Group className="d-flex justify-content-center">
    //       <Button variant="primary" type="submit" onClick={onLogin}>
    //         로그인
    //       </Button>
    //     </Form.Group>
    //     <Link to="/check-email">
    //       <p>비밀번호 찾기</p>
    //     </Link>
    //   </Form>
    // </Container>
>>>>>>> dev
  );
}

export default Login;
