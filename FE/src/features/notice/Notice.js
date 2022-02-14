/* eslint-disable */
// import axios from 'axios';
import { useState, useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";
import "./Notice.css";
import { Link } from "react-router-dom";
import axios from "axios";
import backEndUrl from "../setup/hld_url";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Pagination from "@mui/material/Pagination";

dayjs.locale("ko");

function Notice() {
  const BEUrl = backEndUrl;
  const token = localStorage.getItem("jwt");
  const [noticeItems, setNoticeItems] = useState([]);
  const [userAuthority, setUserAuthority] = useState("");
  const limit = 10;
  const [page, setPage] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  useEffect(() => {
    if (noticeItems.length % 10 === 0) {
      setPageNum(parseInt(noticeItems.length / 10));
    } else {
      setPageNum(parseInt(noticeItems.length / 10) + 1);
    }
  }, [noticeItems.length]);

  const offset = (page - 1) * limit;
  // 페이지네이션

  const onChangePage = (event, page) => {
    event.preventDefault();
    setPage(page);
  };

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
    <div className="notice">
      <h1>공지사항</h1>
      <Container className="mt-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성시간</th>
            </tr>
          </thead>
          <tbody>
            {noticeItems.slice(offset, offset + limit).map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1 + offset}</td>
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
        {userAuthority === "admin" ? (
          <div className="text-end me-3">
            <Link to="/notice-form">
              <button className="btn btn-color">글 작성</button>
            </Link>
          </div>
        ) : null}
      </Container>

      <div className="d-flex justify-content-center mb-3">
        <Pagination count={pageNum} shape="rounded" onChange={onChangePage} />
      </div>
    </div>
  );
}

export default Notice;
