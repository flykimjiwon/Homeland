/* eslint-disable */
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import backEndUrl from "../setup/hld_url";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button as MuiButton,
} from "@mui/material";

function CheckEmail() {
  const BEUrl = backEndUrl;
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
      url: `${BEUrl}/api/v1/users/find-password`,
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
            ID & E-mail 체크
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              value={id}
              onChange={handleId}
              margin="normal"
              required
              fullWidth
              label="ID"
              autoFocus
            />
            <TextField
              value={email}
              onChange={handleEmail}
              margin="normal"
              required
              fullWidth
              label="E-mail"
              type="email"
            />
            <MuiButton
              type="submit"
              onClick={onCheckEmail}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              이메일 인증 요청
            </MuiButton>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default CheckEmail;
