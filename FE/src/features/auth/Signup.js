/* eslint-disable */
import React, { useEffect, useState } from "react";
import "./Signup.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import backEndUrl from "../setup/hld_url";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

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
                  error={idError || false}
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
                  error={nicknameError || false}
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
                  error={emailError || false}
                />
                <div className="d-flex justify-content-end">
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
                  error={passwordError || false}
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
                  error={passwordConfirmError || false}
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
  );
}

export default Sign;
