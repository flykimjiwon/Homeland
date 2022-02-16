/* eslint-disable */
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import backEndUrl from "../setup/hld_url";
import dayjs from "dayjs";
import "./NoticeDetailPage.css";
import "dayjs/locale/ko";
import { Container } from "react-bootstrap";
import { Button as MuiButton, ButtonGroup } from "@mui/material";

dayjs.locale("ko");

function NoticeDetailPage() {
  const BEUrl = backEndUrl;
  const history = useHistory();
  const [notice, setNotice] = useState([]);
  const { id } = useParams();
  const [userAuthority, setUserAuthority] = useState("");
  const token = localStorage.getItem("jwt");
  const setToken = () => {
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };

  const goToEditNotice = (event) => {
    event.preventDefault();
    history.push(`/notice-edit/${id}`);
  };

  const goToNoticeList = (event) => {
    event.preventDefault();
    history.push("/notice");
  };

  const getAuthority = () => {
    if (token) {
      axios({
        url: `${BEUrl}/api/v1/users/check-authority`,
        method: "get",
        headers: setToken(),
      }).then((res) => {
        setUserAuthority(res.data);
      });
    }
  };
  const getNotice = () => {
    axios({
      url: `${BEUrl}/api/v1/notice/${id}`,
      method: "get",
    })
      .then((res) => {
        setNotice(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getNotice, [BEUrl, id]);
  useEffect(getAuthority, []);

  const onDeleteNotice = (event) => {
    event.preventDefault();
    axios({
      url: `${BEUrl}/api/v1/notice/${id}`,
      method: "delete",
      headers: setToken(),
    })
      .then(() => {
        history.push("/notice");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="notice-detail-font-style" style={{ marginTop: "100px" }}>
      <h1 className="mb-3" style={{ color: "#353f71", fontSize: "50px" }}>
        {notice.title}
      </h1>
      <div className="container notice-detail">
        <div className="d-flex justify-content-end">
          <p>{dayjs(notice.updatedAt).format("YYYY. MM. DD HH:mm")}</p>
        </div>
        <br />
        <p>{notice.content}</p>
      </div>
      {userAuthority === "admin" ? (
        <div className="d-flex justify-content-center">
          <div
            style={{ width: "500px", Align: "center" }}
            className="my-3 d-flex justify-content-end"
          >
            <ButtonGroup variant="contained">
              <MuiButton onClick={goToEditNotice}>수정하기</MuiButton>
              <MuiButton onClick={onDeleteNotice}>삭제하기</MuiButton>
            </ButtonGroup>
          </div>
        </div>
      ) : null}
      <MuiButton variant="contained" onClick={goToNoticeList}>
        목록
      </MuiButton>
    </div>
  );
}

export default NoticeDetailPage;
