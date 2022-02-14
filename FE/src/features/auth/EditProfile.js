/* eslint-disable */
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
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
            회원정보 수정
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              value={newNickname}
              onChange={handleNewNickname}
              margin="normal"
              required
              fullWidth
              label="닉네임 변경"
              autoFocus
            />
            <TextField
              value={newEmail}
              onChange={handleNewEmail}
              margin="normal"
              required
              fullWidth
              label="E-mail 변경"
              type="email"
            />
            <MuiButton
              type="submit"
              onClick={onEdit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              수정하기
            </MuiButton>
          </Box>
        </Box>
        <div className="d-flex justify-content-end">
          <Link to="/check-password">
            <p>비밀번호 변경</p>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default EditProfile;
