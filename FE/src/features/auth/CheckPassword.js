/* eslint-disable */
import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import backEndUrl from "../setup/hld_url";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button as MuiButton,
} from "@mui/material";

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
          <Typography component="h1" variant="h5">
            비밀번호 확인
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              value={password}
              onChange={handleCheckPassword}
              margin="normal"
              required
              fullWidth
              label="비밀번호"
              autoFocus
              type="password"
            />
            <MuiButton
              type="submit"
              onClick={onCheckPasswordSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              확인
            </MuiButton>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default CheckPassword;
