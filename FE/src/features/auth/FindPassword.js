import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import backEndUrl from "../setup/hld_url";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button as MuiButton,
} from "@mui/material";

function FindPassword() {
  const BEUrl = backEndUrl;
  const history = useHistory();
  const { key } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const handleNewPassword = (event) => {
    event.preventDefault();
    setNewPassword(event.target.value);
  };
  const handleConfirmNewPassword = (event) => {
    event.preventDefault();
    setConfirmNewPassword(event.target.value);
  };
  const onChangePassword = (event) => {
    event.preventDefault();
    if (newPassword && newPassword === confirmNewPassword) {
      axios({
        url: `${BEUrl}/api/v1/users/password/${key}`,
        method: "put",
        data: {
          password: newPassword,
        },
      })
        .then(() => {
          history.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("비밀번호와 비밀번호 확인이 다릅니다.");
    }
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
          <Typography component="h1" variant="h4">
            새 비밀번호 변경
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
              value={confirmNewPassword}
              onChange={handleConfirmNewPassword}
              margin="normal"
              required
              fullWidth
              label="비밀번호 확인"
              type="password"
            />
            <MuiButton
              type="submit"
              onClick={onChangePassword}
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

export default FindPassword;
