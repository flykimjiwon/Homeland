/* eslint-disable */
// import axios from 'axios';
import { useState, useEffect } from "react";
import { Table, Pagination, Button, Container } from "react-bootstrap";
import "./Notice.css";
import { Link } from "react-router-dom";
import axios from "axios";
import backEndUrl from "../setup/hld_url";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

function Notice() {
  const BEUrl = backEndUrl;
  const token = localStorage.getItem("jwt");
  const [noticeItems, setNoticeItems] = useState([]);
  const [userAuthority, setUserAuthority] = useState("");
  const getNoticeItems = () => {
    axios({
      url: `${BEUrl}/api/v1/notice`,
      method: "get",
    })
      .then((res) => {
        setNoticeItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const setToken = () => {
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
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
  useEffect(getNoticeItems, []);
  useEffect(getAuthority, []);
  return (
    <div className="mt-3">
      <h1>공지사항</h1>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성시간</th>
            </tr>
          </thead>
          <tbody>
            {noticeItems.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Link
                      className="text-decoration-none text-black"
                      to={`/notice-detail/${item.id}`}
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td>
                    {dayjs(item.updatedAt).format("YYYY년 MM월 DD일 HH:mm")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      {userAuthority === "admin" ? (
        <Link to="/notice-form">
          <Button>글 작성</Button>
        </Link>
      ) : null}
    </div>
  );
}

export default Notice;
