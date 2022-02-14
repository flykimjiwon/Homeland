/* eslint-disable */
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import backEndUrl from "../setup/hld_url";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button as MuiButton,
} from "@mui/material";

function EditPassword() {
  const BEUrl = backEndUrl;
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
      url: `${BEUrl}/api/v1/users/edit-password`,
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
            비밀번호 변경
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              value={newPassword}
              onChange={handleNewPassword}
              margin="normal"
              required
              fullWidth
              label="새 비밀번호"
              autoFocus
              type="password"
            />
            <TextField
              value={checkNewPassword}
              onChange={handleCheckNewPassword}
              margin="normal"
              required
              fullWidth
              label="비밀번호 확인"
              type="password"
            />
            <MuiButton
              type="submit"
              onClick={onEditPassword}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              변경하기
            </MuiButton>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default EditPassword;
