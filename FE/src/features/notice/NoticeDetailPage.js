/* eslint-disable */
import { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Form } from "react-bootstrap";
import backEndUrl from "../setup/hld_url";
import dayjs from "dayjs";
import "./NoticeDetailPage.css";
import "dayjs/locale/ko";
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
    <div className="notice-detail">
      <h1>글 세부사항</h1>
      <div>
        <h4>제목: {notice.title}</h4>
        <p>
          작성시간: {dayjs(notice.updatedAt).format("YYYY년 MM월 DD일 HH:mm")}
        </p>
        <p>내용: {notice.content}</p>
      </div>
      {userAuthority === "admin" ? (
        <div className="my-3">
          <ButtonGroup variant="contained">
            <MuiButton onClick={goToEditNotice}>수정하기</MuiButton>
            <MuiButton onClick={onDeleteNotice}>삭제하기</MuiButton>
          </ButtonGroup>
        </div>
      ) : null}
      <MuiButton variant="contained" onClick={goToNoticeList}>
        목록
      </MuiButton>
    </div>
  );
}

export default NoticeDetailPage;
