/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Mypage.css";
import backEndUrl from "../setup/hld_url";

function Mypage() {
  const BEUrl = backEndUrl;
  const [profile, setProfile] = useState([]);
  const getProfile = () => {
    axios({
      url: `${BEUrl}/api/v1/users/me`,
      method: "get",
      headers: setToken(),
    }).then((res) => {
      setProfile(res.data);
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
    <div>
      <h1 className="mt-3">마이페이지</h1>
      <Container>
        <div>닉네임: {profile.nickname}</div>
        <div>이메일: {profile.email}</div>
      </Container>
      <Link to="/editProfile">
        <Button>내 정보 수정</Button>
      </Link>
    </div>
  );
}

export default Mypage;
